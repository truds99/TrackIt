import styled from "styled-components"
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Bottom() {
    const { menuVisible, todayDone, todayData } = useContext(UserContext);

    return (
        <BottomStyled $menuVisible={menuVisible} $isAllDone={todayDone / todayData.length === 1}>
            <Link to='/habits'>Habits</Link>
            <Link to='/today'>
                <div>
                    <CircularProgressbar strokeWidth={10.2} value={todayDone / todayData.length * 100} />
                    Today
                </div>
            </Link>
            <Link to='/history'>History</Link>
        </BottomStyled>
    )
}

const BottomStyled = styled.div`
    padding: 0 8%;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: white;
    display: ${props => props.$menuVisible ? 'flex' : 'none' };
    overflow-y: visible;

    & a {
        font-size: 18px;
        font-weight: 400;
        color: #52B6FF;
        cursor: pointer;
    }

    & a:hover {
        filter: brightness(0.7);
    }

    & > a > div {
        background-color: #52B6FF;
        color: white;
        width: 91px;
        height: 91px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-bottom: 35px;
        position: relative;
        font-size: 16px;
    }

    & svg {
        position: absolute;
        height: 79px;
        width: 79px;
    }

    .CircularProgressbar-path {
        stroke: white !important;
    }

     .CircularProgressbar-trail {
        stroke: none;
    }
`