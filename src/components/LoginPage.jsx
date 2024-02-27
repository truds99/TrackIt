import logo from '../assets/logo.svg'
import styled from 'styled-components'
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Link } from 'react-router-dom'

export default function LoginPage() {
    const { formData, setFormData } = useContext(UserContext);

    console.log(formData);

    const handleForm = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    return (
        <LoginPageStyled>
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
    }

    & input:focus {
        outline: none;
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
    }

    & button {
        width: 303px;
        max-width: 100%;
        height: 45px;
        border-radius: 4.64px;
        border: none;
        color: white;
        background-color: #52B6FF;
        font-size: 21px;
        font-weight: 400;
        text-align: center;
        cursor: pointer;
        margin-bottom: 25px;
    }

    & a{
        font-size: 14px;
        color: #52B6FF;
        text-decoration: underline;
    }
`