import { FC, useMemo, useEffect, useState } from "react";
import { weekNames, monthNames } from "../util/util";
import { getModifiedDateObj, getTotalNoOfDays } from "../util/util";
import "./calendar.scss";

interface CalendarProps {
  startWeek?: "SUNDAY" | "MONDAY";
}

const Calendar: FC<CalendarProps> = (props) => {
  const { startWeek} = props;

  const [monthFirstDay, setMonthFirstDay] = useState<number>(0);
  const [totalNoDays, setTotalNoDays] = useState<number>(0);
  const [monthIndex, setMonthIndex] = useState(0);
  const [year, setYear] = useState(0);
  const [isMonthUpdated, setMonthUpdateState] = useState(false)

  const calendarHeader = useMemo(() => {
    return weekNames.map((weekName: string, index: number) => {
      return <td key={weekName}>{weekName.toUpperCase()}</td>;
    });
  }, [startWeek]);

  useEffect(() => {
    let dateObj = new Date();
    let monthStartDate = getModifiedDateObj(dateObj.getMonth(),dateObj.getFullYear());
    let totalDays = getTotalNoOfDays(
      monthStartDate.getMonth(),
      monthStartDate.getFullYear()
    );
    setMonthIndex(monthStartDate.getMonth());
    setYear(monthStartDate.getFullYear())
    setMonthFirstDay(monthStartDate.getDay());
    setTotalNoDays(totalDays);
  },[])

  useEffect(() => {
    // let monthStartDate = getModifiedDateObj(monthIndex,year);
    // let totalDays = getTotalNoOfDays(
    //   monthStartDate.getMonth(),
    //   monthStartDate.getFullYear()
    // );
    // setMonthIndex(monthStartDate.getMonth());
    // setYear(monthStartDate.getFullYear())
    // setMonthFirstDay(monthStartDate.getDay());
    // setTotalNoDays(totalDays);
  }, [isMonthUpdated]);

  const firstWeek = useMemo(() => {
    let firstRow = [];
    let dates = 1;
    for (let i = 0; i < 7; i++) {
      if (i < monthFirstDay) {
        firstRow.push(<td className="CalDay"></td>);
      } else {
        firstRow.push(<td className="CalDay">{dates}</td>);
        dates = dates + 1;
      }
    }
    return firstRow;
  }, [monthFirstDay,monthIndex]);

  let calbody = [];

  let tempBody: any = [];

  let weekcounter = 0;
  let dates = 7 - monthFirstDay + 1;
  for (let i = 7 - monthFirstDay; i <= totalNoDays; i++) {
    if (dates <= totalNoDays) {
      if (weekcounter < 7) {
        weekcounter = weekcounter + 1;
      } else {
        weekcounter = 1;
      }

      let calDate = <td>{dates}</td>;
      tempBody.push(calDate);
      if (weekcounter === 7) {
        let week = <tr>{tempBody}</tr>;
        calbody.push(week);
        tempBody = [];
      }
      dates = dates + 1;
    }
  }

  if (tempBody.length > 0) {
    for (let i = tempBody.length; i < 7; i++) {
        tempBody.push(<td></td>);
    }
    let week = <tr>{tempBody}</tr>;
        calbody.push(week);
  }

//   --------- next month code goes here ---------

const updateNextMonthDetails = () => {
    let updatedMonthIndex = monthIndex + 1;
    let updatedYear = year;

    if (updatedMonthIndex === 12) {
        updatedMonthIndex = 0;
        updatedYear = year + 1
    }

    setMonthUpdateState(!isMonthUpdated);

    let monthStartDate = getModifiedDateObj(updatedMonthIndex,updatedYear);
    let totalDays = getTotalNoOfDays(
      monthStartDate.getMonth(),
      monthStartDate.getFullYear()
    );
    setMonthIndex(monthStartDate.getMonth());
    setYear(monthStartDate.getFullYear())
    setMonthFirstDay(monthStartDate.getDay());
    setTotalNoDays(totalDays);
}


//  --------- end nextmonth code -----------------

//  ---------- previous month code goes here -----

const updatePreviousMonthDetails = () => {
    let updatedMonthIndex = monthIndex - 1;
    let updatedYear = year;

    if (updatedMonthIndex === -1) {
        updatedMonthIndex = 11;
        updatedYear = year - 1
    }

    setMonthUpdateState(!isMonthUpdated);

    let monthStartDate = getModifiedDateObj(updatedMonthIndex,updatedYear);
    let totalDays = getTotalNoOfDays(
      monthStartDate.getMonth(),
      monthStartDate.getFullYear()
    );
    setMonthIndex(monthStartDate.getMonth());
    setYear(monthStartDate.getFullYear())
    setMonthFirstDay(monthStartDate.getDay());
    setTotalNoDays(totalDays);
}

//  ---------- end previous month code ----------

  return (
    <div className="wrapper">
       <div onClick={updatePreviousMonthDetails} >Previous</div> {monthNames[monthIndex]} - {year} <div onClick={updateNextMonthDetails}>Next</div>
      <table>
        <thead>
          <tr>{calendarHeader}</tr>
        </thead>
        <tbody>
          <tr>{firstWeek}</tr>
          {calbody}
        </tbody>
      </table>
    </div>
  );
};

Calendar.defaultProps = {
  startWeek: "SUNDAY"
};

export default Calendar;
