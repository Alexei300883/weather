import React, { useEffect, useState } from "react";
import axios from "axios";
import Widget from "../../components/Widget/Index";
import CardOneDay from "../../components/CardOneDay";

type RequestWeatherType = {
  userCity: any;
};

const RequestWeather: React.FC<RequestWeatherType> = (props) => {
  const { userCity } = props;
  const [data, setData] = useState(undefined);
  const [isOneDay, setIsOneDay] = useState(undefined);
  const [oneDay, setOneDay] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data === undefined && userCity !== null && !loading) {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${userCity.latitude}&lon=${userCity.longitude}&units=metric&exclude=hourly,alerts,minutely&lang=ru&appid=${process.env.REACT_APP_API_KEY}`;
      // const url = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&lang=ru&appid=${process.env.REACT_APP_API_KEY}`;
      axios({
        method: "GET",
        url,
        withCredentials: false,
      }).then((response) => {
        console.log("ggg", response);
        if (response.status === 200) {
          setData(response.data.daily);
          setIsOneDay(response.data.current);
        }
        setLoading(false);
      });
    }
  }, [data, isOneDay, loading]);

  console.log("data", data);
  console.log("isOneDay", isOneDay);
  return (
    <div>
      {/* {data !== undefined && oneDay ? (
        <Widget data={data} city={userCity.city} />
      ) : (
        <div>.</div>
      )}
      {isOneDay !== undefined && !oneDay ? (
        <WidgetOne isOneDay={isOneDay} city={userCity.city} />
      ) : (
        <div>.</div>
      )} */}

      {data && oneDay && <Widget data={data} city={userCity.city} />}
      {isOneDay && !oneDay && (
        <CardOneDay isOneDay={isOneDay} city={userCity.city} />
      )}
      {!data && !isOneDay && <div>нет данных</div>}
      <br />
      <button type="button" onClick={() => setOneDay((prev) => !prev)}>
        {oneDay ? "Погода на один день" : "Погода на неделю"}
      </button>
    </div>
  );
};
export default RequestWeather;
