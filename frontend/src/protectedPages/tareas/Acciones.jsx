import styles from "./acciones.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { useAuth } from "../../context/AuthContext";
import InvestigacionCard from "./InvestigacionCard";

const Acciones = () => {
    const [queja, setQueja] = useState([]);

    const [investigaciones, setInvestigaciones] = useState([])
    const [accionesCorrectivas, setAccionesCorrectivas] = useState([])

    const [showInvestigaciones, setShowInvestigaciones] = useState(false)
    const [showAcciones, setShowAcciones] = useState(false)

    const [investigacionEnviada, setInvestigacionEnviada] = useState(false);

    const { id } = useParams();
    const { session } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {

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

    }, [id])

    const cerrarInvestigation = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/investigaciones/cerrar/${id}`);
            setInvestigacionEnviada(true)

        } catch (error) {

        }
    }

    useEffect(()=> {

        setInvestigacionEnviada(false)
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
    }, [id, investigacionEnviada])
    return (
        <>
            <div className={styles.header}>
                <h3 className={styles.title}>Acciones</h3>
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
                    <p><b>Estado: </b>{queja.estado}</p>
                </div>

                <div className={styles.infoContainer}>
                    <p><b>Producto: </b>{queja.producto}</p>
                    <p><b>Lote: </b>{queja.lote}</p>
                    <p><b>Solicitud #: </b>{queja.tracking}</p>
                </div>
                <p><b>Comentario: </b>{queja.comentario}</p>

                {
                    (queja.foto && queja.foto.length >= 0) &&
                    <img src={queja.foto} alt={`Foto solicitud ${queja.id}`} />
                }

                <div className={styles.infoContainer}>

                </div>


            </div>

            <div className={styles.container}>
                <div className={styles.containerHeader}>
                    <h4 className={styles.sectionTitle}>Investigaciones</h4>
                    <button onClick={() => setShowInvestigaciones(!showInvestigaciones)} className={styles.verBtn}>Ver Investigaciones</button>
                </div>
                {showInvestigaciones &&
                    <div>

                        {(investigaciones.length === 0) ? <p>No hay investigaciones registradas</p> : investigaciones.map((investigacion, i) => {
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
                                    cerrarInvestigacion={cerrarInvestigation}
                                    id={investigacion.id}/>

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
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                    </div>
                }

            </div>

        </>
    )
}

export default Acciones;

