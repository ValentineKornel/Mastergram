import { Children } from "react";
import Header from "../components/layout/Header/Header";
import Sidebar from "../components/layout/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import styles from './MainLaout.module.css'

const MainLayout = () => {
    return(
        <div>
            <Header></Header>
            <Sidebar></Sidebar>
            <div id={styles.outletDiv}>
            <Outlet></Outlet>
            </div>
        </div>
    );
}

export default MainLayout;