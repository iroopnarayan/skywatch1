// // import { SiPrimereact } from "react-icons/si";
// import { useEffect, useState } from "react";
// import Forcast from "./components/Forcast";
// import Inputs from "./components/inputs";
// import TempratureInfo from "./TempratureInfo";
// import TimeAndLocation from "./TimeAndLocation";
// import TopButtons from "./components/TopButtons";
// import getFormattedWeatherData from "./services/weatherService";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // import getWeatherData from "./services/weatherService";
// const App = () => {
//   const [query, setQuery] = useState({ q: "Jaipur" });
//   const [units, setUnits] = useState("metric");
//   const [weather, setWeather] = useState(null);

//   const getWeather = async () => {
//     const CityName = query.q ? query.q : "current location";
//     toast.info(`Fetching weather data for ${CityName}`);
//     console.log(`Fetching weather data for ${CityName}`);

//     await getFormattedWeatherData({ ...query, units }).then((data) => {
//       toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
//       console.log(`Fetched weather data for ${data.name}, ${data.country}`);

//       setWeather(data);
//     });
//     console.log(data);
//   };
//   // { q: "jaipur" }
//   useEffect(() => {
//     getWeather;
//   }, [query, units]);
//   getWeather();

//   const formatBackground = () => {
//     if (!weather) return "from-blue-400 to-gray-300";
//     const threshold = units === "metric" ? 20 : 60;
//     if (weather.temp <= threshold) return "from-blue-400 to-gray-300";
//     return "from-blue-300 to-pink-300";
//   };
//   return (
//     <div
//       className={`mx-auto rounded-lg max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}
//     >
//       <TopButtons setQuery={setQuery}></TopButtons>
//       <Inputs setQuery={setQuery} setUnits={setUnits}></Inputs>

//       {weather && (
//         <>
//           {/* <SiPrimereact /> */}
//           <TimeAndLocation weather={weather}></TimeAndLocation>
//           <TempratureInfo weather={weather} units={units}></TempratureInfo>

//           <Forcast title="3 hour step forecast" data={weather.hourly}></Forcast>
//           <Forcast title="daily forecast" data={weather.daily}></Forcast>
//         </>
//       )}
//       <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
//       <span className="flex text-right justify-end mt-9">@iroopnarayan</span>
//     </div>
//   );
// };

// export default App;

import { useEffect, useState } from "react";
import Forcast from "./components/Forcast";
import Inputs from "./components/inputs";
import TempratureInfo from "./TempratureInfo";
import TimeAndLocation from "./TimeAndLocation";
import TopButtons from "./components/TopButtons";
import getFormattedWeatherData from "./services/weatherService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [query, setQuery] = useState({ q: "Jaipur" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [isFetching, setIsFetching] = useState(false); // State to track fetching

  const getWeather = async () => {
    const CityName = query.q ? query.q : "current location";

    if (!isFetching) {
      setIsFetching(true);
      toast.info(`Fetching weather data for ${CityName}`);
      console.log(`Fetching weather data for ${CityName}`);
    }

    try {
      const data = await getFormattedWeatherData({ ...query, units });
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      console.log(`Fetched weather data for ${data.name}, ${data.country}`);

      setWeather(data);
    } catch (error) {
      toast.error("Error fetching weather data");
      console.error("Error fetching weather data:", error);
    } finally {
      setIsFetching(false); // Reset fetching state
    }
  };

  useEffect(() => {
    getWeather(); // Call the function here
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-blue-400 to-gray-300";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-blue-400 to-gray-300";
    return "from-blue-300 to-pink-300";
  };

  return (
    <div
      className={`mx-auto rounded-lg max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery}></TopButtons>
      <Inputs setQuery={setQuery} setUnits={setUnits}></Inputs>

      {weather && (
        <>
          <TimeAndLocation weather={weather}></TimeAndLocation>
          <TempratureInfo weather={weather} units={units}></TempratureInfo>

          <Forcast title="3 hour step forecast" data={weather.hourly}></Forcast>
          <Forcast title="daily forecast" data={weather.daily}></Forcast>
        </>
      )}
      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
      <span className="flex text-right justify-end mt-9">@iroopnarayan</span>
    </div>
  );
};

export default App;
