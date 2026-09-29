import styles from "./tracking.module.css";
import { useState } from "react";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";

const Tracking = () => {
    const [tracking, setTracking] = useState("");

    const [showData, setShowData] = useState(false);
    const [data, setData] = useState({});

    const [showMessage, setShowMessage] = useState(false)


    const [showMessageBox, setShowMessageBox] = useState(false);


    const handleChange = (event) => {
        setTracking(event.target.value);
    }

    const chequearTracking = async (event) => {
        event.preventDefault()
        setShowMessageBox(false);
        setShowMessage(false);
        setShowData(false);
        setData([]);

        try {
            const response = await axios.get(`http://localhost:5000/quejas/tracking/${tracking}`);

            if (response.data.queja.length === 0) {
                setShowMessageBox(true);
                setShowMessage(true)

            } else {
                setShowMessageBox(true);
                setShowData(true)
                setData(response.data.queja[0])

            }

        } catch (error) {


        }

    }



    return (
        <>
            <h2 className={styles.title}>Seguimiento de solicitud</h2>
            <p className={styles.text}>Ingrese el codigo de seguimiento generado al registrar su solicitud. Revisar el correo de confirmación automatico al enviar su solicitud para el codigo de traqueo de solicitud.</p>

            <form onSubmit={chequearTracking}>
                <div className={styles.inputContainer}>
                    <input type="text" minLength="10" maxLength="20" placeholder="# tracking" value={tracking} onChange={handleChange} required />
                    <IoSearchOutline className={styles.inputSearch} size={"22px"} />
                </div>
                <button className={styles.enviarBtn} type="submit">Chequear Solicitud</button>
            </form>

            {
                showMessageBox &&
                <div className={styles.messageBoxFail}>
                    {
                        showMessage && 
                        <div className={styles.failMessage}>
                            <p>No existe una solicitud con ese codigo de seguimiento. Verifica el codigo o intenta con otro.</p>
                        </div>
                    }
                    {
                        showData && 
                        <div>
                            <p>La solicitud con el codigo de seguimiento <b>#: {data.tracking}</b>. Fue recibida en la fecha {data.fechacreacion.split("T")[0]} a las {data.fechacreacion.split("T")[1].split(".")[0]}. El estado actual de su solicitud es <b>{data.estado}</b>. Nuestro equipo esta trabajando con su solicitud y le enviaremos un correo con mas información de la resolución de su petición, lo mas pronto posible al correo: <b>{data.correo}</b> .</p>
                            <br/>
                            <p>Gracias, {data.nombre}, por preferirnos y tomar el tiempo de comunicar su inquietud.</p>
                            
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Tracking;