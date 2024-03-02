import styled from "styled-components"
import dayjs from 'dayjs'
import { useEffect, useContext} from "react"
import UserContext from "../../contexts/UserContext"
import TodayCard from "./TodayCard"
import { useNavigate } from 'react-router-dom'

export default function TodayPage() {
    const nowDate = dayjs().format('dddd, DD/MM');
    const { todayData, loginData, todayDone, setMenuVisible } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => setMenuVisible(true), []);
    
    useEffect(() => {
        if (!loginData.token) {
            navigate('/');
        }
    }, [])
   
    return (
        <TodayPageStyled $colorh3={todayDone > 0 && todayData.length}>
            <h1>{nowDate}</h1>
            {todayDone > 0 && todayData.length ?
                <h3>{Math.round(todayDone * 100 / todayData.length)}% completed</h3>:
                <h3>No habits completed yet</h3>
            }
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
    background-color: #ebebeb;
    height: min-content;

    & > h1 {
        width: 100%;
        max-width: 100%;    
    }

    & > h3 {
        width: 100%;
        max-width: 100%;
        font-weight: 400;
        font-size: 18px;
        color: ${props => props.$colorh3 ? '#8FC549' : '#BABABA'}
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