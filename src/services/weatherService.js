import { DateTime } from "luxon";

const API_KEY = "cccbb778b15b6f741efa148a262fe601"; //open weather ki personal key 2nd wali(roop);

const BASE_URL = "https://api.openweathermap.org/data/2.5/"; //examples  of API calls from pricing section and current weather

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  // console.log(url);
  return fetch(url).then((res) => res.json());
  // .then((data) => data);
};
// const getWeatherData = async (infoType, searchParams) => {
//   try {
//     const url = new URL(BASE_URL + infoType);
//     url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
//     const res = await fetch(url);
//     if (!res.ok) throw new Error("Network response was not ok");
//     return await res.json();
//   } catch (error) {
//     console.error("Error fetching weather data:", error);
//     return null; // or handle it in a way that suits your application
//   }
// };

const iconUrlFromCode = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

const formatCurrent = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  // const { main: details, icon } = weather[0];
  const { main: details, icon } = weather?.[0] || {};

  const formattedLocalTime = formatToLocalTime(dt, timezone);
  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:,mm:a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:,mm:a"),
    speed,
    details,
    icon: iconUrlFromCode(icon),
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon,
  };
};

// const formatForecastWeather = (sec, offset, data) => {
//   //hour
//   const hourly = data
//     .filter((f) => f.dt > secs)
//     .slice(0, 5)
//     .map((f) => ({
//       temp: f.main.temp,
//       title: formatToLocalTime(f.dt, offset, "hh:mm a"),
//       icon: iconUrlFromCode(f.weather[0].icon),
//       data: f.dt_txt,
//     }));

//   //daily
//   return { hourly };
// };
const formatForecastWeather = (sec, offset, data) => {
  if (!data || !Array.isArray(data)) return { hourly: [] }; // Return empty if data is invalid

  console.log(sec);
  const hourly = data
    .filter((f) => f.dt > sec)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrlFromCode(f.weather?.[0]?.icon),
      date: f.dt_txt,
    }))
    .slice(0, 5);

  //daily
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromCode(f.weather?.[0]?.icon),
      date: f.dt_txt,
    }));

  return { hourly, daily };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrent);
  const { dt, lat, lon, timezone } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((d) => formatForecastWeather(dt, timezone, d.list)); //phle formatted kiuya then error
  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

export default getFormattedWeatherData;

// import { DateTime } from "luxon";

// const API_KEY = "cccbb778b15b6f741efa148a262fe601"; //open weather ki personal key 2nd wali(roop);

// const BASE_URL = "https://api.openweathermap.org/data/2.5/"; //examples  of API calls from pricing section and current weather

// const getWeatherData = (infoType, searchParams) => {
//   const url = new URL(BASE_URL + infoType);
//   url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
//   // console.log(url);
//   return fetch(url).then((res) => res.json());
//   // .then((data) => data);
// };

// const iconUrlFromCode = (icon) =>
//   `http://openweathermap.org/img/wn/${icon}@2x.png`;

// const formatToLocalTime = (
//   secs,
//   offset,
//   format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a"
// ) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

// const formatCurrent = (data) => {
//   const {
//     coord: { lat, lon },
//     main: { temp, feels_like, temp_min, temp_max, humidity },
//     name,
//     dt,
//     sys: { country, sunrise, sunset },
//     weather,
//     wind: { speed },
//     timezone,
//   } = data;

//   const { main: details, icon } = weather[0];

//   const formattedLocalTime = formatToLocalTime(dt, timezone);
//   return {
//     temp,
//     feels_like,
//     temp_min,
//     temp_max,
//     humidity,
//     name,
//     country,
//     sunrise: formatToLocalTime(sunrise, timezone, "hh:,mm:a"),
//     sunset: formatToLocalTime(sunset, timezone, "hh:,mm:a"),
//     speed,
//     details,
//     icon: iconUrlFromCode(icon),
//     formattedLocalTime,
//     dt,
//     timezone,
//     lat,
//     lon,
//   };
// };

// const formatForecastWeather = (sec, offset, data) => {
//   //hour
//   const hourly = data
//     .filter((f) => f.dt > secs)
//     .slice(0, 5)
//     .map((f) => ({
//       temp: f.main.temp,
//       title: formatToLocalTime(f.dt, offset, "hh:mm a"),
//       icon: iconUrlFromCode(f.weather[0].icon),
//       data: f.dt_txt,
//     }));

//   //daily
//   return { hourly };
// };

// const getFormattedWeatherData = async (searchParams) => {
//   const formattedCurrentWeather = await getWeatherData(
//     "weather",
//     searchParams
//   ).then(formatCurrent);
//   const { dt, lat, lon, timezone } = formattedCurrentWeather;

//   const formattedForecastWeather = await getWeatherData("forecast", {
//     lat,
//     lon,
//     units: searchParams.units,
//   }).then((d) => formatForecastWeather(dt, timezone, d.list)); //phle formatted kiuya then error
//   return { ...formattedCurrentWeather, ...formattedForecastWeather };
// };

// export default getFormattedWeatherData;
