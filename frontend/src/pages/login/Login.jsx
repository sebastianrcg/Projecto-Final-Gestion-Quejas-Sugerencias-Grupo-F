import styles from "./login.module.css";
import { useState } from "react";
import logo from "../../assets/logo.png";
import axios from "axios";
import { Navigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";



const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [error, setError] = useState(false);

    const { session, setSession } = useAuth();

    const navigate = useNavigate();

    const handleUserChange = (event) => {
        const { value } = event.target;
        setUsername(value);
    }

    const handlePassChange = (event) => {
        const { value } = event.target;
        setPassword(value);
    }

    // agregar post cuando el backend este listo
    const handleSubmit = async (event) => {
        event.preventDefault();

        setError(false);
        setErrorMsg("");

        try {


            const response = await axios.post("http://localhost:5000/auth/login", { username, password });



            if (response.data.error) {
                setError(true)
                setErrorMsg(response.data.error)
            } else if (response.data.validated) {
                setSession({
                    user: response.data.user,
                    token: response.data.token
                })
                navigate("/app");
            } else {
                setError(true)
                setErrorMsg("Error iniciando sesion")
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(true);
                setErrorMsg(err.response.data.error);
            } else {
                setError(true);
                setErrorMsg("Error iniciando sesion, intente de nuevo.");
            }
        } finally {
            setUsername("");
            setPassword("");
        }
    }

    if (session) {
        return <Navigate to="/app" />
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.loginSection}>
                    <img src={logo} alt="Logo" />
                    <h3>Inicie sesión con su correo</h3>

                    <form onSubmit={handleSubmit}>
                        <input type="email" placeholder="Correo Electronico" value={username} onChange={handleUserChange} required />
                        <input type="password" placeholder="Contraseña" value={password} onChange={handlePassChange} required />
                        {error && <p className={styles.errorMsg}>{errorMsg}</p>}
                        <button type="submit">Iniciar Sesión</button>
                    </form>

                </div>
                <div className={styles.loginImage}></div>

            </div>
        </>
    )
}

export default Login;