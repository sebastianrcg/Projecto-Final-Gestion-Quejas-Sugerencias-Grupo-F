import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./protectedroute.module.css";
import ProtectedNav from "./ProtectedNav";

const ProtectedRoute = () => {
    const { session, loading } = useAuth();

    if (loading) return <div><p>Loading</p></div>

    if (!session || session.user === null) return <Navigate to="/login"/>

    return(
        <div className={styles.container}>
            <ProtectedNav style={styles.nav}/>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    )
}

export default ProtectedRoute;