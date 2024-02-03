import React from "react";
import axios from "axios";

import "./App.css";
import { CiTempHigh } from "react-icons/ci";
import { FaWind } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

import { WiHumidity } from "react-icons/wi";
import { IoSearchOutline } from "react-icons/io5";


import humidity from "./assets/humidity.jpg";
import temparature from "./assets/temparature.jpg";
import wind from "./assets/wind.jpg";

import { useState, useEffect } from "react";




function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [time, setTime] = useState(new Date());
 
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
 
  const apiKey = "969d75b290e86818a8c7f0450a561ac8";

  useEffect(() => {
    handleSearch;
  
  }, [city]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city||oncity}&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(
          "City not found. Please check the spelling and try again."
        );
      }

      const data = await response.json();
      console.log(data);
      
      setWeatherData(data);
      
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError(error.message);
    }
  };
  
 
  

  const handleOnchange = (e) => {
    setCity(e.target.value);
  };

  const cities = [
    {
      id: 1,
      title: "Bangalore",
    },
    {
      id: 2,
      title: "Mysore",
    },
    {
      id: 3,
      title: "Tumakuru",
    },
    {
      id: 4,
      title: "Shivamogga",
    },
    {
      id: 5,
      title: "Nelamangala",
    },
  ];



  useEffect(() => {
    const inter = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(inter);
    };
  }, []);

const GeoLocation = () => {
 
  useEffect(() => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, []);

  useEffect(() => {
    
    if (location.latitude && location.longitude) {
      const apiKey = '969d75b290e86818a8c7f0450a561ac8';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`;

      axios.get(apiUrl)
        .then(response => {
          setWeatherData(response.data);
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error fetching weather data:', error.message);
        });
    }
  }, [location]);
  

}

GeoLocation()


  return (
    <>
   
  
     
      <div className="container">
      <h1 className="text-3xl text-center my-10 text-white">Weather-App</h1>
     {error && (<div className="flex justify-center items-center">
        <h3 className=" text-red-500">
          {error}
        </h3>
      </div>)
}

 {!weatherData  && (<div className="flex justify-center items-center max-w-full flex-col gap-3">
    <div className="spinner">

    </div>
      <p>Loading....</p>
  </div>
  )} 
      
       
       { weatherData && (
        <>
        <div className=" city">
         {cities.map((cit) => (
          <p
            key={cit.id}
            className="text-white text-md font-medium hover:text-[#6fe7ff]"
            
                    
          >
            {cit.title}
          </p>
        ))} 
       
      </div>
      <div className="width">
        <div className="inputbox">
          <input
            type="text"
            className="text-md  p-2  shadow-xl focus:outline-none rounded-md capitalize placeholder:lowercase text-black font-medium input"
            name=""
            id=""
            onChange={handleOnchange}
            placeholder="search city name...."
          />
          <IoSearchOutline
            size={25}
            className="text-white cursor-pointer transition ease-out hover:scale-125 search"
            onClick={handleSearch}
          />
      
        </div>
      
      </div>
      </>
       )} 
     
        {weatherData &&  (
          <div>
            <div className="flex items-center justify-center my-6">
              <p className="text-white text-sm  font-extralight">
                {time.toLocaleDateString()} | Local time:-
                {time.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center justify-center my-3">
              <p className=" text-2xl font-medium text-orange-400 text-center">
                {weatherData.name}
              </p>
            </div>
            <div className="flex items-center justify-center py-6 text-xl text-white-800">
              <p className="text-2xl capitalize para text-cyan-600  des">
                {weatherData.weather[0].description}
              </p>
            </div>
            <div className="flex flex-row items-center justify-center text-white py-3">
              <p className="flex flex-col space-y-2 text-5xl text-center">
                {Math.floor(weatherData.main.temp - 273.15)}
               °C
              </p>
            </div>
          </div>
        )}
        {weatherData && (
          <div className="temp">
            <div className="img-con">
              <img src={humidity} className=" imga" />
            </div>
            <div className="child">
              <div className="font -light text-md">
                <div className="flex w-200 h-500 rounded con flex-col justify-center items-center p-5 m-5 child1">
                  <CiTempHigh size={30} color="white" /> Real fell
                  <span className="ml-1">{Math.floor(weatherData.main.feels_like-273.15)}°C</span>
                </div>
              </div>
              <div className="font -light text-md ">
                <div className="flex w-200 h-500 rounded con flex-col justify-center items-center p-5 m-5 child1">
                  <FaWind size={20} color="white" className="ml-1 mr-1" /> Wind:
                  <span className="ml-1">{weatherData.wind.speed} km/hr</span>
                </div>
              </div>
              <div className="font -light text-md justify-start ">
                <div className="flex w-200 h-500 rounded con flex-col justify-center items-center p-5 m-5 child1">
                  <WiHumidity size={30} color="white" />
                  Humidity:
                  <span className="ml-1">{weatherData.main.humidity} %</span>
                </div>
              </div>
            </div>
          </div>
        )}

       {weatherData &&(<div className="flex flex-row items-center justify-center space-x-2  text-sm py-3">
          
          <FaArrowUp />
          <p className="font-light">
            High: <span className="font-medium ml-1">{Math.floor(weatherData.main.temp_max-273.15)}°C </span>
          </p>
          <p className="font-light"></p>
          <FaArrowDown />
          <p className="font-light">
            Low: <span className="font-medium ml-1">{Math.floor(weatherData.main.temp_max-273.15)}°C </span>
          </p>
          <p className="font-light"></p>
        </div>)
}
      </div>
        
      <div className="flex text-white justify-around mt-10 footer">
        <p className="text-sm small">Designed and Developed by ANJAN</p>
        <p className="text-sm small">&copy; All rights are reserved</p>
      </div>
   
    </>
  );
}

export default App;
