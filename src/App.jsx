import { useState } from "react";
import "./App.css";
import { icon } from "./assets/images";
import moment from "moment/moment";

function App() {
  const labelstyle = "flex flex-col items-start justify-start gap-2  flex-1";
  const [day, setDay] = useState();
  const [mon, setMon] = useState();
  const [year, setYear] = useState();
  const [DayErr, setDayError] = useState("");
  const [MonErr, setMonError] = useState("");
  const [YearErr, setYearError] = useState("");

  const [age, setAge] = useState(null);

  function isDayNotValid() {
    let lastDayOfMonth = new Date(year, mon, 0).getDate();
    return !(day > 0 && day <= lastDayOfMonth);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    let birthdateStr = `${year}-${mon}-${day}`;
    if (!year) {
      setYearError("This feild is required");
    }
    if (!mon) {
      setMonError("This feild is required");
    }
    if (!day) {
      setDayError("This feild is required");
    }
    if (!(year && mon && day)) {
      return;
    }
    // Create a new Date object from the birthdate string
    let birthdate = new Date(birthdateStr);
    if (DayErr === "Must be a valid date" && !isDayNotValid()) {
      setDayError("");
    }
    if (year > new Date().getFullYear) {
      setYearError("Must be in the past");
    }
    if (mon > 12) {
      setMonError(true);
    }
    if (isDayNotValid()) {
      setDayError("Must be a valid date");
    }

    if (
      year > new Date().getFullYear() ||
      mon > 12 ||
      isDayNotValid() ||
      isNaN(birthdate)
    ) {
      setAge();
      return;
    }

    // Calculate the difference between the birthdate and the current date in milliseconds
    let diffInMs = Date.now() - birthdate.getTime();

    // Convert the difference to years and round down
    let years = Math.floor(diffInMs / 31557600000); // 31557600000 ms = 1 year
    let months = Math.floor((diffInMs % 31557600000) / 2629800000); // 2629800000 ms = 1 month
    let days = Math.floor(((diffInMs % 31557600000) % 2629800000) / 86400000); // 86400000 ms = 1 day

    setAge({ years, months, days });
  };

  return (
    <div className="App w-full h-screen flex max-lg:pt-8 items-center max-lg:items-start justify-center bg-[#f0f0f0] font-poppins">
      <div className="flex flex-col max-lg:w-[90%] bg-white w-[50%] p-10 rounded-2xl shadow-lg rounded-br-[100px]">
        <form
          action=""
          className="flex justify-between w-full gap-2 flex-col "
          onSubmit={submitHandler}
        >
          <div className="flex justify-start items-start inputs relative w-full max-lg:pr-0  max-lg:gap-2 pr-28 gap-9 ">
            <label className={labelstyle}>
              <p
                className={`font-bold text-[#716f6f] ${
                  DayErr && "text-[#ff5757]"
                }`}
              >
                Day
              </p>
              <input
                onChange={(e) => {
                  setDayError("");
                  setDay(e.target.value);
                }}
                placeholder="DD"
                type="number"
                className={`border text-3xl no-arrows max-lg:text-xl  text-[#141414]  ${
                  DayErr ? "border-[#ff5757]" : "focus:border-[#9a8ac1]"
                } outline-0 transition-all border-[#dbdbdb] font-bold rounded-lg py-2  p-4 w-full `}
              />
              <span className="text-[#ff5757] text-xs">{DayErr}</span>
            </label>
            <label className={labelstyle}>
              <p
                className={`font-bold text-[#716f6f] ${
                  MonErr && "text-[#ff5757]"
                }`}
              >
                Month
              </p>
              <input
                onChange={(e) => {
                  setMonError("");
                  setMon(e.target.value);
                }}
                placeholder="MM"
                type="number"
                className={`border text-3xl no-arrows max-lg:text-xl text-[#141414]  ${
                  MonErr || DayErr === "Must be a valid date"
                    ? "border-[#ff5757]"
                    : "focus:border-[#9a8ac1]"
                } outline-0 transition-all border-[#dbdbdb] font-bold rounded-lg py-2   p-4 w-full`}
              />
              <span className="text-[#ff5757] text-xs">{MonErr}</span>
            </label>
            <label className={labelstyle}>
              <p
                className={`font-bold text-[#716f6f] ${
                  YearErr && "text-[#ff5757]"
                }`}
              >
                Year
              </p>
              <input
                onChange={(e) => {
                  setYearError("");
                  setYear(e.target.value);
                }}
                placeholder="YYYY"
                type="number"
                className={`border text-3xl max-lg:text-xl no-arrows text-[#141414]  ${
                  YearErr || DayErr === "Must be a valid date"
                    ? "border-[#ff5757]"
                    : "focus:border-[#9a8ac1]"
                } outline-0 transition-all border-[#dbdbdb] font-bold rounded-lg py-2   p-4 w-full`}
              />
              <span className="text-[#ff5757] text-xs">{YearErr}</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-[#854dff] form-button hover:bg-[#141414] max-lg:w-16 max-lg:h-16 transition-all max-lg:self-center self-end relative w-20 h-20 rounded-full flex items-center justify-center"
          >
            <img className="w-[70%]" src={icon} alt="" />
          </button>
        </form>
        <div className="">
          <h1 className="font-extrabold m-0 text-[#141414] max-lg:text-5xl  text-7xl">
            <span className="text-8xl mr-1 max-lg:text-6xl text-[#854dff]">
              {age ? age.years : "--"}
            </span>
            years
          </h1>
          <h1 className="font-extrabold text-[#141414] italic max-lg:text-5xl text-7xl">
            <span className="text-8xl mr-1 max-lg:text-6xl text-[#854dff]">
              {age ? age.months : "--"}
            </span>
            months
          </h1>
          <h1 className="font-extrabold text-[#141414] italic max-lg:text-5xl  text-7xl">
            <span className="text-8xl mr-1 max-lg:text-6xl text-[#854dff]">
              {age ? age.days : "--"}
            </span>
            days
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
