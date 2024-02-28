import styled from "styled-components"
import UserContext from "../../contexts/UserContext";
import { useContext, useEffect } from "react";

export default function HabitsPage() {
    const { setMenuVisible } = useContext(UserContext);

    useEffect (() => {
        setMenuVisible(true);
    }, [])

    return (
        <HabitsPageStyled>
            <div>
                <h1>My habits</h1>
                <button>+</button>
            </div>
            <p>You don't have any habits registered yet. Add a habit to start tracking!</p>
        </HabitsPageStyled>
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

    & div:nth-child(1) {
        width: 100%;
        max-width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
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
    }
`