import styles from "./tareas.module.css";

import { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { useAuth } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

const Tareas = () => {
    const [pendientes, setPendientes] = useState([]);

    const {session} = useAuth();

    const navigate = useNavigate()

    useEffect(()=> {

        const getQuejasAsignadas = async (userId) => {
            try {

                const response = await axios.get(`http://localhost:5000/quejas/asignadas/${userId}`);
                setPendientes(response.data.quejas);

            } catch (error) {

            }
        }

        getQuejasAsignadas(session.user.id);

    }, [])

    return(
        <>
            <h3 className={styles.title}>Pendientes</h3>

            <table className={styles.table}>
                            <thead>
                                <th>ID</th>
                                <th>Solicitante</th>
                                <th>Tipo de Queja</th>
                                <th>Estado</th>
                                <th>Fecha Creacion</th>
                                <th>Acciones</th>
                            </thead>
                            <tbody>
                                {pendientes.map(queja => {
                                    return (
                                        <tr>
                                            <td>{queja.id}</td>
                                            <td>{queja.nombre}</td>
                                            <td>{queja.tipoqueja}</td>
                                            <td>{queja.estado}</td>
                                            <td>{queja.fechacreacion.split("T")[0]} - {queja.fechacreacion.split("T")[1].split(".")[0]}</td>
                                            <td><div className={styles.acciones}><button onClick={()=> navigate(`/app/tareas/acciones/${queja.id}`)} className={styles.btnTrabajar}>Trabajar</button><button className={styles.btnCerrar}>Cerrar</button></div></td> 
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
        </>
    )
}

export default Tareas;