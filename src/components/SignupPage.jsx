import logo from '../assets/logo.svg'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { postSignup } from '../services/services';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner'

export default function SignupPage() {
    const [submitAvailable, setSubmitAvailable] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
    })
    const navigate = useNavigate();
    
    const validInputs = () => {
        if(formData.password.length < 8) {
            alert("Password must have at least 8 characters");
            return false;
        }
        if (!/^(ftp|http|https):\/\/[^ "]+$/.test(formData.image) && !/^www\.[^ "]+$/.test(formData.image)) {
            alert("Picture must be a valid URL")
            return false;
        }
        return true;
    }

    const handleForm = (e) => {
        e.preventDefault();
        if (!submitAvailable) return;
        setSubmitAvailable(false);
        if (!validInputs()) return;
        const promise = postSignup(formData);
        promise
            .then(() => navigate('/'))
            .catch(() => {
                alert("Signup failed.");
                setSubmitAvailable(true);
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData, [name]: value,
        }));
    };

    return (
        <SignupPageStyled $submitAvailable={submitAvailable}>
            <img src={logo} />
            <form onSubmit={submitAvailable && handleForm}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='email'
                    required
                />
                <br />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='password'
                    required
                />
                <br />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='name'
                    required
                />
                <br />
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder='profile picture'
                    required
                />
                <br />
                <button type="submit">Sign-up</button>
                <ThreeDots color='white' height='45px' /> 
            </form>
            <Link to='/'>Already registered? Log-in.</Link>
        </SignupPageStyled>
    )
}

const SignupPageStyled = styled.div`
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
        font-size: 21px;
        font-weight: 400;
        text-align: center;
        cursor: ${props => props.$submitAvailable ? 'pointer' : 'initial'};
        margin-bottom: 25px;
        opacity: ${props => props.$submitAvailable ? '1' : '0.7'};
    }

    & a{
        font-size: 14px;
        color: #52B6FF;
        text-decoration: underline;
    }

    & form div {
        position: absolute;
        bottom: 25px;
        left: 50%;
        transform: translateX(-50%);
        max-width: 100%;
        display: ${props => props.$submitAvailable ? 'none' : 'inline'};
    }
`