import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestWeather from "../RequestWeather/Index";

// import "./App.css";

type IUser = {
  country: string;
  country_code: string;
  country_flag: string;
  city: string;
  latitude: number;
  longitude: number;
};

const RequestCity = () => {
  const [userIp, setUserIp] = useState(null);
  const [loadingApp, setLoadingApp] = useState(false);
  const [userCity, setUserCity] = useState<IUser | null>(null);
  const [loadingUserCity, setLoadingUserCity] = useState(false);

  useEffect(() => {
    if (userIp === null && !loadingApp) {
      setLoadingApp(true);
      const url = "https://api.ipify.org/?format=json";
      axios({
        method: "GET",
        url,
        withCredentials: false,
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          setUserIp(response.data.ip);
        }
        setLoadingUserCity(false);
      });
    }
  }, [userIp, loadingApp]);

  useEffect(() => {
    if (userIp !== null && userCity === null && !loadingUserCity) {
      setLoadingUserCity(true);
      const url: string = `http://ipwhois.app/json/${userIp}`;
      axios({
        method: "GET",
        url,
        withCredentials: false,
      }).then((response) => {
        console.log("k", response);
        if (response.status === 200) {
          setUserCity(response.data);
        }
        setLoadingUserCity(false);
      });
    }
  }, [userIp, userCity, loadingUserCity]);
  return (
    <div>
      {userCity !== null ? (
        <RequestWeather userCity={userCity} />
      ) : (
        <div>Нет данных</div>
      )}
    </div>
  );
};

export default RequestCity;
