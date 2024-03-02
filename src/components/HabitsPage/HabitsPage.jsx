import styled from "styled-components"
import UserContext from "../../contexts/UserContext"
import { useContext, useEffect, useState } from "react"
import HabitCard from './HabitCard'
import AddHabitCard from "./AddHabitCard"
import { useNavigate } from "react-router-dom"

export default function HabitsPage() {
    const { setShouldGetHabits, myHabits, loginData, setMenuVisible } = useContext(UserContext);
    const [showAddCard, setShowAddCard] = useState(false);
    const navigate = useNavigate();
    const [body, setBody] = useState(
        {
            name: '',
            days: []
        });

    useEffect(() => setMenuVisible(true), []);  

    useEffect(() => {   
        if (!loginData.token) {
            navigate('/');
        }
    }, []);

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
                    setShouldGetHabits={setShouldGetHabits}
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

function ButtonWeekday({ letter, selected, isAdding, body, setBody, day, submitAvailable }) {
    const [isSelected, setIsSelected] = useState(selected);
    
    useEffect (() => {
        if (body) {
            if(!body.days.length) {
                setIsSelected(false);
            }
        }
    }, [body])

   const toggleSelect = () => {
        if (isAdding) {
            if (submitAvailable){
                setIsSelected(!isSelected)
                if (!isSelected) {
                    setBody({...body, days: [...body.days, day]});
                }
                else {
                    setBody({...body, days: body.days.filter(elm => elm !== day)});
                }
            }
        }
    }

    return (
        <ButtonWeekdayStyled 
            $color={isSelected} 
            $isAdding={isAdding} 
            $submitAvailable={submitAvailable} 
            onClick={toggleSelect}
        >
            {letter}
        </ButtonWeekdayStyled>
    )
}

const HabitsPageStyled = styled.div`
    display: flex;
    flex-direction: column;
    padding: 92px 8% 112px 8%;
    max-width: 100%;
    min-height: 100vh;
    justify-content: flex-start;
    align-items: center;
    background-color: #ebebeb;
    height: min-content;
    
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
        margin-top: 15px;
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

    & button:hover {
        filter: brightness(0.7);
    }

    & p {
        font-size: 18px;
        font-weight: 400;
        color: #666666;
        text-align: left;
        width: 100%;
        margin-top: 8px;
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
    cursor: ${props => props.$submitAvailable ? 'pointer' : 'initial'};

    &:hover {
        filter: ${props => props.$isAdding && props.$submitAvailable ? 'brightness(0.7)' : 'initial'};
    }
`

export { ButtonWeekday };