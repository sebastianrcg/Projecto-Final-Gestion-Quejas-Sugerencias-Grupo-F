import styles from "./tareas.module.css";

import { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { useAuth } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const Tareas = () => {
    const [pendientes, setPendientes] = useState([]);

    const [quejaCerrada, setQuejaCerrada] = useState(false);

    const { session } = useAuth();

    const navigate = useNavigate()

    useEffect(() => {

        setQuejaCerrada(false);

        const getQuejasAsignadas = async (userId) => {
            try {

                const response = await axios.get(`http://localhost:5000/quejas/asignadas/${userId}`);
                setPendientes(response.data.quejas);

            } catch (error) {

            }
        }

        getQuejasAsignadas(session.user.id);

    }, [quejaCerrada])

    const cerrarQueja = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/quejas/cierre/${id}`);

            if (response.data.confirmar) {

                Swal.fire({
                    text: "Solicitud sin tareas creadas, seguro que quieres cerrar la solicitud!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#43d630",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Cerrar Solicitud",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.put(`http://localhost:5000/quejas/cierreForzado/${id}`).then(result2 => {
                            setQuejaCerrada(true);
                            Swal.fire({
                                title: "Solicitud cerrada!",
                                text: "Pendiente de verificacion.",
                                icon: "warning"
                            })
                        })

                    }


                });

                // if (window.confirm("Solicitud sin tareas creadas, seguro que quieres cerrar la solicitud")) {
                //     const response2 = await axios.put(`http://localhost:5000/quejas/cierreForzado/${id}`);
                //     setQuejaCerrada(true);
                //     Swal.fire({
                //         title: "Solicitud cerrada!",
                //         text: "Pendiente de verificacion.",
                //         icon: "warning"
                //     })

                //     // window.alert("Queja cerrada, pendiente de verificación")
                // }
            } else if (!response.data.cierre) {
                Swal.fire({ text: "Tareas pendientes, completar antes de cerrar solicitud.", icon: "error" });
                // window.alert("Tareas pendientes, completar antes de cerrar solicitud");
            } else if (response.data.cierre) {
                setQuejaCerrada(true);
                Swal.fire({
                    title: "Solicitud cerrada!",
                    text: "Pendiente de verificacion.",
                    icon: "success"
                })
                // window.alert("Queja cerrada, pendiente de verificación");
            }
        } catch (error) {

        }
    }

    const trabajarQueja = async (id, estado) => {

        if (estado === "asignada") {
            try {
                const response = await axios.put(`http://localhost:5000/quejas/cambioEstado/${id}`)

            } catch (error) {

            }
        }

        navigate(`/app/tareas/acciones/${id}`)

    }

    return (
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
                                <td><div className={styles.acciones}><button onClick={() => trabajarQueja(queja.id, queja.estado)} className={styles.btnTrabajar} disabled={queja.estado === "verificacion"}>Trabajar</button><button className={styles.btnCerrar} onClick={() => cerrarQueja(queja.id)} disabled={queja.estado === "verificacion"}>Cerrar</button></div></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Tareas;