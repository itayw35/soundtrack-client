import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
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
  fetch(
    `https://api.mapbox.com/directions/v5/mapbox/walking/34.74957,32.05399;34.74957,32.05399;34.75316,32.05439;34.75204,32.05475;34.75284,32.05547;34.75627,32.05505;34.75627,32.05505?overview=false&alternatives=true&steps=true&banner_instructions=true&language="he"&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Process the response data
      console.log(data);
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
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);
export default RoutingMachine;
