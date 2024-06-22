import { useContext } from "react";
import { UserContext } from "../../layouts/MainLaout";
import HomePageMaster from "./HomePageMaster/HomePageMaster";
import HomePageClient from "./HomePageClient/HomePageClient";



const HomePage = () => {
    const {user, isMaster} = useContext(UserContext);

    return (
        <div>
            {user.role === 'ROLE_MASTER' && isMaster && (
            <HomePageMaster></HomePageMaster>
        )}
        {!isMaster && (
            <HomePageClient></HomePageClient>
        )

        }
        </div>
    )
}

export default HomePage;