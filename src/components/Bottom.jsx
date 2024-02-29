import styled from "styled-components"
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { Link } from 'react-router-dom'

export default function Bottom() {
    const { menuVisible } = useContext(UserContext);

    return (
        <BottomStyled $menuVisible={menuVisible} >
            <Link to='/habits'>Habits</Link>
            <Link to='/habits'>
                <div>
                    Today
                </div>
            </Link>
            <Link to='/habits'>History</Link>
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
       /* position: fixed;
        left: calc(50vw - 45.5px);
        bottom: 10px; */
        cursor: pointer;
        z-index: 3;
        margin-bottom: 35px;
    }

`