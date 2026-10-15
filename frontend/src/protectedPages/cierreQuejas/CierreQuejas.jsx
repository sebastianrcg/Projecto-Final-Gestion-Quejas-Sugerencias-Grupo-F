import styles from "./cierrequejas.module.css";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import axios from "../../axiosConfig";

const CierreQuejas = () => {

    const [quejas, setQuejas] = useState([]);

    const {session} = useAuth();

    if (session.user.role === "analista"){
       return <Navigate to="/app"/> 
    }

    useEffect(()=> {

        const getQuejasPorCerrar = async ()=> {
            try {
                const response = await axios.get("http://localhost:5000/quejas/porconfirmar");
                setQuejas(response.data.quejas);
            } catch (error) {

            }

        }

        getQuejasPorCerrar();

    }, [])
    
    return (
        <>
            <h3 className={styles.title}>Cierre de Solicitudes</h3>

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
                                {quejas.map(queja => {
                                    return (
                                        <tr>
                                            <td>{queja.id}</td>
                                            <td>{queja.nombre}</td>
                                            <td>{queja.tipoqueja}</td>
                                            <td>{queja.estado}</td>
                                            <td>{queja.fechacreacion.split("T")[0]} - {queja.fechacreacion.split("T")[1].split(".")[0]}</td>
                                            <td><div className={styles.acciones}><button className={styles.btnVer} >Ver</button><button className={styles.btnCerrar}>Confirmar Cierre</button></div></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
            
        </> 
    )
}

export default CierreQuejas;