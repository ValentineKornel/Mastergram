import { useContext } from "react";
import { UserContext } from "../../layouts/MainLaout";
import MyProfilePageMaster from "./Master/MyProfilePageMaster";
import MyProfilePageClient from "./Client/MyProfilePageClient";


const MyProfilePage = () => {
    
    const {user, isMaster} = useContext(UserContext);
    
    return(
        <div>
            {user.role === 'ROLE_MASTER' && isMaster && (
            <MyProfilePageMaster></MyProfilePageMaster>
        )}
        {!isMaster && (
            <MyProfilePageClient></MyProfilePageClient>
        )

        }
        </div>
    )
}

export default MyProfilePage;