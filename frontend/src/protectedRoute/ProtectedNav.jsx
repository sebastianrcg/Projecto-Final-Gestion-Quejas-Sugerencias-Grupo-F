import styles from "./protectednav.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo2 from "../../public/logo2.png";

import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { LuFileSearch } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { VscCommentDiscussionSparkle } from "react-icons/vsc";
import { SiGithubactions } from "react-icons/si";


const ProtectedNav = ({ style }) => {
    const { signOut, session } = useAuth()

    return (
        <>
            <nav className={style}>
                <img src={logo2} alt="Logo Image" className={styles.logo
                } />
                <div className={styles.user}>
                    <div className={styles.userHeader}>
                        {session.user.nombre.slice(0, 1)}{session.user.apellido.slice(0, 1)}
                    </div>
                    <p><b>{session.user.nombre} {session.user.apellido}</b></p>
                    <p>{session.user.role}</p>
                </div>
                <NavLink to="/app" className={styles.link}><IoHomeOutline /> <p>Home</p></NavLink>
                <NavLink className={styles.link}><AiOutlineDashboard /> <p>Dashboard</p></NavLink>
                <NavLink to="/app/quejas" className={styles.link}><VscCommentDiscussionSparkle /> <p>Quejas</p></NavLink>
                <NavLink className={styles.link}><LuFileSearch /> <p>Investigacion</p></NavLink>
                <NavLink className={styles.link}><SiGithubactions /><p>Acciones Correctivas</p> </NavLink>
                <NavLink className={styles.link}><HiOutlineDocumentReport /><p>Reportes</p></NavLink>
                <NavLink className={styles.logOutBtn} onClick={signOut}>Cerrar sesion</NavLink>
            </nav>
        </>
    )
}

export default ProtectedNav;