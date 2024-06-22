import { useContext, useEffect, useState } from 'react';
import styles from './MyProfilePageMaster.module.css'
import { UserContext } from '../../../layouts/MainLaout';
import { useNavigate } from 'react-router-dom';
import AddNewPostPage from '../../../components/pages/myProfilePage/AddNewPostForm';
import postApi from '../../../services/postApi';

const NavButtons = {
    HISTORY: 'history',
    POSTS: 'posts',
    STATISTIC: 'statistic',
    ADDNEWPOST: 'addNewPost'
};

const MyProfilePageMaster = () => {

    const {user} = useContext(UserContext);
    const navigate = useNavigate()
    const [selected, setSelected] = useState(NavButtons.POSTS);
    const [posts, setPosts] = useState([])

    const getPosts = async() => {
        try{
            const response = await postApi.getMyPosts();
            if (response.ok) {
                const result = await response.json();
                setPosts(result);
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {getPosts()}, [])

    const updatePosts = () => {
        getPosts();
        setSelected(NavButtons.POSTS);
    }

    const editProfileRedirect = () => {
        navigate('/editProfile');
    }

    const onHistoryClick = () => {
        setSelected(NavButtons.HISTORY);
    }

    const onPostsClick = () => {
        setSelected(NavButtons.POSTS);
    }
    const onStatisticClick = () => {
        setSelected(NavButtons.STATISTIC);
    }
    
    const onAddPostClick = () => {
        setSelected(NavButtons.ADDNEWPOST);
    }

    return (
        <div id={styles.main}>
            <div id={styles.profileInfo}>

                <div id={styles.avatarDiv}>
                {user.base64Image && user.base64Image.length > 30 ? (
                    <img id="avatar" className={styles.avatar} src={user.base64Image} alt='user'/>
                ) : (
                    <img id="avatar" className={styles.avatar} src={`${process.env.PUBLIC_URL}/defaultUser.png`} alt='user'/>
                )}
                </div>

                <div id={styles.infoDiv}>
                    <div id={styles.nameDiv}>
                        <span>{user.firstName} {user.secondName}</span>
                        <button onClick={editProfileRedirect} id={styles.editPfofileButton}>Edit profile</button>
                    </div>
                </div>
            </div>

            <div id={styles.navDiv}>
                    
                    {(selected === NavButtons.POSTS || selected === NavButtons.ADDNEWPOST) && (
                        <button style={selected === NavButtons.ADDNEWPOST ? {borderTop:'2px solid #B8B8FF'} : {}} 
                        onClick={onAddPostClick}
                        id={styles.navButton}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.5 7C3.5 5.067 5.067 3.5 7 3.5H17C18.933 3.5 20.5 5.067 20.5 7V17C20.5 18.933 18.933 20.5 17 20.5H7C5.067 20.5 3.5 18.933 3.5 17V7Z" stroke="#222222"/>
                            <path d="M12 8L12 16" stroke="#222222" stroke-linejoin="round"/>
                            <path d="M16 12L8 12" stroke="#222222" stroke-linejoin="round"/>
                        </svg>
                    </button>
                        
                    )}
                    <button style={selected === NavButtons.POSTS ? {borderTop:'2px solid #B8B8FF'} : {}} 
                        onClick={onPostsClick}
                        id={styles.navButton}>
                        <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7349 2.14624H2.71823C2.48934 2.14624 2.28906 2.34656 2.28906 2.57549V14.5945C2.28906 14.8234 2.48934 15.0237 2.71823 15.0237H14.7349C14.9638 15.0237 15.1641 14.8234 15.1641 14.5945V2.57549C15.1641 2.34656 14.9638 2.14624 14.7349 2.14624ZM3.1474 3.00474H6.29462V6.15257H3.1474V3.00474ZM3.1474 7.01107H6.29462V10.1589H3.1474V7.01107ZM6.29462 14.1652H3.1474V11.0174H6.29462V14.1652ZM10.3002 14.1652H7.15295V11.0174H10.3002V14.1652ZM10.3002 10.1589H7.15295V7.01107H10.3002V10.1589ZM10.3002 6.15257H7.15295V3.00474H10.3002V6.15257ZM14.3057 14.1652H11.1585V11.0174H14.3057V14.1652ZM14.3057 10.1589H11.1585V7.01107H14.3057V10.1589ZM14.3057 6.15257H11.1585V3.00474H14.3057V6.15257Z" fill="#262626"/>
                        </svg>
                        <span>posts</span>
                    </button>
                    <button style={selected === NavButtons.HISTORY ? {borderTop:'2px solid #B8B8FF'} : {}} 
                        onClick={onHistoryClick}
                        id={styles.navButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 12V17C20 18.8856 20 19.8284 19.4142 20.4142C18.8284 21 17.8856 21 16 21H6.5C5.11929 21 4 19.8807 4 18.5V18.5C4 17.1193 5.11929 16 6.5 16H16C17.8856 16 18.8284 16 19.4142 15.4142C20 14.8284 20 13.8856 20 12V7C20 5.11438 20 4.17157 19.4142 3.58579C18.8284 3 17.8856 3 16 3H8C6.11438 3 5.17157 3 4.58579 3.58579C4 4.17157 4 5.11438 4 7V18.5" stroke="#000"/>
                            <path d="M9 10L10.2929 11.2929C10.6834 11.6834 11.3166 11.6834 11.7071 11.2929L15 8" stroke="#000" stroke-linecap="round"/>
                        </svg>
                        <span>history</span>
                    </button>
                    <button style={selected === NavButtons.STATISTIC ? {borderTop:'2px solid #B8B8FF'} : {}} 
                        onClick={onStatisticClick}
                        id={styles.navButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 10L8 16" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 12V16" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 8V16" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/>
                            <rect x="3" y="4" width="18" height="16" rx="2" stroke="#000"/>
                        </svg>
                        <span>statistic</span>
                    </button>
            </div>


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

            {selected === NavButtons.ADDNEWPOST && (
                <AddNewPostPage navigateToPosts={updatePosts}></AddNewPostPage>
            )}
            
        </div>
    )
}

export default MyProfilePageMaster;