import { FC, useMemo, useEffect, useState } from "react";
import { weekNames, monthNames } from "../util/util";
import {
  getModifiedDateObj,
  getTotalNoOfDays,
  getCalDatesObj,
} from "../util/util";
import "./calendar.scss";

interface CalendarProps {
  startWeek?: "SUNDAY" | "MONDAY";
}

interface Calbody {
  label: string | number;
  key: string;
}

const Calendar: FC<CalendarProps> = (props) => {
  const { startWeek } = props;

  const [monthFirstDay, setMonthFirstDay] = useState<number>(0);
  const [totalNoDays, setTotalNoDays] = useState<number>(0);
  const [monthIndex, setMonthIndex] = useState(0);
  const [year, setYear] = useState(0);
  const [calBodyData, setCalBodyData] = useState<Calbody[][]>([]);

  const calendarHeader = useMemo(() => {
    return weekNames.map((weekName: string, index: number) => {
      return <td key={weekName}>{weekName.toUpperCase()}</td>;
    });
  }, [startWeek]);

  useEffect(() => {
    let dateObj = new Date();
    let monthStartDate = getModifiedDateObj(
      dateObj.getMonth(),
      dateObj.getFullYear()
    );
    let totalDays = getTotalNoOfDays(
      monthStartDate.getMonth(),
      monthStartDate.getFullYear()
    );
    setMonthIndex(monthStartDate.getMonth());
    setYear(monthStartDate.getFullYear());
    setMonthFirstDay(monthStartDate.getDay());
    setTotalNoDays(totalDays);
  }, []);

  useEffect(() => {
    if (totalNoDays > 0) {
      let body = getCalDatesObj(totalNoDays, monthFirstDay);
      setCalBodyData(body);
    }
  }, [monthIndex]);

  //   --------- next month code goes here ---------

  const updateNextMonthDetails = () => {
    let updatedMonthIndex = monthIndex + 1;
    let updatedYear = year;

    if (updatedMonthIndex === 12) {
      updatedMonthIndex = 0;
      updatedYear = year + 1;
    }

    let monthStartDate = getModifiedDateObj(updatedMonthIndex, updatedYear);
    let totalDays = getTotalNoOfDays(
      monthStartDate.getMonth(),
      monthStartDate.getFullYear()
    );

    setMonthIndex(monthStartDate.getMonth());
    setYear(monthStartDate.getFullYear());
    setMonthFirstDay(monthStartDate.getDay());
    setTotalNoDays(totalDays);
  };

  //  --------- end nextmonth code -----------------

  //  ---------- previous month code goes here -----

  const updatePreviousMonthDetails = () => {
    let updatedMonthIndex = monthIndex - 1;
    let updatedYear = year;

    if (updatedMonthIndex === -1) {
      updatedMonthIndex = 11;
      updatedYear = year - 1;
    }

    let monthStartDate = getModifiedDateObj(updatedMonthIndex, updatedYear);
    let totalDays = getTotalNoOfDays(
      monthStartDate.getMonth(),
      monthStartDate.getFullYear()
    );

    setMonthIndex(monthStartDate.getMonth());
    setYear(monthStartDate.getFullYear());
    setMonthFirstDay(monthStartDate.getDay());
    setTotalNoDays(totalDays);
  };

  //  ---------- end previous month code ----------

  let view = calBodyData.map((weeksArray, index) => {
    return (
      <tr key={`week_${index}`}>
        {weeksArray.map((dayObj, index) => {
          return <td key={`${dayObj.key}_${index}`}><div className="date">{dayObj.label}</div></td>;
        })}
      </tr>
    );
  });

  return (
    <div className="wrapper">
      <div className="calendarHeader">
        <div className="monthDetails">
          <span>{monthNames[monthIndex]}</span> {year}
        </div>
        <div className="action">
          <div onClick={updatePreviousMonthDetails}>&#x3c;</div>
          <div>Today</div> <div onClick={updateNextMonthDetails}>&#x3e;</div>
        </div>
      </div>
      <table>
        <thead>
          <tr>{calendarHeader}</tr>
        </thead>
        <tbody>{view}</tbody>
      </table>
    </div>
  );
};

Calendar.defaultProps = {
  startWeek: "SUNDAY",
};

export default Calendar;
