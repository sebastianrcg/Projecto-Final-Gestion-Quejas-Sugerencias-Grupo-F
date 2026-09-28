import styles from "./quejasregistradas.module.css";
import { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

const QuejasRegistradas = () => {

    const [quejas, setQuejas] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        const getQuejas = async () => {
            try {
                const response = await axios.get("http://localhost:5000/quejas");

                if (response.data.quejas) {
                    setQuejas(response.data.quejas)
                }

            } catch (error) {

            }
        }

        getQuejas();

    }, [])

    return (
        <>
            <h3 className={styles.title}>Quejas</h3>

            <table className={styles.table}>
                <thead>
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
                                <td>{queja.nombre}</td>
                                <td>{queja.tipoqueja}</td>
                                <td>{queja.estado}</td>
                                <td>{queja.fechacreacion.split("T")[0]} - {queja.fechacreacion.split("T")[1].split(".")[0]}</td>
                                <td><div className={styles.acciones}><button onClick={()=> navigate(`/app/quejas/${queja.id}`)}>Ver</button> <button>Asignar</button></div></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default QuejasRegistradas;