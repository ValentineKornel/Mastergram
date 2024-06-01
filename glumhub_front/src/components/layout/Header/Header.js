
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    return(
        <header>
        <Link id={styles.iconLink} to='/'>
        <div id={styles.iconDiv}>
            <p id={styles.icon}>GlumHub</p>
        </div>
        </Link>

        <div id={styles.searchDiv}>
            <input id={styles.searchInput} type="text" placeholder="Search"/>
        <svg id={styles.cleanSearchButton} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 24C18.5647 24 24 18.5529 24 12C24 5.43529 18.5529 0 11.9882 0C5.43529 0 0 5.43529 0 12C0 18.5529 5.44706 24 12 24ZM7.84706 17.1294C7.31765 17.1294 6.88235 16.6824 6.88235 16.1412C6.88235 15.8824 6.98824 15.6471 7.16471 15.4588L10.6118 12.0118L7.16471 8.56471C6.98824 8.37647 6.88235 8.14118 6.88235 7.88235C6.88235 7.34118 7.31765 6.91765 7.84706 6.91765C8.12941 6.91765 8.35294 7.01177 8.52941 7.2L11.9882 10.6471L15.4824 7.18824C15.6824 6.98824 15.8941 6.89412 16.1529 6.89412C16.6824 6.89412 17.1176 7.32941 17.1176 7.85882C17.1176 8.12941 17.0353 8.34118 16.8353 8.55294L13.3765 12.0118L16.8235 15.4471C17.0118 15.6471 17.1059 15.8706 17.1059 16.1412C17.1059 16.6824 16.6706 17.1294 16.1294 17.1294C15.8588 17.1294 15.6235 17.0118 15.4353 16.8353L11.9882 13.3882L8.56471 16.8353C8.37647 17.0235 8.12941 17.1294 7.84706 17.1294Z" fill="#3C3C43" fill-opacity="0.6"/>
        </svg>
        </div>

        <div id={styles.avatarDiv}>
            <Link to='/login'>
                <img id={styles.avatar} src={`${process.env.PUBLIC_URL}/defaultUser.png`} alt='user'/>
            </Link>
        </div>
    </header>
    )
}

export default Header;