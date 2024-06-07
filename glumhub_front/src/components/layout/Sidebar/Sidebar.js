import { useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { useContext } from 'react';
import { UserContext } from '../../../layouts/MainLaout';

const Sidebar = () => {

    const navigate = useNavigate();
    const user = useContext(UserContext);

    const onClickHome = () => {
        user.role === 'ROLE_CLIENT' ? navigate('/client/home') : navigate('/master/home');
    }


    return(
        <nav>
        <div onClick={onClickHome} className={styles.navButton}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.33398 21.2659C8.33398 19.003 8.33398 17.8715 8.79142 16.877C9.24886 15.8824 10.1079 15.146 11.8261 13.6733L13.4927 12.2448C16.5983 9.58289 18.151 8.25195 20.0007 8.25195C21.8503 8.25195 23.403 9.58289 26.5086 12.2448L28.1752 13.6733C29.8934 15.146 30.7524 15.8824 31.2099 16.877C31.6673 17.8715 31.6673 19.003 31.6673 21.2659V28.3332C31.6673 31.4759 31.6673 33.0473 30.691 34.0236C29.7147 34.9999 28.1433 34.9999 25.0007 34.9999H15.0007C11.858 34.9999 10.2866 34.9999 9.3103 34.0236C8.33398 33.0473 8.33398 31.4759 8.33398 28.3332V21.2659Z" stroke="black"/>
                <path d="M24.1673 35V26C24.1673 25.4477 23.7196 25 23.1673 25H16.834C16.2817 25 15.834 25.4477 15.834 26V35" stroke="#222222" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>Home</p>        
        </div>
        <div className={styles.navButton}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="13.3333" r="4.5" stroke="#222222" stroke-linecap="round"/>
                <path d="M22.6573 10.6666C23.0199 10.0385 23.5605 9.53213 24.211 9.21139C24.8614 8.89064 25.5923 8.76996 26.3113 8.86462C27.0303 8.95928 27.7051 9.26502 28.2503 9.74317C28.7955 10.2213 29.1867 10.8504 29.3744 11.5509C29.5621 12.2514 29.5379 12.9918 29.3048 13.6785C29.0717 14.3652 28.6401 14.9674 28.0648 15.4089C27.4895 15.8504 26.7961 16.1113 26.0725 16.1587C25.3488 16.2062 24.6274 16.0379 23.9993 15.6753" stroke="#222222"/>
                <path d="M17.3427 10.6666C16.9801 10.0385 16.4395 9.53213 15.789 9.21139C15.1386 8.89064 14.4077 8.76996 13.6887 8.86462C12.9697 8.95928 12.2949 9.26502 11.7497 9.74317C11.2045 10.2213 10.8133 10.8504 10.6256 11.5509C10.4379 12.2514 10.4621 12.9918 10.6952 13.6785C10.9283 14.3652 11.3599 14.9674 11.9352 15.4089C12.5105 15.8504 13.2039 16.1113 13.9275 16.1587C14.6512 16.2062 15.3726 16.0379 16.0007 15.6753" stroke="#222222"/>
                <path d="M20.0007 20.8333C27.3783 20.8333 28.8182 27.3109 29.0992 29.8393C29.1602 30.3882 28.7196 30.8333 28.1673 30.8333H11.834C11.2817 30.8333 10.8411 30.3882 10.9021 29.8393C11.1831 27.3109 12.623 20.8333 20.0007 20.8333Z" stroke="#222222" stroke-linecap="round"/>
                <path d="M32.3242 26.4122L32.8142 26.313V26.313L32.3242 26.4122ZM21.8125 20.9766L21.4433 20.6395L20.8228 21.319L21.7305 21.4698L21.8125 20.9766ZM28.6362 27.5001L28.1559 27.639L28.2603 28.0001H28.6362V27.5001ZM25.834 19.6667C27.8692 19.6667 29.2397 20.7781 30.1817 22.2166C31.132 23.6678 31.6105 25.4069 31.8341 26.5114L32.8142 26.313C32.5807 25.1594 32.0706 23.2758 31.0183 21.6688C29.9577 20.0491 28.3116 18.6667 25.834 18.6667V19.6667ZM22.1817 21.3137C23.0675 20.3436 24.2425 19.6667 25.834 19.6667V18.6667C23.9146 18.6667 22.4843 19.4992 21.4433 20.6395L22.1817 21.3137ZM21.7305 21.4698C25.7478 22.1374 27.4361 25.1511 28.1559 27.639L29.1165 27.3611C28.3476 24.7036 26.4612 21.2423 21.8945 20.4834L21.7305 21.4698ZM31.3956 27.0001H28.6362V28.0001H31.3956V27.0001ZM31.8341 26.5114C31.8829 26.7525 31.7016 27.0001 31.3956 27.0001V28.0001C32.273 28.0001 33.0002 27.2316 32.8142 26.313L31.8341 26.5114Z" fill="#222222"/>
                <path d="M18.1885 20.9766L18.2704 21.4698L19.1782 21.319L18.5577 20.6395L18.1885 20.9766ZM7.67678 26.4122L8.16684 26.5114H8.16684L7.67678 26.4122ZM11.3648 27.5001V28.0001H11.7406L11.8451 27.639L11.3648 27.5001ZM14.167 19.6667C15.7585 19.6667 16.9335 20.3436 17.8192 21.3137L18.5577 20.6395C17.5167 19.4992 16.0864 18.6667 14.167 18.6667V19.6667ZM8.16684 26.5114C8.39042 25.4069 8.86901 23.6678 9.8193 22.2166C10.7613 20.7781 12.1318 19.6667 14.167 19.6667V18.6667C11.6894 18.6667 10.0433 20.0491 8.98271 21.6688C7.93036 23.2758 7.42023 25.1594 7.18672 26.313L8.16684 26.5114ZM8.6053 27.0001C8.29938 27.0001 8.11803 26.7525 8.16684 26.5114L7.18672 26.313C7.00078 27.2316 7.72798 28.0001 8.6053 28.0001V27.0001ZM11.3648 27.0001H8.6053V28.0001H11.3648V27.0001ZM11.8451 27.639C12.5649 25.1511 14.2531 22.1374 18.2704 21.4698L18.1065 20.4834C13.5398 21.2423 11.6533 24.7036 10.8845 27.3611L11.8451 27.639Z" fill="#222222"/>
            </svg>
            <p>My masters</p>        
        </div>
        <div className={styles.navButton}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M31.5439 7.8575C31.1201 7.93288 30.5411 8.12451 29.697 8.40586L14.876 13.3462C12.5076 14.1357 10.7815 14.7122 9.64184 15.2666C8.46016 15.8415 8.1582 16.2762 8.1582 16.6666C8.1582 17.0571 8.46016 17.4918 9.64184 18.0666C10.7815 18.621 12.5076 19.1975 14.876 19.987L16.5944 20.5598C16.6313 20.5721 16.6676 20.5842 16.7035 20.5961C17.5281 20.8705 18.1016 21.0613 18.5203 21.48C18.939 21.8987 19.1298 22.4722 19.4041 23.2967C19.4161 23.3326 19.4282 23.369 19.4404 23.4059L20.0133 25.1243C20.8027 27.4927 21.3792 29.2188 21.9336 30.3584C22.5085 31.5401 22.9432 31.8421 23.3336 31.8421C23.7241 31.8421 24.1588 31.5401 24.7337 30.3584C25.2881 29.2188 25.8646 27.4927 26.654 25.1243L31.5944 10.3032C31.8757 9.45919 32.0674 8.88012 32.1428 8.45638C32.2188 8.02901 32.1438 7.93193 32.1061 7.89419C32.0683 7.85646 31.9712 7.78147 31.5439 7.8575ZM31.3687 6.87295C31.8785 6.78227 32.4139 6.7878 32.8132 7.18709C33.2125 7.58637 33.218 8.12174 33.1273 8.63152C33.0375 9.13629 32.8211 9.78545 32.5567 10.5786L32.5431 10.6195L27.6027 25.4405L27.5885 25.4831C26.8161 27.8005 26.2197 29.5897 25.6329 30.7959C25.063 31.9674 24.3847 32.8421 23.3336 32.8421C22.2826 32.8421 21.6043 31.9674 21.0344 30.7959C20.4476 29.5897 19.8512 27.8005 19.0787 25.483L19.0646 25.4405L18.4918 23.7221C18.1655 22.7434 18.0439 22.4179 17.8132 22.1871C17.5824 21.9563 17.2568 21.8347 16.2782 21.5085L14.5597 20.9357L14.5172 20.9215C12.1998 20.149 10.4106 19.5526 9.20438 18.9659C8.03285 18.3959 7.1582 17.7177 7.1582 16.6666C7.1582 15.6155 8.03285 14.9373 9.20438 14.3674C10.4106 13.7806 12.1998 13.1842 14.5172 12.4117L14.5597 12.3975L29.3808 7.45718L29.4217 7.44355C30.2148 7.17914 30.864 6.96275 31.3687 6.87295Z" fill="#222222"/>
            </svg>
            <p>Messages</p>        
        </div>
        <div className={styles.navButton}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.2496 13.0521C14.5645 10.7684 14.222 9.62656 14.5155 8.73164C14.7184 8.11295 15.1171 7.57708 15.6514 7.20493C16.4242 6.66663 17.6164 6.66663 20.0007 6.66663V6.66663C22.3849 6.66663 23.5771 6.66663 24.3499 7.20493C24.8842 7.57708 25.2829 8.11295 25.4858 8.73164C25.7793 9.62656 25.4368 10.7684 24.7517 13.0521L22.0949 21.908C21.8889 22.5946 21.7859 22.9379 21.5202 23.1356C21.2545 23.3333 20.8961 23.3333 20.1793 23.3333H19.822C19.1052 23.3333 18.7468 23.3333 18.4811 23.1356C18.2154 22.9379 18.1124 22.5946 17.9064 21.908L15.2496 13.0521Z" stroke="#222222"/>
                <circle cx="19.9993" cy="31.6667" r="3.33333" stroke="#222222"/>
            </svg>
            <p>Notifications</p>        
        </div>
    </nav>
    )
}

export default Sidebar;