import { Children, createContext, useEffect, useState } from "react";
import Header from "../components/layout/Header/Header";
import Sidebar from "../components/layout/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import styles from './MainLaout.module.css'
import userApi from "../services/userApi";


const UserContext = createContext();
const MainLayout = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        username: null,
        base64Image: null,
        email: null,
        firstName: null,
        secondName: null,
        tel: null,
        }
    );

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await userApi.getCurrentUserInfo();
                if (response.ok) {
                    const result = await response.json();
                    console.log(result);

                    const profileImageBase64 = result.profileImage;
                    setUser({
                        id: result.id,
                        username: result.username,
                        base64Image: `data:image/jpeg;base64,${profileImageBase64}`,
                        email: result.email,
                        firstName: result.firstName,
                        secondName: result.secondName,
                        tel: result.tel,
                    });
                } else {
                    navigate('/auth/login');
                }
            } catch (error) {
                console.error("Error during rquest:", error);
                navigate('/error');
            }
        }
        getUserInfo();
    },[]);

    return(

        <UserContext.Provider value={{user, setUser}}>
            <div>
            <Header user={user}></Header>
            <Sidebar></Sidebar>
            <div id={styles.outletDiv}>
            <Outlet></Outlet>
            </div>
        </div>
        </UserContext.Provider>
    );
}

export {UserContext};
export default MainLayout;