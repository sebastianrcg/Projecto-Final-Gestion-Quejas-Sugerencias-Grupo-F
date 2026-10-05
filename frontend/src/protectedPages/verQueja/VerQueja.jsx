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
            <h3 className={styles.title}>Queja - #{queja.id}</h3>

            <div className={styles.btnContainer}>
                <button onClick={() => navigate(-1)}>Atras</button>
            </div>

            <div className={styles.container}>
            <p><b>id: </b>{queja.id}</p>
            <p ><b>Titulo: </b>{queja.titulo}</p>
            <p><b>Tipo Queja: </b>{queja.tipoqueja}</p>
            <p><b>Nombre: </b>{queja.nombre}</p>
            <p><b>Correo: </b>{queja.correo}</p>
            <p><b>Fecha Creacion: </b>{queja.fechacreacion}</p>
            <p><b>Estado: </b>{queja.estado}</p>
            <p><b>Producto: </b>{queja.producto}</p>
            <p><b>Lote: </b>{queja.lote}</p>
            <p><b>Tracking: </b>{queja.tracking}</p>
            <p><b>Comentario: </b>{queja.comentario}</p>
            {
                (queja.foto && queja.foto.length >= 0) &&
            <img src={queja.foto} alt={`Foto solicitud ${queja.id}`} />
            }
            </div>
        </>
    )
}

export default VerQueja;