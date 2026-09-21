import styles from "./login.module.css";
import { useState } from "react";
import logo from "../../assets/logo.png";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [error, setError] = useState(false);

    const handleUserChange = (event) => {
        const {value} = event.target;
        setUsername(value);
    }

    const handlePassChange = (event) => {
        const {value} = event.target;
        setPassword(value);
    }

    // agregar post cuando el backend este listo

    return(
        <>
            <div className={styles.container}>
                <div className={styles.loginSection}>
                    <img src={logo} alt="Logo" />
                    <h3>Inicie sesión con su correo</h3>

                    <form>
                        <input type="email" placeholder="Correo Electronico" value={username} onChange={handleUserChange} required/>
                        <input type="password" placeholder="Contraseña" value={password} onChange={handlePassChange} required/>
                        {error && <p className={styles.errorMsg}>{errorMsg}</p>}
                        <button>Iniciar Sesión</button>
                    </form>

                </div>
                <div className={styles.loginImage}></div>

            </div>
        </>
    )
}

export default Login;