import RegisterForm from "../../components/pages/registerPage/RegisterForm"
import styles from './RegisterPage.module.css'


const RegisterPage = () => {
    return(
        <div className={styles.page}>
            <RegisterForm></RegisterForm>
        </div>
    )
}
export default RegisterPage;