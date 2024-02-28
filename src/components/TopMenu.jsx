import styled from "styled-components";
import textLogo from '../assets/textLogo.svg'
import UserContext from "../contexts/UserContext";
import { useContext } from "react";

export default function TopMenu() {
    const { menuVisible, loginData } = useContext(UserContext);
    
    return (
        <TopMenuStyled $menuVisible={menuVisible}>
            <img src={textLogo} />
            <img src={loginData.image} />
        </TopMenuStyled>
    )
}

const TopMenuStyled = styled.div`
    padding: 0 8%;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: #126BA5;
    display: ${props => props.$menuVisible ? 'flex' : 'none' };

    & img:nth-child(2) {
        width: 51px;
        height: 51px;
        border-radius: 50%;
        object-fit: cover;
    }
`