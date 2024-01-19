import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
// import mapData from "../Data/countries.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

const MyMap = () => {
  const [color, setColor] = useState("#ffff00");
  const colors = ["green", "blue", "yellow", "orange", "grey"];
  const [mapData,setMapData]=useState()


  const getCountry = async () => {

    const url =
      'https://s3.amazonaws.com/rawstore.datahub.io/23f420f929e0e09c39d916b8aaa166fb.geojson';
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
      console.log(result.features);
      setMapData(result)
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCountry();

  }, []);



  const countryStyle = {
    fillColor: "red",
    fillOpacity: 1,
    color: "black",
    weight: 2,
  };

  const printMessageToConsole = () => {
    console.log("Clicked");
  };

  const changeCountryColor = (event) => {
    event.target.setStyle({
      color: "green",
      fillColor: color,
      fillOpacity: 1,
    });
  };

  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    const populationDensity = 6.858; // 6.858 people per square mile
    const population = Math.round(
      populationDensity * country.properties.AREA_SQMI
    );

    const popupContent = `${countryName}<br>Population: ${populationDensity} people`;

    layer.bindPopup(popupContent);

    layer.options.fillOpacity = Math.random();
    layer.on({
      click: changeCountryColor,
    });
  };

  const colorChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Map</h1>

      <MapContainer style={{ height: "80vh" }} zoom={2} center={[20, 100]}>
        <GeoJSON
          style={countryStyle}
          data={mapData.features}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
      <input type="color" value={color} onChange={colorChange} />
    </div>
  );
};

export default MyMap;
