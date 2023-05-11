import "../App.css";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import {
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import icon from "../bluedot.jpeg"
import { useParams } from "react-router-dom";
import Popup from "./Popup";
import axios from "axios";
import Header from "./Header"
import "./Map.css"
const containerStyle = {
  width: "350px",
  height: "400px",
};


const onLoad = (marker) => {
  console.log("marker: ", marker);
};

export default function Map() {
  const {trackId}= useParams()
  const apiKey=process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  const [details,setDetails]= useState({})
  const [position, setPosition] = useState({});
  const [directions, setDirections] = useState();
  const [isPopup,setIsPopup]=useState(false)
  const [markerNum,setMarkerNum]=useState()
  const markerRef=useRef()
  
  useEffect(() => {
    navigator.geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) => {
        setPosition({ lat: latitude, lng: longitude });
      }
    );
    axios.get(`https://soundtrack.herokuapp.com/tracks/get-track?trackName=${trackId}`).then((res)=>{setDetails(res.data);console.log(res.data)}).catch((err)=>console.log(err))
  }, []);
  const directionsCallback = (result, status) => {
    if (status === "OK") setDirections(result);
  };
  return (
    <>
    <Header/>
    <div className="map">
<div><b>{trackId}</b></div>
    {details?  <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap mapContainerStyle={containerStyle} center={details.center} zoom={16}>
        {window.google? <Marker
          ref={markerRef}
            visible={true}
            opacity={1}
            onLoad={onLoad}
            position={position}
            icon={{
              url:icon,
              scaledSize:new  window.google.maps.Size(30,30),
              origin: new window.google.maps.Point(0,0)
            }}
       
          />:null}
          {details.markers?details.markers.map((v,i)=>{
            return <Marker
            position={{lat:v.latitude,lng:v.longitude}}
            onClick={()=>{setIsPopup(true);setMarkerNum(i);}}
            />
          }):null}
          <DirectionsService
            options={{
              origin:{lat:details?.origin?.latitude,lng:details?.origin?.longitude},
              destination: {lat:details?.destination?.latitude,lng:details?.destination?.longitude},
              travelMode: "WALKING",
            }}
            callback={directionsCallback}
          />
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>:null}
     {isPopup?<Popup markers={details.markers} markerNum={markerNum} setIsPopup={setIsPopup}></Popup>:null}
    </div>
    </>
  );
}
