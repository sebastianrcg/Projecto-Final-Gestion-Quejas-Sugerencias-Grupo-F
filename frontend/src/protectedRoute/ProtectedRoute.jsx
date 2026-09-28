import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./protectedroute.module.css";
import ProtectedNav from "./ProtectedNav";
import AdminProtectedNav from "./AdminProtectedNav"; 

import { useRef } from "react";

const ProtectedRoute = () => {
    const { session, loading } = useAuth();

    const topPageRef = useRef(null);

    if (loading) return <div><p>Loading</p></div>

    if (!session || session.user === null) return <Navigate to="/login" />

    if (session.user.role === "admin") {

        return (
            <div className={styles.container}>
                <AdminProtectedNav style={styles.nav} />
                <div ref={topPageRef} className={styles.content}>
                    <Outlet context={topPageRef}/>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <ProtectedNav style={styles.nav} />

            <div ref={topPageRef} className={styles.content}>
                <Outlet context={topPageRef}/>
            </div>
        </div>
    )
}

export default ProtectedRoute;