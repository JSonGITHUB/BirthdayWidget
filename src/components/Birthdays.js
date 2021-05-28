import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Birthday from './Birthday.js';
import ShowMore from './ShowMore.js';
import getKey from './utils/KeyGenerator.js';
import {  
    month, 
    currentDate, 
    getMonth,
    getDay,
    endDate, 
    startDate,
    pastMonth,
    nextMonth,
    daysThisMonth,
    daysLastMonth,
    leapYearException,
    isBirthday,
    birthday,
    fourteenOrLess,
    prior14DaysOrLess
            
} from './utils/dateUtils.js';

const Birthdays = ({ display }) => {
    const myRef = useRef();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [list, setList] = useState([]);
    const [lists, setLists] = useState({
        list1: [],
        list2: []
    });
    const [page, setPage] = useState(1);

    useEffect(() => {
        const api = `https://birthday-api.anromsocial.com/api/birthdays?dateFrom=${startDate}&dateTo=${endDate}`;
        //console.log(`api: ${api}`)
        axios(api)
            .then((response) => {
                const appData = response.data;
                setData(appData);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    },[]);
    useEffect(() => {
        if (myRef.current) {
            myRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
        }
        if (data !== null) {
            const name = (user) => { 
                const names = user.name.split(' ')
                return ({
                    firstName: names[0],
                    lastName: names[1],
                });
            }
            const today = data.users.filter((user) => (isBirthday(user) || leapYearException(user)));
            const a_day = (day) => data.users.filter((user) => birthday(user) === `${month}-${day}`);
            const futureExtraDate = (15-(daysThisMonth-currentDate));
            const lastExtraDate = (daysLastMonth+(currentDate-15))
            const bDayBefore = (user, date) => (getDay(user) < date) ? true : false;
            const bDayOnOrAfter = (user, date) => (getDay(user) >= date) ? true : false;
            const bDayAfter = (user, date) => (getDay(user) > date) ? true : false;
            const bDayInMonth = (user) => (getMonth(user) === month) ? true : false;
            const bDayPrior14Days = (user) => (bDayBefore(user, currentDate) && bDayOnOrAfter(user, prior14DaysOrLess)) ? true : false;
            const past = data.users.filter((user) => (bDayInMonth(user) && bDayPrior14Days(user)));
            const lastMonthExtra = data.users.filter((user) => ((getMonth(user) === pastMonth) && bDayAfter(user, lastExtraDate)));
            const future = data.users.filter((user) => (bDayInMonth(user) && bDayAfter(user, currentDate) && bDayBefore(user, fourteenOrLess)));
            const futureMonthExtra = data.users.filter((user) => ((getMonth(user) === nextMonth) && bDayBefore(user, futureExtraDate)));
            const alphaSort = (array) => array.sort((a,b) => (name(a).firstName > name(b).firstName) ? 1 : -1);
            const daySort = (array) => array.sort((a,b) => (getDay(a) > getDay(b)) ? 1 : -1);
            const a_daySorted = (day) => alphaSort(a_day(day));
            const pastAlphaSort = alphaSort(past);
            const lastMonthExtraAlphaSort = alphaSort(lastMonthExtra);
            const futureMonthExtraAlphaSort = alphaSort(futureMonthExtra).reverse();
            
            const futureAlphaSort = alphaSort(future).reverse();
            const getBirthdayCard = (user, x) => <Birthday key={getKey('user')} user={user} x={x} />;
            const getHighestIndex = (array) => ((page*10) > array.length) ? array.length : (page*10);
            const getLowIndex = (array) => (getHighestIndex(array)-10)
            const includeUser = (x, array) => ((x >= getLowIndex(array)) && (x < getHighestIndex(array))) ? true : false;
            const getList = (array) => array.map((user, x, array) => includeUser(x, array) 
                ? getBirthdayCard(user, x) 
                : null);
            const list1Today = alphaSort(today).map((user, x, array) => (x<array.length/2) ? user : null);
            const list2Today = alphaSort(today).map((user, x, array) => (x>array.length/2) ? user : null);
            const listPast = daySort(pastAlphaSort).reverse();
            const listLastMonthExtra = daySort(lastMonthExtraAlphaSort).reverse();
            const listprior14Days = [
                ...listPast,
                ...listLastMonthExtra
            ];
            const listFutureMonthExtra = daySort(futureMonthExtraAlphaSort);
            const listFuture = daySort(futureAlphaSort);
            const listNext14Days = [
                ...listFuture,
                ...listFutureMonthExtra
            ];
            
            const usersInWindow1 = (window1) => window1.map((user, x, array) => ((x >= (getHighestIndex(array)-10)) && (x < (getHighestIndex(array)-5))) ? user : null);
            const usersInWindow2 = (window2) => window2.map((user, x, array) => (x >= (getHighestIndex(array)-5)) && (x < getHighestIndex(array)) ? user : null);
            
            const listDate = (day) => getList(a_daySorted(day));
            const list1Date = (day) => listDate.map((user, x) => (x<listDate.length/2) ? user : null);
            const list2Date = (day) => listDate.map((user, x) => (x>listDate.length/2) ? user : null);
            
            if (display === 'today') {
                setLists({
                    list1: getList(list1Today),
                    list2: getList(list2Today)
                });
                setList(today)
            } else if (display === 'past') {
                setLists({
                    list1: getList(usersInWindow1(listprior14Days)),
                    list2: getList(usersInWindow2(listprior14Days))
                });
                setList(listprior14Days)
            } else if (display === 'future') {
                setLists({
                    list1: getList(usersInWindow1(listNext14Days)),
                    list2: getList(usersInWindow2(listNext14Days))
                });
                setList(listNext14Days)
            } else {
                setLists({
                    list1: list1Date(17),
                    list2: list2Date(17)
                });
                setList(listDate)
            }
        }
    },[data, display, page]);
    useEffect(() => {
        setPage(1);
    },[display]);
    
    if (loading) return <div className='App-list'>Loading...</div>;
    if (error) return <div className='App-list'>Error!</div>;

    const emptyList = <div className='ml-50 mr-50'>Unfortunately there is no users with birthdays on these dates</div>;
    const showMore = () => ((page*10) < list.length) ? <ShowMore setPage={setPage} page={page}/> : null;
    
    return (
        <div className='App-list'>
            { 
                (lists.list1.length > 0) 
                    ? <div className='mb-50'>
                            <div ref={myRef}></div>
                            <div className='block max400'>
                                {lists.list1}
                            </div>
                            <div className='block max400'>
                                {lists.list2}
                            </div>
                            {showMore()}
                        </div>
                    : emptyList 
            }
        </div>
    );
}
export default Birthdays;