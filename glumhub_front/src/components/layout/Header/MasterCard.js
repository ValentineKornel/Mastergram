import styles from './MasterCard.module.css'

const MasterCard = ({master, masterRedirect}) => {

    const onMasterClick = () => {
        masterRedirect(master.id);
    }

    return (
        <div className={styles.masterContainer}>

            <div className={styles.profileInfo}>

                <div onClick={onMasterClick} className={styles.avatarDiv}>
                {master.profileImage && master.profileImage.length > 30 ? (
                    <img id="avatar" className={styles.avatar} src={`data:image/jpeg;base64,${master.profileImage}`} alt='user'/>
                ) : (
                    <img id="avatar" className={styles.avatar} src={`${process.env.PUBLIC_URL}/defaultUser.png`} alt='user'/>
                )}
                </div>

                <div className={styles.infoDiv}>
                    <div className={styles.nameDiv}>
                        <span onClick={onMasterClick}>{master.firstName} {master.secondName}</span>
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