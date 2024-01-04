import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function Routing({origin,dest}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(origin[0], origin[1]), L.latLng(dest.lat, dest.lon)],
      routeWhileDragging: true 
      
    }).addTo(map);
    console.log(origin,dest);
    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}
