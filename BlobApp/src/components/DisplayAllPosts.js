import React, { useState, useRef } from "react";
import CreateNewPost from "./CreateNewPost";
import ModifyPost from "./ModifyPost";
import Post from "./Post";

const DisplayAllPosts = () => {
  // managing states below
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [likes, setLikes] = useState("");
  const [allPosts, setAllPosts] = useState([
    {
      id: 1,
      title: "Dotnet",
      content:
        ".NET is a software development framework developed by Microsoft. It provides a comprehensive and consistent programming model for building various types of applications, including web applications, desktop applications, mobile applications, cloud services, and more. The key components and aspects of .NET include:. ",
      likes: 0
    },
    {
      id: 2,
      title: "Javascript",
      content:
        "javaScript is a lightweight, interpreted programming language that enables developers to add functionality to web pages, control the behavior of web browsers, and build web applications. It is commonly used for client-side scripting, where it runs directly in the user's web browser, but it can also be used on the server-side through technologies like Node.js."
    },
    {
      id: 3,
      title: "C++",
      content:
        "C++ is a general-purpose, high-level programming language that was developed as an extension of the C programming language. It was created by Bjarne Stroustrup in the early 1980s at Bell Labs and has since become one of the most popular and widely used programming languages. Here's a concise definition of C++: "
    }
  ]);
  // const [allPosts, setAllPosts] = useState([]) // can also be used
  const [isCreateNewPost, setIsCreateNewPost] = useState(false);
  const [isModifyPost, setIsModifyPost] = useState(false);
  const [editPostId, setEditPostId] = useState("");

  // Initialize useRef (to empty title and content once saved)
  const getTitle = useRef();
  const getContent = useRef();

  // function 1 (accepting title in state by user input)
  const savePostTitleToState = (event) => {
    setTitle(event.target.value);
  };

  // function 2 (accepting content/description in state by user input)
  const savePostContentToState = (event) => {
    setContent(event.target.value);
  };

  // function 3 (to save title and content in allPosts state)
  const savePost = (event) => {
    event.preventDefault();
    const id = Date.now();
    setAllPosts([...allPosts, { title, content, id }]);
    getTitle.current.value = "";
    getContent.current.value = "";
    toggleCreateNewPost();
  };

  // function 4 (toggle create new post visibility)
  const toggleCreateNewPost = () => {
    setIsCreateNewPost(!isCreateNewPost);
  };

  // function 5 (toggle post editing)
  const toggleModifyPostComponent = () => {
    setIsModifyPost(!isModifyPost);
  };

  // function 6 (to edit posts)
  const editPost = (id) => {
    setEditPostId(id);
    toggleModifyPostComponent();
  };

  // function 7 (to update the posts)
  const updatePost = (event) => {
    event.preventDefault();
    const updatedPost = allPosts.map((eachPost) => {
      if (eachPost.id === editPostId) {
        return {
          ...eachPost,
          title: title || eachPost.title,
          content: content || eachPost.content
        };
      }

      return eachPost;
    });
    setAllPosts(updatedPost);
    toggleModifyPostComponent();
  };

  // function 8 (to delete posts)
  const deletePost = (id) => {
    const modifiedPost = allPosts.filter((eachPost) => {
      return eachPost.id !== id;
    });
    setAllPosts(modifiedPost);
  };

  // const handleLike = () => {
  //   // Update likes on the server and then update the state
  //   axios.patch({ like: likes + 1 })
  //     .then(() => {
  //       setLikes((prevLikes) => prevLikes + 1);
  //       console.log('Updating The Like Is Successfully');
  //     })
  //     .catch((error) => {
  //       console.error('Error updating likes:', error);
  //     });
  // };

  const handleLike = (id) => {
    const updatedPosts = allPosts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.likes + 1, // Increment the likes count
        };
      }
      return post;
      });
      setAllPosts(updatedPosts);
  };
  

  if (isCreateNewPost) {
    return (
      <>
        <CreateNewPost
          savePostTitleToState={savePostTitleToState}
          savePostContentToState={savePostContentToState}
          getTitle={getTitle}
          getContent={getContent}
          savePost={savePost}
        />
        {/* Cancel Button */}
        <button
          className="btn btn-danger cancel-button"
          onClick={toggleCreateNewPost}
        >
          Cancel
        </button>
      </>
    );
  } else if (isModifyPost) {
    const post = allPosts.find((post) => {
      return post.id === editPostId;
    });

    return (
      <>
        <ModifyPost
          title={post.title}
          content={post.content}
          updatePost={updatePost}
          savePostTitleToState={savePostTitleToState}
          savePostContentToState={savePostContentToState}
          toggleCreateNewPost={toggleCreateNewPost}
        />
        <button
          className="btn btn-danger cancel-update-button"
          onClick={toggleModifyPostComponent}
        >
          Cancel
        </button>
      </>
    );
  }

  return (
    <>
      <h2>Show All Post</h2>
      {!allPosts.length ? (
        <div>
          <li>There are no posts yet.</li>
        </div>
      ) : (
        allPosts.map((eachPost) => (
          <Post
            id={eachPost.id}
            key={eachPost.id}
            title={eachPost.title}
            content={eachPost.content}
            editPost={editPost}
            deletePost={deletePost}
          />
        ))
      )}
      <button
        className="btn btn-outline-info button-edits create-post"
        onClick={toggleCreateNewPost}
      >
        Create New
      </button>
    </>
  );
};
export default DisplayAllPosts;
