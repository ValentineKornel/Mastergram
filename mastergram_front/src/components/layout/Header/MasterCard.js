import styles from './MasterCard.module.css'

const MasterCard = ({master, masterRedirect}) => {

    const onMasterClick = () => {
        masterRedirect(master.id);
    }

    return (
        <div className={styles.masterContainer}>

            <div className={styles.profileInfo}>

                <div className={styles.avatarDiv}>
                {master.profileImage && master.profileImage.length > 30 ? (
                    <img id="avatar" style={{cursor:'pointer'}} onClick={onMasterClick} className={styles.avatar} src={`data:image/jpeg;base64,${master.profileImage}`} alt='user'/>
                ) : (
                    <img id="avatar" style={{cursor:'pointer'}} onClick={onMasterClick} className={styles.avatar} src={`${process.env.PUBLIC_URL}/defaultUser.png`} alt='user'/>
                )}
                </div>

                <div className={styles.infoDiv}>
                    <div className={styles.nameDiv}>
                        <span style={{cursor:'pointer'}} onClick={onMasterClick}>{master.firstName} {master.secondName}</span>
                        {master.following ? 
                        <span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 14L8.23309 16.4248C8.66178 16.7463 9.26772 16.6728 9.60705 16.2581L18 6" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </span> : 
                        null}
                        
                    </div>
                    <div className={styles.addressDiv}>
                        <span>{master.city} {master.businessAddress}</span>
                    </div>
                    <div className={styles.descriptionDiv}>
                        <span>{master.description}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MasterCard;