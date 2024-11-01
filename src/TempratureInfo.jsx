import React from "react";
import { BsThermometerSun } from "react-icons/bs";
import { BsDropletHalf } from "react-icons/bs";
import { LuWind } from "react-icons/lu";
import { IoMdPartlySunny } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { GiSunrise, GiSunset } from "react-icons/gi";
const TempratureInfo = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
  units,
}) => {
  // we are creating this array instead of creating multiple div
  const tempratureDetails = [
    {
      id: 1,
      Icon: BsThermometerSun,
      title: "Real Feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BsDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: LuWind,
      title: "Wind",
      value: `${speed.toFixed()} ${units === "metric" ? "km/ h" : "m/s"}`,
    },
  ];

  const tempAnotherDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}°`,
    },

    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}°`,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center py-4 text-xl text-blue-600">
        <p>{details}</p>
      </div>

      <div className="flex flow-row items-center justify-between py-3">
        <img src={icon} alt="ee weather icon laage che" className="w-20" />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>

        <div className="flex flex-col space-y-3 items-start">
          {tempratureDetails.map(({ id, Icon, title, value }) => (
            <div
              key={id}
              className="flex font-light text-sm items-center justify-center"
            >
              <Icon size={30} className="mr-1" />
              {`${title}: `} <span className="font-medium ml-1">{value}</span>
            </div>
          ))}

          {/* <div className="flex font-light text-sm items-center justify-center">
            <BsDropletHalf size={30} className="mr-1" />
            Humidity <span className="font-medium ml-1">35°C</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <LuWind size={30} className="mr-1" />
            Wind <span className="font-medium ml-1">35°C</span>
          </div> */}
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-10 text-sm py-3">
        {tempAnotherDetails.map(({ id, Icon, title, value }) => (
          <div key={id} className="flex  flex-row items-center">
            <Icon size={30}></Icon>
            <p className="font-light ml-1" />
            {`${title}: `} <span className="font-medium ml-1">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempratureInfo;
