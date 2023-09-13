import React from "react";

const Post = ({ id, title, content, likes, editPost, deletePost, handleLike }) => {
  return (
    <>
      <div className="card card-width bg-dark">
        <section key={id}>
          <h3>{title}</h3>
          <hr className="new2"></hr>
          <p>{content}</p>
          <span title="edit post" onClick={() => editPost(id)}>
            <i className="edit-button far fa-edit fa-2x button-css"/>
          </span>
          <span title="delete post" onClick={() => deletePost(id)}>
            <i className="delete-button fas fa-trash fa-2x ml-2 button-css" />
          </span>
          <button className="btn btn-primary" onClick={() => handleLike(id)}>
          Like 
          </button>
          
        </section>
      </div>
    </>
  );
};

export default Post;
