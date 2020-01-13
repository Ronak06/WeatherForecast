import React from "react";
import {
  CLEARDAY,
  CLEARNIGHT,
  RAIN,
  SNOW,
  SLEET,
  WIND,
  FOG,
  CLOUDY,
  PARTLYCLOUDYDAY,
  PARTLYCLOUDYNIGHT,
  HAIL,
  THUNDERSTORM,
  TORNADO
} from "../constants/weather-types.js";

const WeatherIcon = ({ icon }) => {
  let newIcon = icon.replace(/-/g, "").toUpperCase();

  switch (newIcon) {
    case "CLEARDAY":
      return (
        <img
          src={`${process.env.PUBLIC_URL}/SVG/${CLEARDAY}`}
          alt="Clear-Day"
        />
      );
    case "CLEARNIGHT":
      return (
        <img
          src={`${process.env.PUBLIC_URL}/SVG/${CLEARNIGHT}`}
          alt="Clear-Night"
        />
      );
    case "RAIN":
      return <img src={`${process.env.PUBLIC_URL}/SVG/${RAIN}`} alt="Rain" />;
    case "SNOW":
      return <img src={`${process.env.PUBLIC_URL}/SVG/${SNOW}`} alt="Snow" />;
    case "SLEET":
      return <img src={`${process.env.PUBLIC_URL}/SVG/${SLEET}`} alt="Sleet" />;
    case "WIND":
      return <img src={`${process.env.PUBLIC_URL}/SVG/${WIND}`} alt="Wind" />;
    case "FOG":
      return <img src={`${process.env.PUBLIC_URL}/SVG/${FOG}`} alt="Fog" />;
    case "CLOUDY":
      return (
        <img src={`${process.env.PUBLIC_URL}/SVG/${CLOUDY}`} alt="Cloudy" />
      );
    case "PARTLYCLOUDYDAY":
      return (
        <img
          src={`${process.env.PUBLIC_URL}/SVG/${PARTLYCLOUDYDAY}`}
          alt="Partly-Cloudy-Day"
        />
      );
    case "PARTLYCLOUDYNIGHT":
      return (
        <img
          src={`${process.env.PUBLIC_URL}/SVG/${PARTLYCLOUDYNIGHT}`}
          alt="Partly-Cloudy-Night"
        />
      );
    case "HAIL":
      return <img src={`${process.env.PUBLIC_URL}/SVG/${HAIL}`} alt="Hail" />;
    case "THUNDERSTORM":
      return (
        <img
          src={`${process.env.PUBLIC_URL}/SVG/${THUNDERSTORM}`}
          alt="Thunderstorm"
        />
      );
    case "TORNADO":
      return (
        <img src={`${process.env.PUBLIC_URL}/SVG/${TORNADO}`} alt="Tornado" />
      );
    default:
      return <div>Weather condition not found</div>;
  }
};

export default WeatherIcon;
