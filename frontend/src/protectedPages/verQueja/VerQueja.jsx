import styles from "./verqueja.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

const VerQueja = () => {
    const [queja, setQueja] = useState([]);

    const { id } = useParams();
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

    return (
        <>
            <h3 className={styles.title}>Detalle de la Queja #{queja.id}</h3>

            <div className={styles.btnContainer}>
                <button onClick={() => navigate(-1)}>Atras</button>
            </div>

            <div className={styles.container}>

                <div className={styles.header}>
                    <div>
                        <span className={styles.headerLabel}>
                            QUEJA
                        </span>

                        <h2>
                            #{queja.id} - {queja.titulo}
                        </h2>
                    </div>

                    <span
                        className={`${styles.estado} ${styles[queja.estado]}`}
                    >
                        {queja.estado}
                    </span>
                </div>

                <div className={styles.section}>

                    <h4>Información de la queja</h4>

                    <div className={styles.infoGrid}>

                        <div className={styles.infoItem}>
                            <span>Solicitante</span>
                            <strong>{queja.nombre}</strong>
                        </div>

                        <div className={styles.infoItem}>
                            <span>Correo electrónico</span>
                            <strong>{queja.correo}</strong>
                        </div>

                        <div className={styles.infoItem}>
                            <span>Tipo de queja</span>
                            <strong>{queja.tipoqueja}</strong>
                        </div>

                        <div className={styles.infoItem}>
                            <span>Fecha de creación</span>
                            <strong>{queja.fechacreacion}</strong>
                        </div>

                    </div>

                </div>


                {/* Información del producto */}
                <div className={styles.section}>

                    <h4>Información del producto</h4>

                    <div className={styles.infoGrid}>

                        <div className={styles.infoItem}>
                            <span>Producto afectado</span>
                            <strong>{queja.producto || "No especificado"}</strong>
                        </div>

                        <div className={styles.infoItem}>
                            <span>Lote / Código de producción</span>
                            <strong>{queja.lote || "No especificado"}</strong>
                        </div>

                        <div className={styles.infoItem}>
                            <span># Seguimiento</span>
                            <strong>{queja.tracking || "No especificado"}</strong>
                        </div>

                    </div>

                </div>


                {/* Comentario */}
                <div className={styles.section}>

                    <h4>Descripción de la queja</h4>

                    <div className={styles.comment}>
                        {queja.comentario || "Sin comentarios."}
                    </div>

                </div>


                {/* Foto */}
                {queja.foto && queja.foto.length > 0 && (

                    <div className={styles.section}>

                        <h4>Evidencia adjunta</h4>

                        <div className={styles.imageContainer}>
                            <img
                                src={queja.foto}
                                alt={`Evidencia de la queja ${queja.id}`}
                            />
                        </div>

                    </div>
                )}

            </div>

        </>
    )
}

export default VerQueja;