import { useEffect, useState } from 'react';
import MasterCard from './MasterCard';
import styles from './MastersBar.module.css'
import userApi from '../../../services/userApi';
import { useNavigate } from 'react-router-dom';

const MastsersBar = ({masters, onOverlayClick, cleanSearchText}) => {

    const navigate = useNavigate();

    const onMasterClick = (id) => {
        navigate(`/master/${id}`);
        cleanSearchText();
        onOverlayClick();
    }
    

    return (
        <div id={styles.mastersBar}>
            {
                masters.map(master => (
                    <MasterCard master={master} masterRedirect={onMasterClick}></MasterCard>
                ))
            }
        </div>
    )
}

export default MastsersBar;