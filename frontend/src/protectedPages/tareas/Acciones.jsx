import styles from "./acciones.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { useAuth } from "../../context/AuthContext";
import InvestigacionCard from "./InvestigacionCard";
import AccionesCorrectivasCard from "./AccionesCorrectivasCard";

const Acciones = () => {
    const [queja, setQueja] = useState([]);

    const [investigaciones, setInvestigaciones] = useState([])
    const [accionesCorrectivas, setAccionesCorrectivas] = useState([])

    const [showInvestigaciones, setShowInvestigaciones] = useState(false)
    const [showAcciones, setShowAcciones] = useState(false)

    const [showImg, setShowImg] = useState(false);

    const [showInvestigacionForm, setShowInvestigacionForm] = useState(false);
    const [showAccionForm, setShowAccionForm] = useState(false);

    const [nuevaInvestigacion, setNuevaInvestigacion] = useState({
        tipo: "",
        descripcion: "",
        archivos: null
    });

    const [nuevaAccion, setNuevaAccion] = useState({
        descripcion: "",
        resultado: "",
        archivos: null
        // maybe investigacion ID, y hacer un select con el id de las investigaciones.
    })

    const [investigacionEnviada, setInvestigacionEnviada] = useState(false);
    const [accionEnviada, setAccionEnviada] = useState(false);

    const { id } = useParams();
    const { session } = useAuth();

    const navigate = useNavigate();

    const handleInvestigacionChange = (event) => {
        const { name, value } = event.target;
        setNuevaInvestigacion(prev => ({ ...prev, [name]: value }));
    }

    const handleInvestigacionImgChange = (event) => {
        setNuevaInvestigacion(prev => ({ ...prev, archivos: event.target.files[0] }))

    }

    const handleAccionChange = (event) => {
        const { name, value } = event.target;
        setNuevaAccion(prev => ({ ...prev, [name]: value }));
    }

    const handleAccionImgChange = (event) => {
        setNuevaAccion(prev => ({ ...prev, archivos: event.target.files[0] }));
    }

    const enviarInvestigacion = async (event) => {
        event.preventDefault();

        try {
            const investigacionForm = new FormData();

            investigacionForm.append("tipo", nuevaInvestigacion.tipo);
            investigacionForm.append("descripcion", nuevaInvestigacion.descripcion);
            investigacionForm.append("queja_id", id);
            investigacionForm.append("usuario_asignado", session.user.id);

            if (nuevaInvestigacion.archivos) {
                investigacionForm.append("archivos", nuevaInvestigacion.archivos);
            }

            const response = await axios.post("http://localhost:5000/investigaciones", investigacionForm, { headers: { "Content-Type": "multipart/form-data" } });

            setInvestigacionEnviada(true);
            setShowInvestigacionForm(false);
            setNuevaInvestigacion({
                tipo: "",
                descripcion: "",
                archivos: null
            })

        } catch (error) {

        }
    }

    const enviarAccion = async (event) => {
        event.preventDefault();

        try {

            const accionForm = new FormData();

            accionForm.append("queja_id", id);
            accionForm.append("usuario_asignado", session.user.id);
            accionForm.append("descripcion", nuevaAccion.descripcion);
            accionForm.append("resultado", nuevaAccion.resultado);

            if (nuevaAccion.archivos) {
                accionForm.append("archivos", nuevaAccion.archivos);
            }

            const response = await axios.post("http://localhost:5000/accionesCorrectivas", accionForm, { headers: { "Content-Type": "multipart/form-data" } });

            setAccionEnviada(true);
            setShowAccionForm(false);
            setNuevaAccion({
                descripcion: "",
                resultado: "",
                archivos: null
            })

        } catch (error) {

        }

    }

    const cancelarInvestigacion = (event) => {
        event.preventDefault();
        setShowInvestigacionForm(false);
        setNuevaInvestigacion({
            tipo: "",
            descripcion: "",
            archivos: null
        })
    }

    const cancelarAccion = (event) => {
        event.preventDefault();
        setShowAccionForm(false);
        setNuevaAccion({
            descripcion: "",
            resultado: "",
            archivos: null
        })
    }




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

    const cerrarAccionCorrectiva = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/accionesCorrectivas/cerrar/${id}`);
            setAccionEnviada(true)

        } catch (error) {

        }
    }

    const showInvestigacionFormBtn = () => {
        if (showAccionForm) {
            setShowAccionForm(false);
        }
        setShowInvestigacionForm(!showInvestigacionForm)
    }

    const showAccionFormBtn = () => {
        if (showInvestigacionForm) {
            setShowInvestigacionForm(false);
        }
        setShowAccionForm(!showAccionForm);
    }
    useEffect(() => {

        setAccionEnviada(false);
        const getAccionesCorrectivas = async (quejaId, usuarioId) => {
            try {
                const response = await axios.get(`http://localhost:5000/accionesCorrectivas/queja?quejaid=${quejaId}&usuarioid=${usuarioId}`);

                if (response.data.accionesCorrectivas) {
                    setAccionesCorrectivas(response.data.accionesCorrectivas)
                }
            } catch (error) {

            }
        }

        getAccionesCorrectivas(id, session.user.id)

    }, [id, accionEnviada])

    useEffect(() => {

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

    // return (
    //     <>
    //         <div className={styles.header}>
    //             <h3 className={styles.title}>Acciones</h3>
    //             <div className={styles.btnContainer}>
    //                 <button onClick={() => navigate(-1)}>Atras</button>
    //             </div>
    //         </div>

    //         <div className={styles.container}>
    //             <div className={styles.infoContainer}>
    //                 <p ><b>Titulo: </b>{queja.titulo}</p>
    //                 <p><b>Tipo Queja: </b>{queja.tipoqueja}</p>
    //                 <p><b>Nombre: </b>{queja.nombre}</p>

    //             </div>

    //             <div className={styles.infoContainer}>
    //                 <p><b>Correo: </b>{queja.correo}</p>
    //                 <p><b>Fecha Creacion: </b>{queja.fechacreacion}</p>
    //                 {/* <p><b>Fecha Creacion: </b>{queja.fechacreacion.split("T")[0]} - {queja.fechacreacion.split("T")[1].split(".")[0]}</p> */}
    //                 <p><b>Estado: </b>{queja.estado}</p>
    //             </div>

    //             <div className={styles.infoContainer}>
    //                 <p><b>Producto: </b>{queja.producto}</p>
    //                 <p><b>Lote: </b>{queja.lote}</p>
    //                 <p><b>Solicitud #: </b>{queja.tracking}</p>
    //             </div>
    //             <p><b>Comentario: </b>{queja.comentario}</p>
    //             <button disabled={!queja.foto} onClick={() => setShowImg(!showImg)} className={styles.verImg}>{showImg ? "Ocultar Imagen" : "Ver Imagen"}</button>

    //             {showImg &&
    //                 <div>
    //                     {
    //                         (queja.foto && queja.foto.length >= 0) ?
    //                             <img src={queja.foto} alt={`Foto solicitud ${queja.id}`} /> : <p>No hay imagenes</p>
    //                     }
    //                 </div>
    //             }

    //             <div className={styles.inputBtns}>
    //                 <button onClick={() => showInvestigacionFormBtn()} className={styles.investigacionBtn}>Nueva Investigacion</button>
    //                 <button onClick={() => showAccionFormBtn()} className={styles.accionBtn}>Nueva Acción</button>
    //             </div>

    //             {showInvestigacionForm &&
    //                 <div className={styles.investigacionForm}>
    //                     <hr />
    //                     <form onSubmit={enviarInvestigacion}>
    //                         <div className={styles.formInput}>
    //                             <select required name="tipo" value={nuevaInvestigacion.tipo} onChange={handleInvestigacionChange}>
    //                                 <option value="" selected disabled> Tipo </option>
    //                                 <option value="observacion"> Observación</option>
    //                                 <option value="Investigacion">Investigación</option>
    //                             </select>
    //                             <input type="file" name="archivos" accept="image/*" onChange={handleInvestigacionImgChange} />
    //                         </div>

    //                         <textarea name="descripcion" placeholder="Descripción" value={nuevaInvestigacion.descripcion} onChange={handleInvestigacionChange} required></textarea>

    //                         <div className={styles.formBtns}>
    //                             <button className={styles.guardarBtn} type="submit">Agregar Investigación</button>
    //                             <button type="reset" onClick={cancelarInvestigacion} className={styles.cancelarBtn}>Cancelar</button>
    //                         </div>
    //                     </form>

    //                 </div>
    //             }

    //             {
    //                 showAccionForm &&
    //                 <div className={styles.accionForm}>
    //                     <hr />
    //                     <form onSubmit={enviarAccion}>
    //                         <textarea name="descripcion" placeholder="Descripción" onChange={handleAccionChange} value={nuevaAccion.descripcion}></textarea>
    //                         <textarea name="resultado" placeholder="Resultado" onChange={handleAccionChange} value={nuevaAccion.resultado}></textarea>
    //                         <input type="file" name="archivos" accept="image/*" className={styles.fileInput} onChange={handleAccionImgChange}/>

    //                         <div className={styles.formBtns}>
    //                             <button className={styles.guardarBtn} type="submit">Agregar Acción</button>
    //                             <button type="reset" className={styles.cancelarBtn} onClick={cancelarAccion}>Cancelar</button>
    //                         </div>
    //                     </form>
    //                 </div>
    //             }

    //         </div>

    //         <div className={styles.container}>
    //             <div className={styles.containerHeader}>
    //                 <h4 className={styles.sectionTitle}>Investigaciones</h4>
    //                 <button onClick={() => setShowInvestigaciones(!showInvestigaciones)} className={styles.verBtn}>Ver Investigaciones</button>
    //             </div>
    //             {showInvestigaciones &&
    //                 <div>

    //                     {(investigaciones.length === 0) ? <p>No hay investigaciones registradas</p> : investigaciones.map((investigacion, i) => {
    //                         return (
    //                             <InvestigacionCard
    //                                 key={investigacion.id}
    //                                 numero={i + 1}
    //                                 tipo={investigacion.tipo}
    //                                 estado={investigacion.estado}
    //                                 fecha_inicio={investigacion.fecha_inicio}
    //                                 fecha_fin={investigacion.fecha_fin}
    //                                 descripcion={investigacion.descripcion}
    //                                 archivos={investigacion.archivos}
    //                                 cerrarInvestigacion={cerrarInvestigation}
    //                                 id={investigacion.id} />

    //                         )
    //                     })}

    //                 </div>
    //             }
    //         </div>
    //         <div className={styles.container}>
    //             <div className={styles.containerHeader}>
    //                 <h4 className={styles.sectionTitle}>Acciones Correctivas</h4>
    //                 <button onClick={() => setShowAcciones(!showAcciones)} className={styles.verBtn}>Ver Acciones</button>
    //             </div>

    //             {showAcciones &&
    //                 <div>

    //                     {(accionesCorrectivas.length === 0) ? <p>No hay Acciones pendientes.</p> : accionesCorrectivas.map((accionCorrectiva, i) => {
    //                         return (
    //                             <AccionesCorrectivasCard
    //                                 key={accionCorrectiva.id}
    //                                 numero={i + 1}
    //                                 estado={accionCorrectiva.estado}
    //                                 fecha_inicio={accionCorrectiva.fecha_inicio}
    //                                 fecha_fin={accionCorrectiva.fecha_fin}
    //                                 descripcion={accionCorrectiva.descripcion}
    //                                 resultado={accionCorrectiva.resultado}
    //                                 archivos={accionCorrectiva.archivos}
    //                                 cerrarAccionCorrectiva = {cerrarAccionCorrectiva} 
    //                                 id={accionCorrectiva.id} />

    //                         )
    //                     })}

    //                 </div>
    //             }

    //         </div>

    //     </>
    // )

    return (
        <>
            <div className={styles.header}>
                <button
                    onClick={() => navigate(-1)}
                    className={styles.backBtn}
                >
                     Atras
                </button>

                <div>
                    <span className={styles.headerLabel}>
                        GESTIÓN CAPA
                    </span>

                    <h3 className={styles.title}>
                        Acciones Correctivas
                    </h3>
                </div>
            </div>


            {/* =========================
            QUEJA
        ========================= */}

            <div className={styles.container}>

                <div className={styles.complaintHeader}>
                    <div>
                        <span className={styles.complaintLabel}>
                            QUEJA #{queja.id}
                        </span>

                        <h2>
                            {queja.titulo}
                        </h2>
                    </div>

                    <span
                        className={`${styles.estado} ${styles[queja.estado]}`}
                    >
                        {queja.estado}
                    </span>
                </div>


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

                    <div className={styles.infoItem}>
                        <span>Producto</span>
                        <strong>{queja.producto || "No especificado"}</strong>
                    </div>

                    <div className={styles.infoItem}>
                        <span>Lote</span>
                        <strong>{queja.lote || "No especificado"}</strong>
                    </div>

                    <div className={styles.infoItem}>
                        <span>Solicitud #</span>
                        <strong>{queja.tracking || "No especificado"}</strong>
                    </div>

                </div>


                <div className={styles.commentSection}>
                    <span>Comentario</span>

                    <div className={styles.comment}>
                        {queja.comentario || "Sin comentarios."}
                    </div>
                </div>


                <button
                    disabled={!queja.foto}
                    onClick={() => setShowImg(!showImg)}
                    className={styles.verImg}
                >
                    {showImg ? "Ocultar Imagen" : "Ver Imagen"}
                </button>


                {showImg && queja.foto && (
                    <div className={styles.imageContainer}>
                        <img
                            src={queja.foto}
                            alt={`Foto solicitud ${queja.id}`}
                        />
                    </div>
                )}


                {/* =========================
                ACTION BUTTONS
            ========================= */}

                <div className={styles.inputBtns}>

                    <button
                        onClick={() => showInvestigacionFormBtn()}
                        className={styles.investigacionBtn}
                    >
                         Nueva Investigación
                    </button>

                    <button
                        onClick={() => showAccionFormBtn()}
                        className={styles.accionBtn}
                    >
                         Nueva Acción
                    </button>

                </div>


                {/* =========================
                INVESTIGATION FORM
            ========================= */}

                {showInvestigacionForm && (
                    <div className={styles.workflowForm}>

                        <div className={styles.formHeader}>
                            <div>
                                <span>REGISTRO CAPA</span>
                                <h4>Nueva Investigación</h4>
                            </div>
                        </div>

                        <form onSubmit={enviarInvestigacion}>

                            <div className={styles.formRow}>

                                <div className={styles.field}>
                                    <label htmlFor="tipoInvestigacion">
                                        Tipo de investigación
                                    </label>

                                    <select
                                        id="tipoInvestigacion"
                                        required
                                        name="tipo"
                                        value={nuevaInvestigacion.tipo}
                                        onChange={handleInvestigacionChange}
                                    >
                                        <option value="" disabled>
                                            Seleccione un tipo
                                        </option>

                                        <option value="observacion">
                                            Observación
                                        </option>

                                        <option value="Investigacion">
                                            Investigación
                                        </option>
                                    </select>
                                </div>


                                <div className={styles.field}>
                                    <label htmlFor="archivoInvestigacion">
                                        Evidencia
                                    </label>

                                    <input
                                        id="archivoInvestigacion"
                                        type="file"
                                        name="archivos"
                                        accept="image/*"
                                        onChange={handleInvestigacionImgChange}
                                    />
                                </div>

                            </div>


                            <div className={styles.field}>
                                <label htmlFor="descripcionInvestigacion">
                                    Descripción
                                </label>

                                <textarea
                                    id="descripcionInvestigacion"
                                    name="descripcion"
                                    placeholder="Ingrese los detalles de la investigación..."
                                    value={nuevaInvestigacion.descripcion}
                                    onChange={handleInvestigacionChange}
                                    required
                                />
                            </div>


                            <div className={styles.formBtns}>

                                <button
                                    className={styles.guardarBtn}
                                    type="submit"
                                >
                                    Agregar Investigación
                                </button>

                                <button
                                    type="button"
                                    onClick={cancelarInvestigacion}
                                    className={styles.cancelarBtn}
                                >
                                    Cancelar
                                </button>

                            </div>

                        </form>
                    </div>
                )}


                {/* =========================
                CORRECTIVE ACTION FORM
            ========================= */}

                {showAccionForm && (
                    <div className={styles.workflowForm}>

                        <div className={styles.formHeader}>
                            <div>
                                <span>REGISTRO CAPA</span>
                                <h4>Nueva Acción Correctiva</h4>
                            </div>
                        </div>

                        <form onSubmit={enviarAccion}>

                            <div className={styles.field}>
                                <label htmlFor="descripcionAccion">
                                    Descripción de la acción
                                </label>

                                <textarea
                                    id="descripcionAccion"
                                    name="descripcion"
                                    placeholder="Ingrese los detalles de la acción correctiva que se realizará..."
                                    onChange={handleAccionChange}
                                    value={nuevaAccion.descripcion}
                                    required
                                />
                            </div>


                            <div className={styles.field}>
                                <label htmlFor="resultadoAccion">
                                    Resultado
                                </label>

                                <textarea
                                    id="resultadoAccion"
                                    name="resultado"
                                    placeholder="Ingrese detalles del resultado..."
                                    onChange={handleAccionChange}
                                    value={nuevaAccion.resultado}
                                />
                            </div>


                            <div className={styles.field}>
                                <label htmlFor="archivoAccion">
                                    Evidencia
                                </label>

                                <input
                                    id="archivoAccion"
                                    type="file"
                                    name="archivos"
                                    accept="image/*"
                                    className={styles.fileInput}
                                    onChange={handleAccionImgChange}
                                />
                            </div>


                            <div className={styles.formBtns}>

                                <button
                                    className={styles.guardarBtn}
                                    type="submit"
                                >
                                    Agregar Acción
                                </button>

                                <button
                                    type="button"
                                    className={styles.cancelarBtn}
                                    onClick={cancelarAccion}
                                >
                                    Cancelar
                                </button>

                            </div>

                        </form>

                    </div>
                )}

            </div>


            {/* =========================
            INVESTIGACIONES
        ========================= */}

            <div className={styles.container}>

                <div className={styles.containerHeader}>

                    <div>
                        <span className={styles.sectionLabel}>
                            SEGUIMIENTO
                        </span>

                        <h4 className={styles.sectionTitle}>
                            Investigaciones
                        </h4>
                    </div>

                    <button
                        onClick={() =>
                            setShowInvestigaciones(!showInvestigaciones)
                        }
                        className={styles.verBtn}
                    >
                        {showInvestigaciones
                            ? "Ocultar"
                            : "Ver Investigaciones"}
                    </button>

                </div>


                {showInvestigaciones && (
                    <div className={styles.recordsContainer}>

                        {investigaciones.length === 0 ? (
                            <p className={styles.emptyMessage}>
                                No hay investigaciones registradas.
                            </p>
                        ) : (
                            investigaciones.map((investigacion, i) => (
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
                                    id={investigacion.id}
                                />
                            ))
                        )}

                    </div>
                )}

            </div>


            {/* =========================
            ACCIONES CORRECTIVAS
        ========================= */}

            <div className={styles.container}>

                <div className={styles.containerHeader}>

                    <div>
                        <span className={styles.sectionLabel}>
                            SEGUIMIENTO
                        </span>

                        <h4 className={styles.sectionTitle}>
                            Acciones Correctivas
                        </h4>
                    </div>

                    <button
                        onClick={() =>
                            setShowAcciones(!showAcciones)
                        }
                        className={styles.verBtn}
                    >
                        {showAcciones
                            ? "Ocultar"
                            : "Ver Acciones"}
                    </button>

                </div>


                {showAcciones && (
                    <div className={styles.recordsContainer}>

                        {accionesCorrectivas.length === 0 ? (
                            <p className={styles.emptyMessage}>
                                No hay acciones correctivas registradas.
                            </p>
                        ) : (
                            accionesCorrectivas.map((accionCorrectiva, i) => (
                                <AccionesCorrectivasCard
                                    key={accionCorrectiva.id}
                                    numero={i + 1}
                                    estado={accionCorrectiva.estado}
                                    fecha_inicio={accionCorrectiva.fecha_inicio}
                                    fecha_fin={accionCorrectiva.fecha_fin}
                                    descripcion={accionCorrectiva.descripcion}
                                    resultado={accionCorrectiva.resultado}
                                    archivos={accionCorrectiva.archivos}
                                    cerrarAccionCorrectiva={cerrarAccionCorrectiva}
                                    id={accionCorrectiva.id}
                                />
                            ))
                        )}

                    </div>
                )}

            </div>
        </>
    );
}

export default Acciones;

