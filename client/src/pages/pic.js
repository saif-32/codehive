import { useState } from "react";
import axios from 'axios'

export const ProfilePictureTest = () => {

    const [postImage, setPostImage] = useState({ myFile : "" })

    const createPost = async (newImage) => {
        try {
            const email = "cssaif268@gmail.com"
            const response = await axios.post("http://localhost:3001/upload/profile-picture", {
                email,
                newImage,
            }, {
                withCredentials: true
              })
        }catch(error){

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost(postImage)
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file)
        setPostImage( {...postImage, myFile : base64})
    }




    return <div className="test-picture">
        <form onSubmit={handleSubmit}>
            <label htmlFor="file-upload" classname='custom-file-upload'>
                <img src= {postImage.myFile || "https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png"} alt="Profile Picture" />
            </label>
            <input 
                type="file"
                label="Image"
                name="myFile"
                id="file-upload"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => handleFileUpload(e)}
            />
            <h3>Doris Wilder</h3>
            <span>Designer</span>
            <button type="submit">Submit</button>
        </form>
    </div>
}

function convertToBase64(file){
    return new Promise((resolve, reject) =>{
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)

        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}