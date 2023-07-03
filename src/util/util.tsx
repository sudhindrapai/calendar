export const getModifiedDateObj = (month:number,year:number): Date => {
  const dateObj = new Date();
  let currentMonth = dateObj.getMonth();
//   currentMonth
// dateObj.setMonth(1, 1);
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
      totalDays = 31;
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
