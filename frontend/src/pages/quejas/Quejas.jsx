import styles from "./quejas.module.css";
import { useState } from "react";

const Quejas = () => {

    return (
        <>
            <h2 className={styles.title}>Registrar una Queja</h2>
            <div className={styles.form}>
                <form >
                    <div>
                        <input type="text" placeholder="Nombre" />
                        <input type="email" placeholder="Correo Electronico" />
                    </div>
                    <div>
                        <input type="text" placeholder="Producto Afectado" />
                        <input type="text" placeholder="Lote / Codigo de Produccion" />
                    </div>
                    <div>
                    <select name="">
                        <option value="" selected disabled> Tipo de Queja</option>

                    </select>

                    <input type="file" />
                    </div>
                    <textarea name="">

                    </textarea>
                    <div>
                    <button>Enviar Queja</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Quejas;