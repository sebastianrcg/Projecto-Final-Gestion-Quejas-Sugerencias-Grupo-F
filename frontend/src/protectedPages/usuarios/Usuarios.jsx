import styles from "./usuarios.module.css";
import { useEffect, useState } from "react";
import axios from "../../axiosConfig";

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(()=> {

        const getUsuarios = async () => {
            try{
                const response = await axios.get("http://localhost:5000/usuarios");

                if (response.data.usuarios){
                    setUsuarios(response.data.usuarios)
                }

            } catch (error) {
                console.log("Error obteniendo usuarios.")
            }
        }
        getUsuarios();
    }, [])

    return (
        <>
            <h3 className={styles.title}>Usuarios</h3>

            <table className={styles.table}>
                <thead>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Fecha Nacimiento</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </thead>
                <tbody>
                    {usuarios.map(usuario=> {
                        return(
                            <tr>
                                <td>{usuario.nombre} {usuario.apellido}</td>
                                <td>{usuario.correo}</td>
                                <td>{usuario.role}</td>
                                <td>{usuario.fechanacimiento.split("T")[0]}</td>
                                <td>{usuario.estado ? "Activo" : "Inactivo"}</td>
                                <td><div className={styles.acciones}><button>Ver</button> <button>Editar</button> <button>Borrar</button></div></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
        </>
    )
}

export default Usuarios;