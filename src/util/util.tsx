interface Calbody {
  label: string | number,
  key: string
}

export const getModifiedDateObj = (month:number,year:number): Date => {
  const dateObj = new Date();
  dateObj.setMonth(month, 1);
  dateObj.setFullYear(year)
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

export const getCalDatesObj = (totalNoOfDays:number, monthFirstDay:number) => {

  let dates = 1;
  let calBody = [];
  let tempRow = []
  for (let i = 0; i < 7; i++) {
    if (i < monthFirstDay) {
      let tempObj = {} as Calbody;
      tempObj["label"] = "";
      tempObj["key"] = `calDay_${i}`;
      tempRow.push(tempObj);
      
    } else {
      let tempObj = {} as Calbody;
      tempObj["label"] = dates;
      tempObj["key"] = `calDay_${i}`;
      tempRow.push(tempObj);
      dates = dates + 1;
    }
  }
  calBody.push(tempRow);

  tempRow = [];

  let weekcounter = 0;
  for (let i = dates; i<= totalNoOfDays; i++) {
    if (dates <= totalNoOfDays) {
      if (weekcounter < 7) {
        weekcounter = weekcounter + 1;
      } else {
        weekcounter = 1;
      }

      let tempObj = {} as Calbody;
      tempObj["label"] = dates;
      tempObj["key"] = `calDay_${dates}`;
      tempRow.push(tempObj);;

      if (weekcounter === 7) {
        calBody.push(tempRow);
        tempRow = [];
      }
      dates = dates + 1;

    }
  }

  if (tempRow.length > 0) {
    for (let i = tempRow.length; i < 7; i++) {
      let tempObj = {} as Calbody;
      tempObj["label"] = "";
      tempObj["key"] = `calDay_${i}_${i}`;
      tempRow.push(tempObj);
    }
    calBody.push(tempRow);
        tempRow = [];
  }

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
