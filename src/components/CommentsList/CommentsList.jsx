import React, {  } from "react";
import './CommentsList.css'





const CommentsList = (props) => {
    
  return (
    
          <table className="CommentsList">
            <thead>
              <tr>
                <th> Comments </th>
                <th> Likes </th>
                <th >Dislikes </th>
              </tr>
            </thead>

            <tbody>
              {props.comments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.comment}</td>
                  <td>
                    {comment.likes} <br></br>
                    <button type="button" onClick={() => props.addLike(comment.id)}> Like </button>
                  </td>
                  <td>
                    {comment.dislikes} <br></br>
                    <button type="button" onClick={() => props.addDislike(comment.id)} > Dislike </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  );
};

export default CommentsList;