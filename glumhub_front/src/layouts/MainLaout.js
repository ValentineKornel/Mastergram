import { Children, createContext, useEffect, useState } from "react";
import Header from "../components/layout/Header/Header";
import Sidebar from "../components/layout/Sidebar/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from './MainLaout.module.css'
import userApi from "../services/userApi";


const UserContext = createContext();
const MainLayout = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [isMaster, setIsMaster] = useState(false);
    const [user, setUser] = useState({
        id: null,
        username: null,
        bookings: [],
        base64Image: null,
        email: null,
        firstName: null,
        role: null,
        secondName: null,
        tel: null,
        masterInfo: {
            description: null,
            businessAddress: null,
        }
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
                    setUser({...user,
                        id: result.id,
                        bookings: result.bookings,
                        username: result.username,
                        base64Image: `data:image/jpeg;base64,${profileImageBase64}`,
                        email: result.email,
                        role: result.role,
                        firstName: result.firstName,
                        secondName: result.secondName,
                        tel: result.tel,
                        city: result.city,
                        masterInfo: result.role === 'ROLE_MASTER' && result.masterInfo ? {
                            description: result.masterInfo.description,
                            businessAddress: result.masterInfo.businessAddress
                        } : null
                    });
                    if(result.role === 'ROLE_MASTER'){
                        setIsMaster(true);
                    }
                    console.log(result);
                    
                    if(location.pathname === '/'){
                        navigate('/home');
                    }
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

        <UserContext.Provider value={{user, setUser, isMaster, setIsMaster}}>
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