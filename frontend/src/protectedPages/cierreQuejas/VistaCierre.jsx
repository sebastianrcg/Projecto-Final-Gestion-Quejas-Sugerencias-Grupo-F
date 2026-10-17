import styles from "./vistacierre.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { useAuth } from "../../context/AuthContext";
import InvestigacionCard from "../tareas/InvestigacionCard";
import AccionesCorrectivasCard from "../tareas/AccionesCorrectivasCard";
import Swal from "sweetalert2";

const VistaCierre = () => {
    const [queja, setQueja] = useState([]);

    const [investigaciones, setInvestigaciones] = useState([])
    const [accionesCorrectivas, setAccionesCorrectivas] = useState([])

    const [showInvestigaciones, setShowInvestigaciones] = useState(false)
    const [showAcciones, setShowAcciones] = useState(false)

    const [showImg, setShowImg] = useState(false);

    const [quejaCerrada, setQuejaCerrada] = useState(false);


    const { id } = useParams();
    const { session } = useAuth();

    const navigate = useNavigate();

    useEffect(()=> {

        setQuejaCerrada(false);
        const getQueja = async (id) => {
            try {
                const response = await axios.get(`http://localhost:5000/quejas/${id}`);

                if (response.data.queja) {
                    setQueja(response.data.queja[0]);
                }
            } catch (error) {

            }
        }

        getQueja(id);
    }, [id, quejaCerrada])


    useEffect(() => {

        

        const getAccionesCorrectivas = async (quejaId, usuarioId) => {
            try {
                const response = await axios.get(`http://localhost:5000/accionesCorrectivas/queja?quejaid=${quejaId}&usuarioid=${usuarioId}`);

                if (response.data.accionesCorrectivas) {
                    setAccionesCorrectivas(response.data.accionesCorrectivas)
                }
            } catch (error) {

            }
        }

        const getInvestigaciones = async (quejaId, usuarioId) => {
            try {
                const response = await axios.get(`http://localhost:5000/investigaciones/queja?quejaid=${quejaId}&usuarioid=${usuarioId}`);

                if (response.data.investigaciones) {
                    setInvestigaciones(response.data.investigaciones)
                }
            } catch (error) {

            }
        }
        
        
        getInvestigaciones(id, session.user.id)
        getAccionesCorrectivas(id, session.user.id)


    }, [id])

    const cerrarQueja = async (quejaId, usuarioId) =>{
        try {

            Swal.fire({
                    text: "Seguro que desea cerrar la soliccitud?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#43d630",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Cerrar Solicitud",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.put(`http://localhost:5000/quejas/confirmarCierre/${quejaId}`, {usuario_cierre: usuarioId}).then(result2 => {
                            
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
    }


    return (
        <>
            <div className={styles.header}>
                <h3 className={styles.title}>Confirmar Cierre</h3>
                <div className={styles.btnContainer}>
                    <button onClick={() => navigate(-1)}>Atras</button>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.infoContainer}>
                    <p ><b>Titulo: </b>{queja.titulo}</p>
                    <p><b>Tipo Queja: </b>{queja.tipoqueja}</p>
                    <p><b>Nombre: </b>{queja.nombre}</p>

                </div>

                <div className={styles.infoContainer}>
                    <p><b>Correo: </b>{queja.correo}</p>
                    <p><b>Fecha Creacion: </b>{queja.fechacreacion}</p>
                    {/* <p><b>Fecha Creacion: </b>{queja.fechacreacion.split("T")[0]} - {queja.fechacreacion.split("T")[1].split(".")[0]}</p> */}
                    <p><b>Estado: </b>{queja.estado}</p>
                </div>

                <div className={styles.infoContainer}>
                    <p><b>Producto: </b>{queja.producto}</p>
                    <p><b>Lote: </b>{queja.lote}</p>
                    <p><b>Solicitud #: </b>{queja.tracking}</p>
                </div>
                <p><b>Comentario: </b>{queja.comentario}</p>
                <button disabled={!queja.foto} onClick={() => setShowImg(!showImg)} className={styles.verImg}>{showImg ? "Ocultar Imagen" : "Ver Imagen"}</button>

                {showImg &&
                    <div>
                        {
                            (queja.foto && queja.foto.length >= 0) ?
                                <img src={queja.foto} alt={`Foto solicitud ${queja.id}`} /> : <p>No hay imagenes</p>
                        }
                    </div>
                }

                <div className={styles.inputBtns}>
                    <button disabled={queja.estado === "cerrada"} className={styles.cerrarBtn} onClick={()=> cerrarQueja(id, session.user.id)}>Cerrar Solicitud</button>
                    
                </div>


            </div>

            <div className={styles.container}>
                <div className={styles.containerHeader}>
                    <h4 className={styles.sectionTitle}>Investigaciones</h4>
                    <button onClick={() => setShowInvestigaciones(!showInvestigaciones)} className={styles.verBtn}>Ver Investigaciones</button>
                </div>
                {showInvestigaciones &&
                    <div>

                        {(investigaciones.length === 0) ? <p>No hay investigaciones registradas.</p> : investigaciones.map((investigacion, i) => {
                            return (
                                <InvestigacionCard
                                    key={investigacion.id}
                                    numero={i + 1}
                                    tipo={investigacion.tipo}
                                    estado={investigacion.estado}
                                    fecha_inicio={investigacion.fecha_inicio}
                                    fecha_fin={investigacion.fecha_fin}
                                    descripcion={investigacion.descripcion}
                                    archivos={investigacion.archivos}
                                    id={investigacion.id} />

                            )
                        })}

                    </div>
                }
            </div>
            <div className={styles.container}>
                <div className={styles.containerHeader}>
                    <h4 className={styles.sectionTitle}>Acciones Correctivas</h4>
                    <button onClick={() => setShowAcciones(!showAcciones)} className={styles.verBtn}>Ver Acciones</button>
                </div>

                {showAcciones &&
                    <div>

                        {(accionesCorrectivas.length === 0) ? <p>No hay acciones registradas.</p> : accionesCorrectivas.map((accionCorrectiva, i) => {
                            return (
                                <AccionesCorrectivasCard
                                    key={accionCorrectiva.id}
                                    numero={i + 1}
                                    estado={accionCorrectiva.estado}
                                    fecha_inicio={accionCorrectiva.fecha_inicio}
                                    fecha_fin={accionCorrectiva.fecha_fin}
                                    descripcion={accionCorrectiva.descripcion}
                                    resultado={accionCorrectiva.resultado}
                                    archivos={accionCorrectiva.archivos}
                                    id={accionCorrectiva.id} />

                            )
                        })}

                    </div>
                }

            </div>

        </>
    )
}

export default VistaCierre;