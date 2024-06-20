import { useEffect, useState } from 'react';
import styles from './MasterPage.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import postApi from '../../services/postApi';
import CalendarClient from '../../components/pages/masterPage/CalendarClient';
import userApi from '../../services/userApi';

const NavButtons = {
    SERVICE: 'service',
    POSTS: 'posts',
};

const MasterPage = () => {

    const {id} = useParams();
    
    const [master, setMaster] = useState({});
    const navigate = useNavigate()
    const [selected, setSelected] = useState(NavButtons.SERVICE);
    const [posts, setPosts] = useState([])

    const getMasterInfo = async() => {
        try{
            const response = await userApi.getMasterInfo(id);
            if (response.ok) {
                const result = await response.json();
                setMaster(result);
            }
        }catch(error){
            console.log(error);
        }
    }

    const getPosts = async() => {
        try{
            const response = await postApi.getPosts(id);
            if (response.ok) {
                const result = await response.json();
                setPosts(result);
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {getMasterInfo()}, [])

    const editProfileRedirect = () => {
        navigate('/editProfile');
    }

    const onServiceClick = () => {
        setSelected(NavButtons.SERVICE);
    }

    const onPostsClick = () => {
        getPosts();
        setSelected(NavButtons.POSTS);
    }


    return (
        <div id={styles.main}>
            <div id={styles.profileInfo}>

                <div id={styles.avatarDiv}>
                {master.profileImage && master.profileImage.length > 30 ? (
                    <img id="avatar" className={styles.avatar} src={`data:image/jpeg;base64,${master.profileImage}`} alt='user'/>
                ) : (
                    <img id="avatar" className={styles.avatar} src={`${process.env.PUBLIC_URL}/defaultUser.png`} alt='user'/>
                )}
                </div>

                <div id={styles.infoDiv}>
                    <div id={styles.nameDiv}>
                        <span>{master.firstName} {master.secondName}</span>
                        <button onClick={editProfileRedirect} id={styles.editPfofileButton}>follow</button>
                    </div>
                    <div className={styles.addressDiv}>
                        <span>{master.city} {master.businessAddress}</span>
                    </div>
                    <div className={styles.descriptionDiv}>
                        <span>{master.description}</span>
                    </div>
                </div>
            </div>

            <div id={styles.navDiv}>

                    <button style={selected === NavButtons.SERVICE ? {borderTop:'2px solid #B8B8FF'} : {}} 
                        onClick={onServiceClick}
                        id={styles.navButton}>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.1992 3.08813L17.1992 7.20578" stroke="#222222" stroke-width="1.2" stroke-linecap="round"/>
                            <path d="M7.39062 3.08813L7.39062 7.20578" stroke="#222222" stroke-width="1.2" stroke-linecap="round"/>
                            <path d="M3.4668 10.1765C3.4668 8.2909 3.4668 7.34809 4.05258 6.7623C4.63837 6.17651 5.58118 6.17651 7.4668 6.17651H17.1239C19.0096 6.17651 19.9524 6.17651 20.5382 6.7623C21.1239 7.34809 21.1239 8.2909 21.1239 10.1765V11.3236H3.4668V10.1765Z" stroke="#222222" stroke-width="1.2"/>
                            <rect x="3.4668" y="6.17651" width="17.6571" height="15.4412" rx="2" stroke="#222222" stroke-width="1.2"/>
                            <path d="M6.4082 15.4412H10.332" stroke="#7E869E" stroke-opacity="0.25" stroke-width="1.2" stroke-linecap="round"/>
                            <path d="M14.2559 15.4412H18.1797" stroke="#7E869E" stroke-opacity="0.25" stroke-width="1.2" stroke-linecap="round"/>
                            <path d="M6.4082 18.5293H10.332" stroke="#7E869E" stroke-opacity="0.25" stroke-width="1.2" stroke-linecap="round"/>
                            <path d="M14.2559 18.5293H18.1797" stroke="#7E869E" stroke-opacity="0.25" stroke-width="1.2" stroke-linecap="round"/>
                        </svg>
                        <span>service</span>
                    </button>
                    <button style={selected === NavButtons.POSTS ? {borderTop:'2px solid #B8B8FF'} : {}} 
                        onClick={onPostsClick}
                        id={styles.navButton}>
                        <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7349 2.14624H2.71823C2.48934 2.14624 2.28906 2.34656 2.28906 2.57549V14.5945C2.28906 14.8234 2.48934 15.0237 2.71823 15.0237H14.7349C14.9638 15.0237 15.1641 14.8234 15.1641 14.5945V2.57549C15.1641 2.34656 14.9638 2.14624 14.7349 2.14624ZM3.1474 3.00474H6.29462V6.15257H3.1474V3.00474ZM3.1474 7.01107H6.29462V10.1589H3.1474V7.01107ZM6.29462 14.1652H3.1474V11.0174H6.29462V14.1652ZM10.3002 14.1652H7.15295V11.0174H10.3002V14.1652ZM10.3002 10.1589H7.15295V7.01107H10.3002V10.1589ZM10.3002 6.15257H7.15295V3.00474H10.3002V6.15257ZM14.3057 14.1652H11.1585V11.0174H14.3057V14.1652ZM14.3057 10.1589H11.1585V7.01107H14.3057V10.1589ZM14.3057 6.15257H11.1585V3.00474H14.3057V6.15257Z" fill="#262626"/>
                        </svg>
                        <span>posts</span>
                    </button>
                    
            </div>

            {selected === NavButtons.SERVICE && (
                <CalendarClient id={id}></CalendarClient>
            )

            }

            {selected === NavButtons.POSTS && (
                <div id={styles.postsContainer}>
                    
                    {posts.map(post => (
                        <div id={styles.postWrapper} key={post.id}>
                            <img id={styles.postImage} src={`data:image/jpeg;base64,${post.postImage}`} alt='a'></img>
                        </div>
                    ))
                    }
                </div>
            )}
            
        </div>
    )
}

export default MasterPage;