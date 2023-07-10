import { FC, useMemo, useEffect, useState } from "react";
import Modal from "./modal";
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

interface templateOneResponse {
  title: string;
  titleOnCal: string;
  place: string;
  description: string;
}

interface Calbody {
  label: string | number;
  key: string;
  isTodayDate: boolean;
  isCurrentMontDate: boolean;
  year: string | number;
  eventKey: string;
  canAddEvent: boolean;
  events: templateOneResponse[] | [];
}

const Calendar: FC<CalendarProps> = (props) => {
  const { startWeek } = props;

  const [monthFirstDay, setMonthFirstDay] = useState<number>(0);
  const [totalNoDays, setTotalNoDays] = useState<number>(0);
  const [monthIndex, setMonthIndex] = useState(0);
  const [year, setYear] = useState(0);
  const [calBodyData, setCalBodyData] = useState<Calbody[][]>([]);
  const [eventDate, setEventDate] = useState<string>("");
  const [isAddEventModalVisible, setAddEventModalVisibleState] =
    useState<boolean>(false);
  const [isNewEventAdded, setEventStatus] = useState<boolean>(false);

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
      let dateObj = new Date();
      let isCurrentMonth =
        dateObj.getMonth() === monthIndex && year === dateObj.getFullYear();
      let body = getCalDatesObj(
        totalNoDays,
        monthFirstDay,
        isCurrentMonth,
        dateObj.getDate(),
        monthIndex,
        year
      );
      setCalBodyData(body);
    }
  }, [monthIndex]);

  useEffect(() => {
    if (totalNoDays > 0 && isNewEventAdded === true) {
      let dateObj = new Date();
      let isCurrentMonth =
        dateObj.getMonth() === monthIndex && year === dateObj.getFullYear();
      let body = getCalDatesObj(
        totalNoDays,
        monthFirstDay,
        isCurrentMonth,
        dateObj.getDate(),
        monthIndex,
        year
      );
      setCalBodyData(body);
      setEventStatus(false);
    }
  }, [isNewEventAdded]);

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

  const toggleAddEventModal = (dayObj: Calbody) => {
    if (dayObj.canAddEvent === true) {
      let eventDate = dayObj.eventKey;
      setEventDate(eventDate);
      setAddEventModalVisibleState(true);
    } else {
      alert("You can add event to current month only");
    }
  };

  const closeAddEventModal = () => {
    setAddEventModalVisibleState(false);
  };

  const showEventDetails = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("show event details");
  };

  let view = calBodyData.map((weeksArray, index) => {
    return (
      <tr key={`week_${index}`}>
        {weeksArray.map((dayObj, index) => {
          let dateClassName = dayObj.isCurrentMontDate ? "date" : "oldDate";
          return (
            <td key={`${dayObj.key}_${index}`}>
              <div
                onClick={() => {
                  toggleAddEventModal(dayObj);
                }}
                className={dateClassName}
              >
                {dayObj.isTodayDate ? (
                  <span className="today">{dayObj.label}</span>
                ) : (
                  <span>{dayObj.label}</span>
                )}
                {dayObj.events.length > 0
                  ? dayObj.events.map(
                      (evetnObj: templateOneResponse, index) => {
                        if (index <= 1) {
                          return (
                            <div className="event" onClick={showEventDetails}>
                              {evetnObj.titleOnCal}
                            </div>
                          );
                        } else {
                          return null;
                        }
                      }
                    )
                  : null}
                  {dayObj.events.length > 2 ? <div>...more</div>:null}
              </div>
            </td>
          );
        })}
      </tr>
    );
  });

  // ----------- code for today -----

  const loadCurrentMonthCal = () => {
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
  };

  const createEvent = (eventObj: templateOneResponse) => {
    if (typeof Storage !== "undefined") {
      let dateObjString = localStorage.getItem("calDates");
      if (dateObjString) {
        let dateString = eventDate.split("_");
        let calKey = `${dateString[1]}${dateString[2]}`;
        let calListObj = JSON.parse(dateObjString);
        let calObjsArray = JSON.parse(calListObj[calKey]);
        let updatedColObjArray = calObjsArray.map((weeksArray: Calbody[]) => {
          return weeksArray.map((obj) => {
            return {
              ...obj,
              events:
                obj.eventKey === eventDate
                  ? [...obj.events, eventObj]
                  : obj.events,
            };
          });
        });
        calListObj[calKey] = JSON.stringify(updatedColObjArray);
        localStorage.setItem("calDates", JSON.stringify(calListObj));
        setEventStatus(true);
        setAddEventModalVisibleState(false);
      }
    }
  };

  return (
    <>
      <Modal
        title={`Add a new event on (${eventDate})`}
        isVisible={isAddEventModalVisible}
        isOutsideClickActive={true}
        onAddEvent={createEvent}
        onClose={closeAddEventModal}
      />
      <div className="wrapper">
        <div className="calendarHeader">
          <div className="monthDetails">
            <span>{monthNames[monthIndex]}</span> {year}
          </div>
          <div className="action">
            <div onClick={updatePreviousMonthDetails}>&#x3c;</div>
            <div onClick={loadCurrentMonthCal}>Today</div>
            <div onClick={updateNextMonthDetails}>&#x3e;</div>
          </div>
        </div>
        <table>
          <thead>
            <tr>{calendarHeader}</tr>
          </thead>
          <tbody>{view}</tbody>
        </table>
      </div>
    </>
  );
};

Calendar.defaultProps = {
  startWeek: "SUNDAY",
};

export default Calendar;
