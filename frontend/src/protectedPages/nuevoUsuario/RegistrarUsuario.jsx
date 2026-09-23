import styles from "./registrarusuario.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 

const RegistrarUsuario = () => {
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        role: "",
        fechaNacimiento: "",
        password: ""
    })

    const {session} = useAuth();

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUsuario(prev => ({ ...prev, [name]: value }))
    }

    const resetForm = (event) => {
        event.preventDefault();
        setUsuario({
            nombre: "",
            apellido: "",
            correo: "",
            role: "",
            fechaNacimiento: "",
            password: ""
        })
    }

    const guardarUsuario = async (event) => {
        event.preventDefault();

        setError(false);
        setErrorMsg("");

        try {
            const response = await axios.post("http://localhost:5000/usuarios", { ...usuario, username: usuario.correo });
            navigate("/app/usuarios")
        } catch (error) {
            if (error.response) {

                setError(true);
                setErrorMsg(error.response.data.error);
            } else {
                setError(true);
                setErrorMsg("Error de conexión con el servidor");
            }
        }

    }

    if(session.user.role !== "admin"){
        return <Navigate to="/app/" />
    }


    return (
        <>
            <h3 className={styles.title}>Registrar Usuario</h3>

            <div className={styles.btnContainer}>
                <button onClick={() => navigate(-1)}>Atras</button>
            </div>

            <div className={styles.form}>
                <form onSubmit={guardarUsuario}>
                    <div className={styles.inputContainer}>
                        <input type="text" placeholder="Nombre" name="nombre" value={usuario.nombre} onChange={handleChange} required />
                        <input type="text" placeholder="Apellido" name="apellido" value={usuario.apellido} onChange={handleChange} required />
                    </div>
                    <div className={styles.inputContainer}>
                        <input type="email" placeholder="Correo/Usuario" name="correo" value={usuario.correo} onChange={handleChange} required />
                        <input type="password" placeholder="Contraseña" name="password" value={usuario.password} onChange={handleChange} required />
                    </div>
                    <div className={styles.inputContainer2}>
                        <select name="role" value={usuario.role} onChange={handleChange} required>
                            <option value="" selected disabled> Rol</option>
                            <option value="admin">Administrador</option>
                            <option value="gerente">Gerente</option>
                            <option value="analista">Analista</option>
                        </select>
                        <div className={styles.date}>
                            <label htmlFor="fechaNacimiento">Fecha Nacimiento:</label>
                            <input type="date" name="fechaNacimiento" placeholder="Fecha Nacimiento" value={usuario.fechaNacimiento} onChange={handleChange} required />
                        </div>

                    </div>
                    {error && <p className={styles.errorMsg}>{errorMsg}</p>}

                    <div className={styles.formBtns}>
                        <button className={styles.saveBtn} type="submit">Registrar Usuario</button>
                        <button className={styles.btnReset} onClick={resetForm}>Reiniciar Formulario</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default RegistrarUsuario;