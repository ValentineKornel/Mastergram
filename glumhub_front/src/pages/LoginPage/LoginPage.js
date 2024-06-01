import LoginForm from "../../components/pages/loginPage/LoginForm"
import styles from './LoginPage.module.css'

const LoginPage = () => {
    return (
        <div className={styles.page}>
            <LoginForm></LoginForm>
        </div>
    )
}

export default LoginPage;