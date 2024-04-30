import { useEffect, useState } from "react";
import makeRequestBackend from "../../utils/makeRequestBackend";
import { CREATE_POST, FETCH_POSTS, EDIT_POST, DELETE_POST} from "../../constants/apiEndPoints";
import styles from './Landing.module.css'

interface PostData {
    _id: string;
    title: string;
    description: string;
}

const Landing = () => {

   const [postData, setPostData] = useState({
    id: "",
    title: "",
    description: "",
    });
    const [editData, setEdit] = useState(false); 
    const [postList, setPostList] = useState([]);
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "title":
                setPostData({ ...postData, title: e.target.value });
                break;
            case "description":
                setPostData({ ...postData, description: e.target.value });
        }
    }

    const handleSubmit = async() => {
        const token = await localStorage.getItem("jwt_token");
        const data = await makeRequestBackend(CREATE_POST, {
            headers : {authorization: token },
            data: postData,
         })
        setPostData({
            id: "",
            title: "",
            description: "",
        })
        fetchData();

    }

    const handleEdit = async(post: PostData) =>{
       setEdit(true);
       setPostData({
            id: post._id,
            title: post.title,
            description: post.description,
       })
    }

    const handleSubmitEdit = async() => {
        const token = await localStorage.getItem("jwt_token");
        const data = await makeRequestBackend(EDIT_POST, {
            headers : {authorization: token },
            data: postData,
        })
        setEdit(false);
        setPostData({
            id: "",
            title: "",
            description: "",
        })
        fetchData();
    }
    const handleDelete = async(post: PostData) => {
        const token = await localStorage.getItem("jwt_token");
        const data = await makeRequestBackend(DELETE_POST, {
            headers : {authorization: token },
            data: post,
        })
        fetchData();
    }

    const fetchData = async () => {
      const token = await localStorage.getItem("jwt_token");
      const data = await makeRequestBackend(FETCH_POSTS, {
        headers: { authorization: token },
      });
      setPostList(data.data);
    };
   
    useEffect(()=>{
       fetchData();
    },[])


    return (
      <div>
        {/*------Create Post ------*/}
        <div className={styles.CreatePost}>
          <h2>Create Post</h2>
           <p>Title</p>
            <input
              type="text"
              value={postData.title}
              name="title"
              onChange={(e) => handleChange(e)}
            />
            <p>Description</p>
            <input
              type="text"
              value={postData.description}
              name="description"
              onChange={(e) => handleChange(e)}
            />
          <button onClick={editData ? handleSubmitEdit : handleSubmit}>
            Submit
          </button>
        </div>
        {/*------List All Post ------*/}
        <div className={styles.CardContainer}>
          {postList.map((post: PostData, index) => (
            <div key={index} className={styles.Card}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <div className={styles.buttonContainer}>
                <button onClick={() => handleEdit(post)}>Edit</button>
                <button onClick={()=> handleDelete(post)}>Delete</button>
                <button>Like</button>
                <button>Dislike</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
export default Landing;