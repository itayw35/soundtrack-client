import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const createRoutineMachineLayer = (props) => {
  const markers = props.markers.map((marker) => {
    return L.latLng(marker.latitude, marker.longitude);
  });
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(props.origin.latitude, props.origin.longitude),
      ...markers,
      L.latLng(props.destination.latitude, props.destination.longitude),
    ],
    router: L.Routing.mapbox(process.env.REACT_APP_MAPBOX_API_KEY, {
      profile: "mapbox/walking",
      steps: true,
      bannerInstructions: true,
      language: "he",
    }),
    lineOptions: {
      styles: [{ color: "blue", weight: 4 }],
    },
    show: false,
    addWaypoints: false,
    fitSelectedRoutes: true,
    createMarker: function () {
      return null;
    },
  });
  instance.on("routesfound", function (e) {
    const routes = e.routes;
    const summary = routes[0].summary;
    const instructions = routes[0].instructions;
    console.log(routes[0].legs[0].steps);
    console.log(summary);
    console.log(instructions);
  });
  // fetch(
  //   `https://api.mapbox.com/directions/v5/mapbox/walking/34.74957,32.05399;34.74957,32.05399;34.75316,32.05439;34.75204,32.05475;34.75284,32.05547;34.75627,32.05505;34.75627,32.05505?overview=false&alternatives=true&steps=true&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // Process the response data
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     // Handle any errors
  //     console.error(error);
  //   });
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);
export default RoutingMachine;
