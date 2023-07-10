interface Calbody {
  label: string | number;
  key: string;
  isTodayDate: boolean;
  isCurrentMontDate:boolean;
  year:string|number;
  eventKey: string;
  canAddEvent:boolean,
  events:string[] | []
}

export const getModifiedDateObj = (month: number, year: number): Date => {
  const dateObj = new Date();
  dateObj.setMonth(month, 1);
  dateObj.setFullYear(year);
  return dateObj;
};

export const getTotalNoOfDays = (monthNo: number, year: number): number => {
  let totalDays = 0;

  switch (monthNo) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      totalDays = 31;
      break;
    case 3:
    case 5:
    case 8:
    case 10:
      totalDays = 30;
      break;
    case 1:
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        totalDays = 29;
      } else {
        totalDays = 28;
      }
      break;
    default:
      totalDays = 0;
  }

  return totalDays;
};

const getPreviousMonthDates = (
  monthIndex: number,
  year: number,
  datesCount: number
) => {
  let updatedMonthIndex = monthIndex - 1;
  let updatedYear = updatedMonthIndex === 0 ? year - 1 : year;
  if (monthIndex < 0) {
    updatedMonthIndex = 11;
  }
  let prevMonthDateObj = getModifiedDateObj(updatedMonthIndex, updatedYear);

  let totalNoOfDays = getTotalNoOfDays(
    prevMonthDateObj.getMonth(),
    prevMonthDateObj.getFullYear()
  );

  let datesArray = [];

  for (let i = 1; i <= datesCount; i++) {
    datesArray.push(totalNoOfDays);
    totalNoOfDays = totalNoOfDays - 1;
  }
  return datesArray.reverse();
};

const checkForTTL = ():boolean => {
  let isValidTTL: boolean = false
  let TTL = localStorage.getItem("TTL");
  if (TTL === undefined || TTL == null) {
    localStorage.setItem("TTL",JSON.stringify(new Date()));
    isValidTTL = false;
  } else {
  let TTLDateObj = new Date(JSON.parse(TTL));
  let currentDateObj = new Date();
    isValidTTL = TTLDateObj.getFullYear() === currentDateObj.getFullYear() &&
    TTLDateObj.getDate() === currentDateObj.getDate() &&
    TTLDateObj.getMonth() === currentDateObj.getMonth();
    
  }
  return isValidTTL
}

const checkForCalDates = (monthIndex:number,year:number) => {
  if (typeof (Storage) !== "undefined") {
    let isValidTTL = checkForTTL()
    let calObjString = localStorage.getItem("calDates");
    if (calObjString && isValidTTL) {
      let calObj = JSON.parse(calObjString);
      let key = `${monthIndex}${year}`;
      if (calObj[key] !== undefined) {
        return calObj[key];
      } else {
        return null;
      }
    } else {
      return null
    }
  }
};

const setCalDetailToLocalStorage = (monthIndex:number, year:number, calDetails:Calbody[][]) => {
  if (typeof (Storage) !== "undefined") {
    let key = `${monthIndex}${year}`;
    let calObjString = localStorage.getItem("calDates");
    if (calObjString) {
      let calObj = JSON.parse(calObjString);
      calObj[key] = JSON.stringify(calDetails);
      localStorage.setItem("calDates",JSON.stringify(calObj))
    } else {
      let tempObj:any = {};
      tempObj[key] = JSON.stringify(calDetails);
      localStorage.setItem("calDates",JSON.stringify(tempObj));
    }
  }
};

export const getCalDatesObj = (
  totalNoOfDays: number,
  monthFirstDay: number,
  isCurrentMonth: boolean,
  currentDate: number,
  monthIndex: number,
  year: number
) => {

  let calDetails = checkForCalDates(monthIndex,year);

  if (calDetails !== null && calDetails !== undefined) {
    return JSON.parse(calDetails);
  }

  let dates = 1;
  let calBody = [];
  let tempRow = [];
  let weekcounter = 0;
  let i = 0;

  let preMonthDates = getPreviousMonthDates(monthIndex, year, monthFirstDay);

  let nextMonthIndex = monthIndex + 1 > 11 ? 0 : monthIndex + 1;
  let previousMonthIndex = monthIndex - 1 < 0 ? 0 : monthIndex - 1;

  while (dates <= totalNoOfDays) {
    if (weekcounter < 7) {
      weekcounter = weekcounter + 1;
    } else {
      weekcounter = 1;
    }

    if (i < monthFirstDay) {
      let tempObj = {} as Calbody;
      tempObj["label"] = preMonthDates[i];
      tempObj["key"] = `calDay_${i}`;
      tempObj["isTodayDate"] = previousMonthIndex === new Date().getMonth() && preMonthDates[i] === new Date().getDate();
      tempObj["isCurrentMontDate"] = false;
      tempObj["year"] = year;
      tempObj["eventKey"] = `${preMonthDates[i]}_${previousMonthIndex}_${year}`;
      tempObj["canAddEvent"] = false;
      tempObj["events"] = [];
      tempRow.push(tempObj);
      i++;
    } else {
      let tempObj = {} as Calbody;
      tempObj["label"] = dates;
      tempObj["key"] = `calDay_${i}`;
      tempObj["isTodayDate"] = isCurrentMonth && currentDate === dates;
      tempObj["isCurrentMontDate"] = true;
      tempObj["year"] = year;
      tempObj["eventKey"] = `${dates}_${monthIndex}_${year}`;
      tempObj["canAddEvent"] = true;
      tempObj["events"] = [];
      tempRow.push(tempObj);
      dates = dates + 1;
    }

    if (weekcounter === 7) {
      calBody.push(tempRow);
      tempRow = [];
    }
  }
  let nextMonthcount = 1;

  if (tempRow.length > 0) {
    
    for (let i = tempRow.length; i < 7; i++) {
      let tempObj = {} as Calbody;
      tempObj["label"] = nextMonthcount;
      tempObj["key"] = `calDay_${i}_${i}`;
      tempObj["isCurrentMontDate"] = false;
      tempObj["isTodayDate"] = nextMonthIndex === new Date().getMonth() && nextMonthcount === new Date().getDate();
      tempObj["year"] = year;
      tempObj["eventKey"] = `${nextMonthcount}_${monthIndex}_${year}`;
      tempObj["canAddEvent"] = false;
      tempObj["events"] = [];
      tempRow.push(tempObj);
      nextMonthcount = nextMonthcount + 1;
    }
    calBody.push(tempRow);
    tempRow = [];
  }

  if (calBody.length < 6) {
    for (let i=0; i<7;i++) {
      let tempObj = {} as Calbody;
      tempObj["label"] = nextMonthcount;
      tempObj["key"] = `calDay_${i}_${i}`;
      tempObj["isCurrentMontDate"] = false;
      tempObj["isTodayDate"] = nextMonthIndex === new Date().getMonth() && nextMonthcount === new Date().getDate();
      tempObj["year"] = year;
      tempObj["eventKey"] = `${nextMonthcount}_${monthIndex}_${year}`;
      tempObj["canAddEvent"] = false;
      tempObj["events"] = [];
      tempRow.push(tempObj);
      nextMonthcount = nextMonthcount + 1;
    }
    calBody.push(tempRow);
    tempRow = [];
  }
 
  setCalDetailToLocalStorage(monthIndex,year,calBody);
  return calBody;
};

export const monthNames: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const weekNames: string[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
