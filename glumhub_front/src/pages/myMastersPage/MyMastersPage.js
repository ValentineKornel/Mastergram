import { useEffect, useState } from 'react';
import styles from './MyMastersPage.module.css'
import MasterCard from '../../components/layout/Header/MasterCard';
import userApi from '../../services/userApi';
import { useNavigate } from 'react-router-dom';



const MyMastersPage = () => {
    
    const navigate = useNavigate();
    const [masters, setMasters] = useState([]);

    const getMasters = async () => {
        try{
            const response = await userApi.getMyMasters();
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setMasters(result);
            }
        }catch(error){
            console.log(error);
        }
    }

    const onMasterClick = (id) => {
        navigate(`/master/${id}`);
    }

    useEffect(() => {
        getMasters();
    }, [])

    return (
        <div id={styles.mastersContainer}>
            {
                masters.map(master => (
                    <MasterCard master={master} masterRedirect={onMasterClick}></MasterCard>
                ))
            }
        </div>
    )

}

export default MyMastersPage;