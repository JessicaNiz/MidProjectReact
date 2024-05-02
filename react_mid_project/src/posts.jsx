import { useState, useEffect } from "react";
import { getUserPosts } from "./utils";
import {v4 as uuidv4 } from "uuid";


function PostsComp({userId}) {

  const [posts, setPosts] = useState([]);
  const [showPostsList, setShowPostsList] = useState(true)
  const [showAddPost, setShowAddPost] = useState(false)
  const [newPost, setNewPost] = useState({
    userId: userId,
    id:'',
    title:'',
    body:''
  });


  useEffect(() => {
  const fetchPosts = async () => {
    const { data } = await getUserPosts(userId);
    setPosts(data);
  };
  fetchPosts();
  },[])

  console.log("posts", posts);

  const changePostScreen = () => {
    setShowPostsList(false);
    setShowAddPost(true);
  }

  const handlePostCancel = () => {
    setShowPostsList(true);
    setShowAddPost(false);
  };

  const handleAddPost = (value) => {
    setPosts([...posts, value]);
    setShowPostsList(true);
    setShowAddPost(false);
  };

  console.log("addedPost", newPost);
  console.log("posts", posts);



  return (
    <>
    { showPostsList &&
    <>
    Posts- User {userId} &nbsp;&nbsp;&nbsp; 
    {<button className="yellowButton" onClick={changePostScreen}>Add</button>}
    <div style={{border: '1.5px solid black', alignItems: 'center'}}> 
      {posts.map((post) => {
        return (
          <div style={{ border: "1.5px solid purple", padding:"10px", margin:"10px" }}>
            Title: {post.title} <br />
            Body: {post.body} <br />
          </div>
        );
      }
      )}

      </div>
      </>
      }
      {
        showAddPost && 
      
      <>
      New Post - User {userId}
      <div style={{border: '1px solid black', alignItems: 'center'}}> 
      <br />
        Title: &nbsp;<input type="text" onChange={(e) => setNewPost({ ...newPost,id: uuidv4() /*userId*100+posts.length*/, title: e.target.value })} /> <br />
        Body: <input type="text" onChange={(e) => setNewPost({...newPost, body: e.target.value})} />
        <br /><br />
        <button onClick={handlePostCancel}>Cancel</button>
        &nbsp;&nbsp;
        <button onClick={() =>handleAddPost(newPost)}>Add</button>
      </div>
      <br />
    </>
    }
  
    </>
  );
};

export default PostsComp;