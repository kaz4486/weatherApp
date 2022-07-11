import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback } from 'react';
import { useState } from 'react';

const WeatherBox = (props) => {
  const [weatherData, setWetherData] = useState('');
  const [pending, setPending] = useState(false);
  const [statusError, setStatusError] = useState(false);

  const handleCityChange = useCallback((cityName) => {
    console.log(cityName);
    setPending(true);
    setStatusError(false);

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=73a32b08d24140cbd3b989a1678f70c8&units=metric`
    ).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          };

          setWetherData(weatherData);
          setPending(false);
        });
      } else {
        alert('ERROR!');
        setStatusError(true);
      }
    });
  }, []);

  return (
    <section>
      <PickCity handleCityChange={handleCityChange} />
      {weatherData && !pending && !statusError && (
        <WeatherSummary {...weatherData} />
      )}
      {pending && !statusError && <Loader />}
      {statusError && <ErrorBox />}
    </section>
  );
};

export default WeatherBox;
