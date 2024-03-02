import logo from '../assets/logo.svg'
import styled from 'styled-components'
import { useContext, useEffect, useState } from "react"
import UserContext from "../contexts/UserContext"
import { Link, useNavigate } from 'react-router-dom'
import { postLogin } from '../services/services'
import { ThreeDots } from 'react-loader-spinner'

export default function LoginPage() {
    const { formData, setFormData, setMenuVisible, setLoginData } = useContext(UserContext);
    const navigate = useNavigate();
    const [submitAvailable, setSubmitAvailable] = useState(true);

    useEffect(() => setMenuVisible(false), []);  

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setLoginData(JSON.parse(localStorage.getItem('user')));
            localStorage.getItem('page') ? 
                navigate(localStorage.getItem('page')) : navigate('/today');
        }
    }, [])

    const handleForm = (e) => {
        e.preventDefault();
        if (!submitAvailable) return;
        setSubmitAvailable(false);
        const promise = postLogin(formData);
        promise
            .then(res => {
                setLoginData(res.data);
                const dataString = JSON.stringify(res.data);
                localStorage.setItem('user', dataString);
                navigate('/today');
            })
            .catch(() => {
                alert("Login failed.");
                setSubmitAvailable(true);
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData, [name]: value,
        }))
    }


    return (
        <LoginPageStyled $submitAvailable={submitAvailable}>
            <img src={logo} />
            <form onSubmit={handleForm}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='email'
                    required
                />
                <br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='password'
                    required
                />
                <br />
                <button type="submit">Log-in</button>
                <ThreeDots color='white' height='45px' /> 
            </form>
            <Link to='/signup'>No account yet? Register now.</Link>
        </LoginPageStyled>
    )
}

const LoginPageStyled = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 8%;
    max-width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;

    & input {
        width: 303px;
        max-width: 100%;
        height: 45px;
        border-radius: 5px;
        border: 1px solid #D4D4D4;
        padding-left: 11px;
        margin-bottom: 5px;
        font-size: 20px;
        font-weight: 40px;
        color: ${props => props.$submitAvailable ? '#black' : '#afafafaf'};
        background-color: ${props => props.$submitAvailable ? '#ffffff' : '#f2f2f2'};
    }

    & input:focus {
        outline: none;
        background-color: ${props => props.$submitAvailable ? 'white' : '#d4d4d4'};
    }

    & img {
        margin-bottom: 33px;
    }

    & input::placeholder {
        font-weight: 400;
        color: #8f8f8f;
        font-size: 20px;
    }

    & form {
        max-width: 100%;
        position: relative;
    }

    & button {
        width: 303px;
        max-width: 100%;
        height: 45px;
        border-radius: 4.64px;
        border: none;
        color: white;
        background-color: #52B6FF;
        opacity: ${props => props.$submitAvailable ? '1' : '0.7'};
        font-size: 21px;
        font-weight: 400;
        text-align: center;
        cursor: ${props => props.$submitAvailable ? 'pointer' : 'initial'};
        margin-bottom: 25px;
    }

    & button:hover {
        filter: brightness(0.7);
    }

    & a{
        font-size: 14px;
        color: #52B6FF;
        text-decoration: underline;
    }

    & form div {
        position: absolute;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        max-width: 100%;
        display: ${props => props.$submitAvailable ? 'none' : 'inline'};
    }
`