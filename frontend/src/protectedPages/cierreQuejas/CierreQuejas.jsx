import styles from "./cierrequejas.module.css";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import axios from "../../axiosConfig";

const CierreQuejas = () => {

    const [quejas, setQuejas] = useState([]);

    const {session} = useAuth();

    if (session.user.role === "analista"){
       return <Navigate to="/app"/> 
    }

    useEffect(()=> {

        const getQuejasPorCerrar = async ()=> {

        }

    }, [])
    
    return (
        <>
            <h3 className={styles.title}>Cierre de Solicitudes</h3>
            
        </> 
    )
}

export default CierreQuejas;