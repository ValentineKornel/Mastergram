import { useState } from 'react'
import styles from './AddNewPostForm.module.css'
import postApi from '../../../services/postApi';
import { useLocation, useNavigate } from 'react-router-dom';


const AddNewPostPage = ({navigateToPosts}) => {

    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(`${process.env.PUBLIC_URL}/imagePlaceholder.png`);
    const [description, setDescription] = useState();

    const onChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    const onChangeImage = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
        const profileImageBase64 = e.target.result;
        setImageSrc(profileImageBase64);
        };
        reader.readAsDataURL(file);
    }

    const addNewPost = async (event) => {
        event.preventDefault();
        try {
            
            let post = {
                base64Image: imageSrc,
                description: description
            }

            const response = await postApi.createNewPost(post);

            if (response.ok) {
                console.log('created successfully');
                navigateToPosts();
            }else {
                console.log(response.status);
            }
        } catch (error) {
            console.error("Error during rquest:", error);
            navigate('/error');
        }
    }

    return ( 
        <form id={styles.addNewPostForm}>
            <label style={{width:'30%'}}>Post image</label>
            <img src={imageSrc} id={styles.postImage}></img>
            <label id={styles.changeImageButton} htmlFor="fileInput">Load image</label>
            <input onChange={onChangeImage} style={{visibility:'hidden', position:'fixed'}} id="fileInput" type="file" accept="image/*"/>

            <label style={{width:'40%'}}>Description</label>
            <textarea onChange={onChangeDescription} id={styles.description}></textarea>
            <button onClick={addNewPost} id={styles.addPostButton}>Add post</button>
        </form>
    )
}

export default AddNewPostPage