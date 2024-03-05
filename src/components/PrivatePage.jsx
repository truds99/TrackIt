import { useNavigate } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import { useContext, useEffect } from "react"

export default function PrivatePage({ children }) {
    const navigate = useNavigate();
    const { loginData } = useContext(UserContext);

    useEffect (() => {
        if (!loginData.token && !localStorage.getItem('user')) {
            navigate('/');
        }
    }, [])

    return (
        <>
            {localStorage.getItem('user') ? children : ''}
        </>
    )
    
}