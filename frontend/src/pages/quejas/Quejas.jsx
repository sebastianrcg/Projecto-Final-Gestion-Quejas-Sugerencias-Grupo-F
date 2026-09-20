import styles from "./quejas.module.css";
import { useState } from "react";

const Quejas = () => {
    const [queja, setQueja] = useState({
        nombre: "",
        correo: "",
        producto: "",
        lote: "",
        tipoQueja: "",
        file: "",
        comentario: ""
    })

    const handleChange = (event)=> {
        const {name, value} = event.target;
        setQueja(prev => ({...prev, [name]: value}))
    }
    // Hacer handle change para el archivo de imagen y arreglar el resetForm para el archivo, archivos funcionan diferente
    const resetForm = (event)=> {
        event.preventDefault();
        setQueja({
        nombre: "",
        correo: "",
        producto: "",
        lote: "",
        tipoQueja: "",
        file: "",
        comentario: ""
    })
    }

    return (
        <>
            <h2 className={styles.title}>Registrar una Queja</h2>
            <div className={styles.form}>
                <form >
                    <div className={styles.inputContainer}>
                        <input type="text" placeholder="Nombre" name="nombre" value={queja.nombre} onChange={handleChange}/>
                        <input type="email" placeholder="Correo Electronico" name="correo" value={queja.correo} onChange={handleChange}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <input type="text" placeholder="Producto Afectado" name="producto" value={queja.producto} onChange={handleChange} />
                        <input type="text" placeholder="Lote / Codigo de Produccion" name="lote" value={queja.lote} onChange={handleChange}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <select name="tipoQueja" value={queja.tipoQueja} onChange={handleChange}>
                            <option value="" selected disabled> Tipo de Queja</option>
                            <optgroup label="Defectos de Producto">
                                <option value="empaque_defectuoso">Empaque defectuoso o mal sellado</option>
                                <option value="mal_olor_sabor">Producto con mal olor o sabor</option>
                                <option value="producto_contaminado">Producto contaminado</option>
                                <option value="vencido_fechaIlegible">Producto Vencido o fecha ilegible</option>
                                <option value="error_etiqueta">Error en etiquetado o información</option>
                                <option value="variacion_peso">Variacion en peso o volumen declarado</option>
                            </optgroup>

                            <optgroup label="Problemas de Proceso">
                                <option value="calibracion_maquinaria">Falla en calibración de maquinaria</option>
                                <option value="temperatura_presion">Desviacion de temperatura o presión</option>
                                <option value="mezcla_incorrecta">Mezcla incorrecta de ingredientes</option>
                                <option value="retraso_produccion">Retraso en la línea de producción</option>
                                <option value="falta_calidad">Falta de control de calidad en lote específico</option>
                            </optgroup>

                            <optgroup label="Distribución y Logística">
                                <option value="retraso_entrega">Retraso en entrega</option>
                                <option value="daños_transporte">Daños durante transporte</option>
                                <option value="error_cantidad">Error en cantidad enviada</option>
                                <option value="trazabilidad_lote">Falta de trazabilidad del lote</option>
                            </optgroup>

                            <optgroup label="Atención al Cliente">
                                <option value="respuesta_tardia">Respuesta tardía</option>
                                <option value="trato_inadecuado">Trato inadecuado del personal</option>
                                <option value="falta_informacion">Falta de información sobre el reclamo</option>
                                <option value="comunicacion_confusa">Comunicación confusa o contradictoria</option>
                            </optgroup>

                            <optgroup label="Cumplimiento y documentación">
                                <option value="incumplimiento_normas">Incumplimiento de normas de calidad o seguridad</option>
                                <option value="registro_inspeccion">Falta de registro de inspecciones</option>
                                <option value="documentation_incompleta">Documentación incompleta</option>
                            </optgroup>

                            <optgroup label="Otro">
                            <option value="otro">Otro</option>
                            </optgroup>
            

                        </select>

                        <input type="file" name="file" accept="image/*"/>
                    </div>

                    <div className={styles.commentBox}>

                        <textarea name="comentario" placeholder="Ingresa detalles e informacion de la reclamación." value={queja.comentario} onChange={handleChange}>
                        </textarea>
                    </div>

                    <div className={styles.formBtns}>
                        <button className={styles.saveBtn}>Enviar Queja</button>
                        <button className={styles.btnReset} onClick={resetForm}>Reiniciar Formulario</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Quejas;