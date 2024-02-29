import styled from "styled-components"
import dayjs from 'dayjs'
import { getTodayHabits } from "../../services/services"
import { useEffect, useContext} from "react"
import UserContext from "../../contexts/UserContext"
import TodayCard from "./TodayCard"

export default function TodayPage() {
    const nowDate = dayjs().format('dddd, DD/MM')
    const { loginData, todayData, setTodayData } = useContext(UserContext)
    
    
    

    return (
        <TodayPageStyled>
            <h1>{nowDate}</h1>
            <h3>Isso aqui vai ser uma variável</h3>
            <div>
                {todayData.map((elm, idx) => ( 
                    <TodayCard 
                        name={elm.name}
                        id={elm.id}
                        key={idx}
                        done={elm.done} 
                        record={elm.highestSequence}
                        current={elm.currentSequence}
                    />)
                )}
            </div>
        </TodayPageStyled>
    )
}

const TodayPageStyled = styled.div`
    display: flex;
    flex-direction: column;
    padding: 92px 8% 112px 8%;
    max-width: 100%;
    min-height: 100vh;
    justify-content: flex-start;
    align-items: center;
    background-color: #cfcfcf;
    height: min-content;

    & > h1 {
        width: 100%;
        max-width: 100%;    
    }

    & > h3 {
        width: 100%;
        max-width: 100%;
    }

    & > div {
        width: 100%;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 28px;
    }
`