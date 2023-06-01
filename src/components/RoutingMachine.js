import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine"
const createRoutineMachineLayer = (props)=>{
   
    const markers= props.markers.map((marker)=>{return L.latLng(marker.latitude,marker.longitude)})
    const instance = L.Routing.control({
        waypoints:[
            L.latLng(props.origin.latitude,props.origin.longitude),
          ...markers,
            L.latLng(props.destination.latitude,props.destination.longitude)
        ],
        router: L.Routing.mapbox(process.env.REACT_APP_MAPBOX_API_KEY,{ profile: "mapbox/walking" }),
        lineOptions:{
            styles:[{color:"blue",weight:4}]
        }
    ,
    show:false,
    addWaypoints:false,
    fitSelectedRoutes:true,
    routeWhileDragging:true,
    createMarker: function() { return null; }
    });
    return instance;
}
const RoutingMachine = createControlComponent(createRoutineMachineLayer);
export default RoutingMachine;