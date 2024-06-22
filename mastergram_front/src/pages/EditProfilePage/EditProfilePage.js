import EditProfileForm from "../../components/pages/EditProfilePage/EditProfileForm";
import styles from './editProfilePage.module.css'

const EditProfilePage = () => {

    return (
        <div id={styles.mainEditProfileDiv}>
            <EditProfileForm></EditProfileForm>
        </div>
    )
}

export default EditProfilePage;