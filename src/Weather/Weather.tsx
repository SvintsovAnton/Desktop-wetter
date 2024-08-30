import { useState, ChangeEvent } from "react";

import Input from "components/Input/Input";
import Button from "components/Button/Button";

import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import WeatherError from "./components/WeatherError/WeaherError";

import { WeatherInfoData, WeatherErrorData } from "./types";
import {
  WeatherWrapper,
  Header,
  Main,
  WeatherForm,
  WeatherButtonWrapper,
  InputButtonWrapper,
  Loading,
} from "./styles";

function Weather() {

  const [city, setCity] = useState<string>("");

  const [weatherInfo, setWeatherInfo] = useState<WeatherInfoData | undefined>(
    undefined
  );

  const [weatherError, setWeatherError] = useState<
    WeatherErrorData | undefined
  >(undefined);

  const [isLoading, setLoading] = useState<boolean>(false);

  const APP_ID: string = "eea75aae6dbe00233ac1efadf2d99a2a";

  const URL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}`;

  const onChangeCity = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const getWeatherInfo = async () => {

    if (city.trim().length === 0) {
      return alert("Enter city name");
    }


    setWeatherInfo(undefined);
    setWeatherError(undefined);

    setLoading(true);


    const response = await fetch(URL);
    const data = await response.json();

    console.log(response.ok);
    console.log(data);

    if (response.ok) {

      setLoading(false);
      setWeatherInfo({
        temp: `${Math.round(data.main.temp - 273.15)}°`,
        icon: `http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`,
        cityName: `${data.name}`,
      });
    } else {

      setLoading(false);
      setWeatherError({ cod: data.cod, message: data.message });
    }
  };

  return (
    <WeatherWrapper>
      <Header>Weather App</Header>
      <Main>
        <WeatherForm>
          <InputButtonWrapper>
            <Input
              placeholder="Enter city name"
              onChange={onChangeCity}
              value={city}
              name="city"
              id="weather-city"
              isWhite
            />
            <WeatherButtonWrapper>
              <Button name="Search" onClick={getWeatherInfo} />
            </WeatherButtonWrapper>
          </InputButtonWrapper>
          {isLoading && <Loading>Loading...</Loading>}
          {!!weatherInfo && (
            <WeatherInfo
              temp={weatherInfo.temp}
              icon={weatherInfo.icon}
              cityName={weatherInfo.cityName}
            />
          )}
          {!!weatherError && <WeatherError error={weatherError} />}
        </WeatherForm>
      </Main>
    </WeatherWrapper>
  );
}

export default Weather;
