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
           
        </HabitsPageStyled>
    )
}

const HabitsPageStyled = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 8%;
    max-width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #cfcfcf;
`