import styles from "./tracking.module.css";
import { useState } from "react";
import axios from "axios";

const Tracking = () => {
    const [tracking, setTracking] = useState("");

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);


    const handleChange = (event) => {
        setTracking(event.target.value);
    }



    return (
        <>
            <h2 className={styles.title}>Seguimiento de solicitud</h2>
            <p>Ingrese el codigo de seguimiento generado al registrar su solicitud. Revisar el correo de confirmación automatico al enviar su solicitud para el codigo de traqueo de solicitud.</p>

            <div>
                <input type="text" placeholder="# tracking" value={tracking} onChange={handleChange} />
            </div>
            <button>Chequear Solicitud</button>
        </>
    )
}

export default Tracking;