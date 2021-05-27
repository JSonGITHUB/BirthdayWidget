let getCurrentTime = new Date();
const currentMonth = getCurrentTime.getMonth()+1;
export const currentYear = getCurrentTime.getFullYear();
const zeroPrefix = (number) => (number<10) ? `0${number}` : number;
export const month = zeroPrefix(currentMonth);
export const pastMonth = zeroPrefix(currentMonth-1);
export const nextMonth = zeroPrefix(currentMonth+1);
export const currentDate = getCurrentTime.getDate();
//const currentDate = 1;
const daysInMonth = (month) => new Date(currentYear, month, 0).getDate();
export const daysThisMonth = daysInMonth(currentMonth);
export const daysLastMonth = daysInMonth(currentMonth-1);
export const pastWindow = currentDate-14;
export const futureWindow = currentDate+15;

const isLastMonth = (pastWindow<1) ? true : false;
const isNextMonth = (futureWindow>daysThisMonth) ? true : false;
const startDayLastMonth = daysLastMonth+pastWindow;
const endDayNextMonth = futureWindow-daysThisMonth;

export const startDate = (isLastMonth) 
    ? `${pastMonth}.${zeroPrefix(startDayLastMonth)}` 
    : `${month}.${zeroPrefix(pastWindow)}`;
export const endDate = (isNextMonth) 
    ? `${nextMonth}.${zeroPrefix(endDayNextMonth)}` 
    : `${month}.${zeroPrefix(futureWindow)}`;

export const getDay = (user) => user.birthday.split('-')[2];
export const getMonth = (user) => user.birthday.split('-')[1];
export const birthday = (user) => `${getMonth(user)}-${getDay(user)}`;
const isFebruary28 = ('02-28' === `${month}-${currentDate}`) ? true : false;
const isLeapYear = () => {
    const year = currentYear;
    return (((0 === year % 4) && (0 !== year % 100)) || (0 === year % 400)) ? true : false;
}
export const leapYearException = (user) => ((birthday(user) === `02-29`) && !isLeapYear() && isFebruary28) ? true : false;
export const isBirthday = (user) => (birthday(user) === `${month}-${currentDate}`) ? true : false;
export const fourteenOrLess = (futureWindow > daysThisMonth) ? daysThisMonth+1 : futureWindow;
export const prior14DaysOrLess = (pastWindow < 1) ? 1 : pastWindow;