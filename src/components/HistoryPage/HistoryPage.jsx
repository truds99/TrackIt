import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useEffect, useContext } from "react"
import UserContext from "../../contexts/UserContext"

export default function HistoryPage() {
    const navigate = useNavigate()
    const { loginData } = useContext(UserContext)

    useEffect(() => {
        if (!loginData.token) {
            navigate('/')
        }
    }, [])

    return (
        <HistoryPageStyled>
            <h1>History</h1>
            <p>Your history soon</p>
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
    }
`