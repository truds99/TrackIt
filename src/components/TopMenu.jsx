import styled from "styled-components"
import textLogo from '../assets/textLogo.svg'
import UserContext from "../contexts/UserContext"
import { useContext } from "react"
import { Link } from "react-router-dom"

export default function TopMenu() {
    const { menuVisible, loginData, showLogout, setShowLogout } = useContext(UserContext);
 
    return (
        <TopMenuStyled $menuVisible={menuVisible} $showLogout={showLogout}>
            <img src={textLogo} />
            <img src={loginData.image} onClick={() => setShowLogout(!showLogout)} />
            <Link to='/'>
                <div onClick={() => localStorage.removeItem('user')}>Logout</div>
            </Link>
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
        cursor: pointer;
    }

    & a {
        position: fixed;
        right: calc(8% + 51px);
        top:26px;
        color: #126BA5;
        background-color: white;
        height:20px;
        display: flex;
        align-items: center;
        width: 65px;
        justify-content: center;
        display: ${props => props.$showLogout ? 'flex' : 'none' };
        font-size:12px;
        border-radius: 6px;
    }

   
`