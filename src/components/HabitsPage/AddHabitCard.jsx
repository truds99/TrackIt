import styled from "styled-components"
import { useState, useContext } from "react"
import { ButtonWeekday } from "./HabitsPage"
import { postHabit } from "../../services/services"
import UserContext from "../../contexts/UserContext"

export default function AddHabitCard({ showAddCard, setShowAddCard, body, setBody }) {
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    const [submitAvailable, setSubmitAvailable] = useState(true)
    const { loginData } = useContext(UserContext)

    const handleSubmit = () => {
        if (!body.name) {
            alert("the input can't be empty")
            return
        }
        if (!body.days.length) {
            alert("select at least one day")
            return
        }
        const promise = postHabit(loginData.token, body);
        promise
            .then(() => console.log(body))
            .catch(() => alert("error sending habit"))
    }
    

    return (
        <AddHabitCardStyled $showAddCard={showAddCard}>
            <input type='text' placeholder='habit' value={body.name} onChange={e => setBody({...body, name: e.target.value})} />
            <div>
                {weekdays.map((elm, idx) => <ButtonWeekday 
                    letter={elm}
                    day={idx} 
                    key={idx} 
                    selected={false} 
                    isAdding={true} 
                    body={body}
                    setBody={setBody}
                />)}
            </div>
            <div>
                <h6 onClick={() => setShowAddCard(false)}>Cancel</h6>
                <button onClick={handleSubmit}>Save</button>
            </div>
        </AddHabitCardStyled>
    )
}

const AddHabitCardStyled = styled.div`
    width: 100%;
    max-width: 100%;
    padding: 13px 15px;
    display: ${props => props.$showAddCard ? 'flex' : 'none'};
    height: 180px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    background-color: white;
    border: none;
    margin-bottom: 10px;
    position: relative;

    & > div:nth-child(2) {
        display: flex;
        justify-content: flex-start;
        max-width: 100%;
        margin-bottom: 18px;
    }

    & input {
        font-size: 20px;
        min-height: 22px;
        font-weight: 400;
        color: #666666;
        max-width: 100%;
        width: 100%;
        height: 45px;
        border-radius: 5px;
        border: 1px solid #d4d4d4;
        padding-left: 11px;
    }

    & > div:nth-child(3) {
        display: flex;
        justify-content: flex-end;
        max-width: 100%;
        width: 100%;
        align-items: center;
        font-size: 16px;
    }

    h6 {
        color: #52B6FF;
        font-weight: 400;
        cursor: pointer;
    }

    & button {
        width: 84px !important;
        height: 35px !important;
        font-size: 16px !important;
        font-weight: 400 !important;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 !important;
        margin-left: 23px;
    }
`
