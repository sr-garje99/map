
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    Polyline,
  } from 'react-leaflet';
 // import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
  //import "leaflet-routing-machine";
  import { useEffect,useState,useContext } from 'react';
  import axios from 'axios';

import { PlaceContext } from './Body';

  function SetViewOnClick({ position }) {
    const map = useMap();
    map.setView(position, map.getZoom());
  
    return null;
  }
  
  
const MapBox = ({position}) => {
  
  //console.log("rendered again")
  
  const [poi,setPoi] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState({lon:position[0],lat:position[1]});
  const [routePolyline, setRoutePolyline] = useState([]);
  const [place] = useContext(PlaceContext);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedMarker) {
        const osrmApiUrl = 'https://router.project-osrm.org/route/v1/driving/';
        const coordinates = `${position[1]},${position[0]};${selectedMarker.lon},${selectedMarker.lat}`;
      
        try {
          const response = await axios.get(`${osrmApiUrl}${coordinates}?overview=full&geometries=geojson`);
          const route = response.data.routes[0].geometry.coordinates;
          const routeL = route.map((point) =>(([point[1],point[0]])))
          setRoutePolyline(routeL);
        } catch (error) {
          console.error('Error fetching route data from OSRM API:', error);
        }
      }
    };

    fetchData();
  }, [selectedMarker]);

  useEffect(() => {
    // Replace this with your Overpass QL query
    const overpassQuery = `
      [out:json];
      node(around:10000,${position[0]} ,${position[1]})["amenity"=${place}];
      out body;
    `;

    // Overpass API endpoint
    const overpassApiUrl = 'https://overpass-api.de/api/interpreter';

    // Make the Overpass API request
    const fetchData = async () => {
      try {
      
        const response = await axios.post(overpassApiUrl, overpassQuery, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        setPoi(response.data.elements);
        setRoutePolyline([]);
        
      } catch (error) {
        console.error('Error fetching data from Overpass API:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [place]);

  useEffect(()=>{
    const axios = require('axios');

    const apiUrl = 'https://apis.tollguru.com/toll/v2/origin-destination-waypoints';
    const apiKey = '33NhrGm63L2j9DRb9H7M8q34tqr7Hffn';

    const requestData = {
      "from": {
        "address": "Philadelphia , Pennsylvania,",
        "lat": 39.95209,
        "lng": -75.16219
      },
      "to": {
        "address": "New York ,NY,",
        "lat": 40.71455,
        "lng": -74.00715
      },
      "waypoints": [
        {
          "address": "Bridgewater Township , New Jersey"
        }
      ],
      "serviceProvider": "here",
      "vehicle": {
        "type": "2AxlesTaxi",
        "weight": {
          "value": 20000,
          "unit": "pound"
        },
        "height": {
          "value": 7.5,
          "unit": "meter"
        },
        "length": {
          "value": 7.5,
          "unit": "meter"
        },
        "axles": 4,
        "emissionClass": "euro_5"
      }
    };

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    };
    const getData = async() =>{
    console.log("TOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOl")
    try{
     // const response = await axios.post(apiUrl, requestData, { headers });
      //console.log(response.data);
    }catch(error){

    }
    }
    //getData();

  },[place])

  const handleMarkerClick = (id, lat,lon) => {
    setSelectedMarker({ id: id, lat:lat,lon:lon });
  };
  
  return (
    
<div id="mapContainer">

  <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
     <SetViewOnClick position={position} />
     <Marker position={position}>
      <Popup>
        You are here
      </Popup>
    </Marker>
    {poi.slice(0,5).map((marker,i)=>(
      <Marker key={i} position={[marker.lat, marker.lon]}
      eventHandlers={{ click: () => handleMarkerClick(marker.id, marker.lat,marker.lon) }}>
        <Popup>{marker.tags.name}</Popup>
        {/* <Polyline positions={[[position[0],position[1]],[marker.lat,marker.lon]]} color="blue" /> */}
    </Marker>
    ))}
    {/* {console.log(position)} */}
    {/* <Routing origin={position} dest={selectedMarker} /> */}
    {/* <Polyline positions={[[20.0575987,73.7859246,][20.011266],[73.788833]]} color="blue" /> */}
    { routePolyline.length>0 && routePolyline.slice(0,routePolyline.length-2).map((point,i)=>(<Polyline key={i}positions={[point,routePolyline[i+1]]} color="blue" />))}
     {/* routePolyline.slice(0,routePolyline.length-2).map((point,i)=>( <Polyline key={i} positions={[[point[0],point[1]],[routePolyline[i+1][0],routePolyline[i+1][1]]]} color="blue" />))}  */}
  </MapContainer>
  </div>
  )
}

export default MapBox




