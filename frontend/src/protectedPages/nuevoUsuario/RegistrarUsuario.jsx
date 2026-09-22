import styles from "./registrarusuario.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrarUsuario = () => {
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido:"",
        correo: "",
        role: "",
        fechaNacimiento: "",
        password: ""
    })

    const navigate = useNavigate();

    const handleChange = (event)=> {
        const {name, value} = event.target;
        setUsuario(prev => ({...prev, [name]: value}))
    }

    const resetForm = (event)=> {
        event.preventDefault();
        setUsuario({
        nombre: "",
        apellido:"",
        correo: "",
        role: "",
        fechaNacimiento: "",
        password: ""
    })
    }
    return (
        <>
            <h3 className={styles.title}>Registrar Usuario</h3>
            
            <div className={styles.btnContainer}>
                <button onClick={()=> navigate(-1)}>Atras</button>
            </div>

            <div className={styles.form}>
                <form >
                    <div className={styles.inputContainer}>
                        <input type="text" placeholder="Nombre" name="nombre" value={usuario.nombre} onChange={handleChange} required/>
                        <input type="text" placeholder="Apellido" name="apellido" value={usuario.apellido} onChange={handleChange} required/>
                    </div>
                    <div className={styles.inputContainer}>
                        <input type="email" placeholder="Correo/Usuario" name="correo" value={usuario.correo} onChange={handleChange} required/>
                        <input type="password" placeholder="Contraseña" name="password" value={usuario.password} onChange={handleChange} required/>
                    </div>
                    <div className={styles.inputContainer}>
                        <select name="role" value={usuario.role} onChange={handleChange} required>
                            <option value="" selected disabled> Rol</option>
                                <option value="admin">Administrador</option>
                                <option value="gerente">Gerente</option>
                                <option value="analista">Analista</option>
                        </select>
                        <div className={styles.date}>
                        <label htmlFor="fechaNacimiento">Fecha Nacimiento:</label>
                        <input type="date" name="fechaNacimiento" placeholder="Fecha Nacimiento" value={usuario.fechaNacimiento} onChange={handleChange} required/>
                        </div>
                        
                    </div>


                    <div className={styles.formBtns}>
                        <button className={styles.saveBtn}>Registrar Usuario</button>
                        <button className={styles.btnReset} onClick={resetForm}>Reiniciar Formulario</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default RegistrarUsuario;