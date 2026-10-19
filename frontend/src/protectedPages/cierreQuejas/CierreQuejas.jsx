import styles from "./cierrequejas.module.css";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import axios from "../../axiosConfig";
import Swal from "sweetalert2";

const CierreQuejas = () => {

    const [quejas, setQuejas] = useState([]);

    const [quejaCerrada, setQuejaCerrada] = useState(false);

    const { session } = useAuth();

    const navigate = useNavigate();

    if (session.user.role === "analista") {
        return <Navigate to="/app" />
    }

    

    const cerrarQueja = async (quejaId, usuarioId) => {
        try {

            Swal.fire({
                text: "Seguro que desea cerrar la solicitud?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#43d630",
                cancelButtonColor: "#d33",
                confirmButtonText: "Cerrar Solicitud",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.put(`http://localhost:5000/quejas/confirmarCierre/${quejaId}`, { usuario_cierre: usuarioId }).then(result2 => {

                        Swal.fire({
                            title: "Solicitud cerrada!",
                            text: "Solicitud verificada y cerrada exitosamente",
                            icon: "success"
                        })
                        setQuejaCerrada(true);
                    })

                }


            })

        } catch (error) {

        }
    };

    const reabrirQueja = async (quejaId)=> {
        try {
            const response = await axios.put(`http://localhost:5000/quejas/reabrir/${quejaId}`);
            setQuejaCerrada(true);

        } catch (error) {


        }
    }


    useEffect(() => {

        setQuejaCerrada(false)

        const getQuejasPorCerrar = async () => {
            try {
                const response = await axios.get("http://localhost:5000/quejas/porconfirmar");
                setQuejas(response.data.quejas);
            } catch (error) {

            }

        }

        getQuejasPorCerrar();

    }, [quejaCerrada]);

    return (
        <>
            <h3 className={styles.title}>Cierre de Solicitudes</h3>

            <div className={styles.tableContainer}>
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
                                    <td><span className={`${styles.estado} ${styles[queja.estado]}`}>{queja.estado}</span></td>
                                    <td>{queja.fechacreacion.split("T")[0]} - {queja.fechacreacion.split("T")[1].split(".")[0]}</td>
                                    <td><div className={styles.acciones}><button className={styles.btnVer} onClick={() => navigate(`/app/cierreQuejas/queja/${queja.id}`)}>Ver</button>
                                    <button className={styles.btnAsignar} onClick={()=> reabrirQueja(queja.id)}>Reabrir</button>
                                    <button disabled={queja.estado === "cerrada"} className={styles.btnCerrar} onClick={() => cerrarQueja(queja.id, session.user.id)}>Confirmar Cierre</button></div></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default CierreQuejas;