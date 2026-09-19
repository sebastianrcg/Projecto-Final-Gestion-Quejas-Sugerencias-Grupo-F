import NavBar from "../NavBar/NavBar"
import { Outlet } from "react-router-dom"

const RootSinAccesso = () => {

    return (
        <>
            <NavBar/>
            <Outlet />
        </>
    )
}

export default RootSinAccesso;