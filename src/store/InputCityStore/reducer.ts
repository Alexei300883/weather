import { ReqCityActionsType } from "./actions";
import { ReducerCityType } from "./type";

const inState: ReducerCityType = {
  cityWeth: [],
};

const reducer = (state = inState, action: any): ReducerCityType => {
  switch (action.type) {
    case ReqCityActionsType.reqCityWeather:
      return {
        ...state,
        cityWeth: action.payload,
      };
    default:
      return state;
  }
};
