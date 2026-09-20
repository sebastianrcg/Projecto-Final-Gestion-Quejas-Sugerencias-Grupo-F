import styles from "./quejas.module.css";
import { useState } from "react";

const Quejas = () => {

    return (
        <>
            <h2 className={styles.title}>Registrar una Queja</h2>
            <div className={styles.form}>
                <form >
                    <div className={styles.inputContainer}>
                        <input type="text" placeholder="Nombre" name="nombre" />
                        <input type="email" placeholder="Correo Electronico" name="email" />
                    </div>
                    <div className={styles.inputContainer}>
                        <input type="text" placeholder="Producto Afectado" name="producto"/>
                        <input type="text" placeholder="Lote / Codigo de Produccion" name="lote"/>
                    </div>
                    <div className={styles.inputContainer}>
                    <select name="tipoQueja">
                        <option value="" selected disabled> Tipo de Queja</option>

                    </select>

                    <input type="file" name="file" />
                    </div>

                    <div className={styles.commentBox}>

                    <textarea name="comentario" placeholder="Ingresa detalles e informacion de la reclamción.">
                    </textarea>
                    </div>
                    
                    <div className={styles.formBtns}>
                    <button className={styles.saveBtn}>Enviar Queja</button>
                    <button className={styles.btnReset}>Reiniciar Formulario</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Quejas;