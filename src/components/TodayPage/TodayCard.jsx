import styled from "styled-components"
import checkIcon from '../../assets/check.svg'
import UserContext from '../../contexts/UserContext'
import { useContext, useState } from "react"
import { postCheck, postUncheck } from "../../services/services"

export default function TodayCard({name, current, record, done, id}) {
    const { loginData, todayData, setTodayData } = useContext(UserContext)
    const [isDone, setIsDone] = useState(done)
    const [dynamicCurrent, setDynamicCurrent] = useState(current)
    const [dynamicRecord, setDynamicRecord] = useState(record)

    function toggleDone () {
        if (isDone) {
            const promise = postUncheck(loginData.token, id)
            promise
                .then(() => {
                    setIsDone(false)
                    setDynamicCurrent(dynamicCurrent - 1)
                    if (dynamicCurrent === dynamicRecord) setDynamicRecord(dynamicRecord - 1)
                })
                .catch(() => alert("error unchecking habit"))
        }
        else {
            const promise = postCheck(loginData.token, id)
            promise
                .then(() => {
                    setIsDone(true)
                    setDynamicCurrent(dynamicCurrent + 1)
                    if (dynamicCurrent === dynamicRecord) setDynamicRecord(dynamicRecord + 1);
                })
                .catch(() => alert("error checking habit"))
        }
    }

    return (
        <TodayCardStyled $colorBG={isDone} $isRecord={dynamicCurrent >= dynamicRecord}>
            <div>
                <h2>{name}</h2>
                <div>
                    <h3>Current streak: <span>{dynamicCurrent} day{dynamicCurrent > 1 ? 's' : ''}</span></h3>
                    <h3>Highest streak: <span>{dynamicRecord} day{dynamicRecord > 1 ? 's' : ''}</span></h3>
                </div>
            </div>
            <div onClick={toggleDone}>
                <img src={checkIcon} />
            </div>  
        </TodayCardStyled>
    )
}

const TodayCardStyled = styled.div`
    width: 100%;
    max-width: 100%;
    padding: 13px 15px;
    display: flex;
    height: 91px;
    justify-content: space-between;
    background-color: white;
    border: none;
    margin-bottom: 10px;
    position: relative;
    height: min-content;
    border-radius: 5px;

    & > div h3:nth-child(1) > span {
        color: ${props => props.$colorBG ? '#8FC549' : '#666666'};
    }

     & > div h3:nth-child(2) > span {
        color: ${props => props.$isRecord && props.$colorBG ? '#8FC549' : '#666666'};
    }

    & h2 {
        font-size: 20px;
        min-height: 22px;
        font-weight: 400;
        color: #666666;
        max-width: 100%;
        margin-bottom: 7px;
        padding-right: 70px;
    } 

    & h3 {
        font-size: 13px;
        font-weight: 400;
        color: #666666;
    }

    &>div:nth-child(2) {
        width: 69px;
        height: 69px;
        border-radius: 5px;
        border: 1px solid #E7E7E7;
        background: ${props => props.$colorBG ? '#8FC549' : '#ebebeb'};
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`