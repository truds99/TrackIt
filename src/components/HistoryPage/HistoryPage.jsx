import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useEffect, useContext, useState } from "react"
import UserContext from "../../contexts/UserContext"
import Calendar from 'react-calendar'
import dayjs from "dayjs"


export default function HistoryPage() {
    const navigate = useNavigate();
    const { loginData, historyData } = useContext(UserContext);
    const [daysNotDone, setDaysNotDone] = useState([]);
    const [daysDone, setDaysDone] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date())

    useEffect(() => {
        if (!loginData.token) {
            navigate('/');
        }
    }, [])

    useEffect(() => {
        setDaysNotDone([...historyData.filter(elm => {
            const habitsNotDone = elm.habits.some(habit => !habit.done);
            return (elm.habits.length && habitsNotDone);
        }).map(elm => elm.day)])
    }, [historyData])

    useEffect(() => {
        setDaysDone([...historyData.filter(elm => {
            const habitsDone = elm.habits.every(habit => habit.done);
            return (elm.habits.length && habitsDone);
        }).map(elm => elm.day)])
    }, [historyData])

    const customTileClassName = ({ date }) => {
        const formattedDate = dayjs(date).format('DD/MM/YYYY');

        if (formattedDate === dayjs().format('DD/MM/YYYY')){
            return '';
        }
        if (daysNotDone.includes(formattedDate)) {
            return 'day-uncompleted';
        }
        else if (daysDone.includes(formattedDate)) {
            return 'day-completed';
        }

        return '';
    }

    const handleClickDay = (value) => {
        const pastDay = dayjs(value).format('DD/MM/YYYY');
        if (pastDay === dayjs().format('DD/MM/YYYY')) return;
        if (!(daysDone.includes(pastDay) || daysNotDone.includes(pastDay))) return;      
        navigate(`/history/${dayjs(value).format('DD-MM-YYYY')}`);
    }

    return (
        <HistoryPageStyled $historyData={historyData}>
            <h1>History</h1>
            <Calendar 
                onChange={setSelectedDate} 
                value={selectedDate} 
                tileClassName={customTileClassName}
                onClickDay={handleClickDay}
            />
            <div>
                <div>
                    <div></div>
                    <h5>Completed days</h5>
                </div>
                <div>
                    <div></div>
                    <h5>Uncompleted days</h5>
                </div>
            </div>
        </HistoryPageStyled>
    )
}

const HistoryPageStyled = styled.div`
    display: flex;
    flex-direction: column;
    padding: 92px 8% 112px 8%;
    max-width: 100%;
    min-height: 100vh;
    justify-content: flex-start;
    align-items: center;
    background-color: #ebebeb;
    height: min-content;

    & h1 {
        width: 100%;
        max-width: 100%;
        margin-bottom: 11px;
    }

    & h5 {
        font-weight: 400;
        font-size: 14px;
    }

    & > div:nth-child(3) {
        width: 100%;
        max-width: 100%;
        margin-top: 20px;
    }

    & > div:nth-child(3) > div {
        width: 100%;
        max-width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 11px;
    }

    & > div:nth-child(3) > div:nth-child(1) div {
        height:25px;
        width: 25px;
        border-radius: 50%;
        background-color: #09ff00;
        margin-right: 7px;
    }

    & > div:nth-child(3) > div:nth-child(2) div {
        height:25px;
        width: 25px;
        border-radius: 50%;
        background-color: #ff0000;
        margin-right: 7px;
    }

    .react-calendar__navigation__label {
        max-width: 100%;
    }

     .react-calendar {
        min-width: 100%;
    }

    .react-calendar__navigation {
        display: flex;
        height: 22px;
        margin-bottom: 0.4em;
    }

    [class*="neighboring"] {
        color: #929292;
        cursor: pointer;
    }

    [class*="--now"] {
        background-color: #f8e786;
        border-radius: 4px;
        border: 1px solid #7c7c7c;
    }

    [class*="--now"]:hover,  .day-uncompleted:hover, .day-completed:hover {
        border-radius: 4px;
        border: 1.6px solid #7c7c7c;
        filter: brightness(0.82);
    }

    [class*="--now"]:active,  .day-uncompleted:active, .day-completed:active {
        filter: brightness(0.52);
    }

    .day-uncompleted {
        background-color: #ff0000;
        border-radius: 4px;
        border: 1px solid #7c7c7c;
        cursor: pointer;
    }

     .day-completed {
        background-color: #09ff00;
        border-radius: 4px;
        border: 1px solid #7c7c7c;
        cursor: pointer;
    }

    [class*="navigation"] {
        cursor: pointer;
    }

    [class*="prev2"], [class*="next2"] {
        display: none;
    }

    [class*="prev-button"], [class*="next-button"] {
        min-width: 27px;
    }
`