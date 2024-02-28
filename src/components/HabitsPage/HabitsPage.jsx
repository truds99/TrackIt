import styled from "styled-components"
import UserContext from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { getHabits } from '../../services/services'
import HabitCard from './HabitCard'
import AddHabitCard from "./AddHabitCard";

export default function HabitsPage() {
    const { setMenuVisible, loginData } = useContext(UserContext);
    const [myHabits, setMyHabits] = useState('');
    const [shouldGetHabits, setShouldGetHabits] = useState(true);
    const [showAddCard, setShowAddCard] = useState(false);
    const [body, setBody] = useState(
        {
            name: '',
            days: []
        })

    useEffect (() => {
        setMenuVisible(true);
        setMyHabits([
            {
                id: 1,
                name: "Nome do hábito",
                days: [1, 3, 5]
            },
            {
                id: 2,
                name: "Nome do hábito 2",
                days: [1, 3, 4, 6]
            }
        ])
    }, [])

    /* useEffect (() => {
        if (shouldGetHabits) {
            const promise = getHabits(loginData.token);
            promise
                .then(res => {
                    setMyHabits(res.data);
                    setShouldGetHabits(false)
                })
                .catch(() => alert("error getting habits"))
        }
        else {
            alert("error getting habits");
        }
    }, [shouldGetHabits, loginData.token]) */

    return (
        <HabitsPageStyled $showText={!myHabits.length}>
            <div>
                <h1>My habits</h1>
                <button onClick={() => setShowAddCard(true)}>+</button>
            </div>
            <div>
                <AddHabitCard
                    showAddCard={showAddCard} 
                    setShowAddCard={setShowAddCard} 
                    body={body} setBody={setBody}
                />
                {myHabits && myHabits.map(elm => (
                    <HabitCard 
                        habitName={elm.name} 
                        key={elm.id} 
                        idHabit={elm.id} 
                        days={elm.days} 
                        setShouldGetHabits={setShouldGetHabits}
                />))}
            </div>
            <p>You don't have any habits registered yet. Add a habit to start tracking!</p>
        </HabitsPageStyled>
    )   
}

function ButtonWeekday({ letter, selected, isAdding, body, setBody, day }) {
    const [isSelected, setIsSelected] = useState(selected);

    function toggleSelect() {
        console.log(body);
        if (isAdding) {
            setIsSelected(!isSelected);
            if (!isSelected) {
                setBody({...body, days: [...body.days, day]})
            }
        }
    }

    return (
        <ButtonWeekdayStyled $color={isSelected} $isAdding={isAdding} onClick={toggleSelect} >{letter}</ButtonWeekdayStyled>
    )
}

const HabitsPageStyled = styled.div`
    display: flex;
    flex-direction: column;
    padding: 92px 8% 112px 8%;
    max-width: 100%;
    height: 100vh;
    justify-content: flex-start;
    align-items: center;
    background-color: #cfcfcf;
    
    & h1 {
        color: #126BA5;
        font-size: 23px;
        font-weight: 400;
        min-height: 26px;
        text-align: left;
    }

    &>div:nth-child(1) {
        width: 100%;
        max-width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

     &>div:nth-child(2) {
        width: 100%;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
    }

    & button {
        width: 40px;
        height: 35px;
        border-radius: 4.64px;
        background: #52B6FF;
        color: white;
        border: none;
        font-size: 27px;
        font-weight: 400;
        cursor: pointer;
        padding-bottom: 35px;
    }

    & p {
        font-size: 18px;
        font-weight: 400;
        color: #666666;
        text-align: left;
        width: 100%;
        margin-top: 30px;
        display: ${props => props.$showText ? 'initial' : 'none'};
    }
`

const ButtonWeekdayStyled = styled.div`
    width: 30px !important;
    height: 30px;
    margin-right: 4px;
    border-radius: 5px;
    border: 1px solid #d4d4d4;
    background-color: ${props => props.$color ? '#cfcfcf' : 'white'};
    color: ${props => props.$color ? 'white' : '#cfcfcf'};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${props => props.$isAdding ? 'pointer' : 'initial'};
`

export { ButtonWeekday };