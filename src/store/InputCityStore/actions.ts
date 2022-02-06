export enum ReqCityActionsType {
  // eslint-disable-next-line no-unused-vars
  reqCityWeather = "REQ_CITY_WEATHER",
}

export const reqCityWeatherAction = (data: any) => {
  return {
    type: ReqCityActionsType.reqCityWeather,
    payload: data,
  };
};
