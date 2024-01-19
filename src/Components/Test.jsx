import React, { Fragment, useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import icon from '../Icons/icons8-location-48.png';

// import 'leaflet/dist/leaflet.css';
// import './MyMap.css';

const Test = () => {
  const [data1, setData1] = useState();
  const [markerData, setMarkerData] = useState();

  const myIcon = L.icon({
    iconUrl: icon,
    iconSize: [20, 25],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: '',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });

  const getCountry = async () => {
    const url =
      'https://geography4.p.rapidapi.com/apis/geography/v1/country/group/NATO?limit=10&sortBy=name&sortOrder=asc';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8134eae9demsh71c019d4965c381p14af70jsn51d680762f84',
        'X-RapidAPI-Host': 'geography4.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setData1(result);

      if (result?.length > 0) {
        const markerData = result.map((item) => {
          // [item.latLng.lat, item.latLng.lng]
          return {
            countryName: item.name.common,
            marker: [item.latLng.lat, item.latLng.lng],
          };
        });
        setMarkerData(markerData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCountry();
  }, []);
  const position = [51.505, -0.09];
  return (
    <div>
      <MapContainer
        style={{ height: '100vh' }}
        zoom={2}
        center={[20, 100]}
      >
        <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {markerData?.map((mark) => (
          <Marker
            position={mark.marker}
            icon={myIcon}
          >
            <Popup>{mark.countryName}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {console.log('item', markerData)}
    </div>
  );
};

export default Test;
