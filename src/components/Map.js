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
import { AiOutlinePlayCircle } from "react-icons/ai";
import { AiOutlinePauseCircle } from "react-icons/ai";

export default function Map() {
  const { trackId } = useParams();
  const [details, setDetails] = useState({});
  const [position, setPosition] = useState({});
  const markerRef = useRef();
  function toBase64(arr) {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  }
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const handleAudio = () => {
    !isPlaying ? audioRef.current.play() : audioRef.current.pause();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    navigator.geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log(latitude + " " + longitude);
        setPosition({ lat: latitude, lng: longitude });
      }
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
            zoom={16}
            scrollWheelZoom={true}
          >
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
              ? details.markers.map((v, i) => {
                  return (
                    <Marker position={{ lat: v.latitude, lng: v.longitude }}>
                      <Popup>
                        <div className="popup">
                          <span>{v.markerName}</span>
                          {!isPlaying ? (
                            <AiOutlinePlayCircle
                              onTouchStart={() => handleAudio()}
                            />
                          ) : (
                            <AiOutlinePauseCircle
                              onTouchStart={() => handleAudio()}
                            />
                          )}
                          <audio
                            ref={audioRef}
                            src={`data:audio/mp4;base64,${toBase64(
                              details.markers[i].audio.data.data
                            )}`}
                          ></audio>
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
        <p className="track-details">
          <span>
            <h5>מורת דרך: {details.guideName}</h5>
          </span>
          <p className="track-description">{details.description}</p>
        </p>
      </div>
    </>
  );
}
