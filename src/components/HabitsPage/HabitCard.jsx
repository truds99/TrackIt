import styled from "styled-components"
import { deleteRequest } from "../../services/services"
import { useContext } from "react"
import UserContext from "../../contexts/UserContext"
import { ButtonWeekday } from "./HabitsPage"


export default function HabitCard({ habitName, days, idHabit, setShouldGetHabits }) {
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const { loginData } = useContext(UserContext);

    const deleteHabit = () => {
        if (confirm("Do you want to delete this habit?")) {
            const promise = deleteRequest(loginData.token, idHabit);
            promise
                .then(() => setShouldGetHabits(true))
                .catch(() => alert("error deleting habit"))
        }
    }
    
    return (
        <HabitCardStyled>
            <h2>{habitName}</h2>
            <div>
                {weekdays.map((elm, idx) => <ButtonWeekday
                    letter={elm}
                    key={idx}
                    selected={days.includes(idx)}
                    isAdding={false}
                    submitAvailable={false}
                />)}
            </div>
            <ion-icon onClick={deleteHabit} name="trash-outline"></ion-icon>
        </HabitCardStyled>
    )
}

const HabitCardStyled = styled.div`
    width: 100%;
    max-width: 100%;
    padding: 13px 15px;
    display: flex;
    height: 91px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    background-color: white;
    border: none;
    margin-bottom: 10px;
    position: relative;
    height: min-content;
    border-radius: 5px;

    & h2 {
        font-size: 20px;
        min-height: 22px;
        font-weight: 400;
        color: #666666;
        max-width: 100%;
        margin-bottom: 10px;
        padding-right: 7px;
    }

    &>div {
        display: flex;
        justify-content: flex-start;
        max-width: 100%;
    }

    & ion-icon {
        position: absolute;
        height: 20px;
        width: 16px;
        color: #666666;
        right: 10px;
        top: 11px;
        cursor: pointer;
    }
`