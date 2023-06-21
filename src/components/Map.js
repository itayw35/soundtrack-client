import "../App.css";
import { useEffect, useRef, useState } from "react";
import icon from "../bluedot.png";
import { useParams } from "react-router-dom";
// import MyPopup from "./MyPopup";
import axios from "axios";
import Header from "./Header";
import "./Map.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import RoutingMachine from "./RoutingMachine";
import { Icon } from "leaflet";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Audio from "./Audio";

export default function Map() {
  const { trackId } = useParams();
  const [step, setStep] = useState();
  const [details, setDetails] = useState({});
  const [position, setPosition] = useState({});
  const [instructions, setInstructions] = useState([]);
  const markerRef = useRef();
  const instructionsRef = useRef();

  useEffect(() => {
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/walking/34.74957,32.05399;34.74957,32.05399;34.75316,32.05439;34.75204,32.05475;34.75284,32.05547;34.75627,32.05505;34.75627,32.05505?overview=false&alternatives=true&steps=true&banner_instructions=true&language="he"&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Process the response data
        const instructions = data.routes[0].legs
          .map((v) => v.steps)
          .flat()
          .map((v) => {
            return {
              instruction: v.maneuver.instruction,
              location: {
                lat: v.maneuver.location[0],
                lng: v.maneuver.location[1],
              },
            };
          });
        console.log(instructions);
        setInstructions(instructions);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }, []);
  useEffect(() => {
    function error(err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
    }
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log(latitude + " " + longitude);
        setPosition({ lat: latitude, lng: longitude });
        if (
          (instructions.find((step) => step.location.lat > latitude + 0.005) ||
            instructions.find(
              (step) => step.location.lat < latitude - 0.005
            )) &&
          (instructions.find((step) => step.location.lng > longitude + 0.005) ||
            instructions.find((step) => step.location.lng < longitude - 0.005))
        ) {
          setStep(step.instruction);
          instructionsRef.current.classList.add("active");
        }
      },
      error,
      options
    );
    axios
      .get(
        `https://soundtrack.herokuapp.com/tracks/get-track?trackName=${trackId}`
      )
      .then((res) => {
        setDetails(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const codingSpot = new Icon({
    iconUrl: icon,
    iconSize: [30, 30],
    iconAnchor: [-25, -40],
  });
  return (
    <>
      <Header />
      <div className="vertical-map-flex">
        <b className="trackId">{trackId}</b>
        {details.center ? (
          <MapContainer
            center={[details.center.latitude, details.center.longitude]}
            zoom={18}
            scrollWheelZoom={true}
          >
            <div ref={instructionsRef} id="instructions-div">
              {step}
            </div>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            ></TileLayer>
            <Marker
              ref={markerRef}
              position={position}
              icon={codingSpot}
            ></Marker>
            {details ? (
              <RoutingMachine
                origin={details.origin}
                destination={details.destination}
                markers={details.markers}
              />
            ) : null}
            {details.markers
              ? details.markers.map((v) => {
                  return (
                    <Marker position={{ lat: v.latitude, lng: v.longitude }}>
                      <Popup>
                        <div className="popup">
                          <Audio marker={v} />
                        </div>
                      </Popup>
                    </Marker>
                  );
                })
              : null}
          </MapContainer>
        ) : (
          <div>
            <br />
            <AiOutlineLoading3Quarters />
            <br />
            <span>
              <b>Loading...</b>
            </span>
          </div>
        )}
        <div className="track-details">
          <span>
            <h5>מורת דרך: {details.guideName}</h5>
          </span>
          <p className="track-description">{details.description}</p>
        </div>
      </div>
    </>
  );
}
