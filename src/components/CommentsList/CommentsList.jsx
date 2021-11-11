import React, {  } from "react";
import './CommentsList.css'
import ReplyForm from "../CommentForm/ReplyForm";





const CommentsList = (props) => {
    
  return (
    
          <table className="CommentsList">
            <thead>
              <tr>
                <th> Comments </th>
                <th> Likes </th>
                <th> Dislikes </th>
                <th> Reply </th>
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
                  <td>
                      <ReplyForm id={comment.id} getAllReplies={props.getAllReplies} />
                  </td>
                  {props.replies.map((reply, index) => {
                      if(comment.id === reply.comment){
                        return(
                                <tr key={`${comment.id}-${index}`}>
                                    <td>{reply.comment_reply}</td>
                                </tr>
                        )
                    } else {
                        return null
                    }
                    })}
                </tr>
              ))}
            </tbody>
          </table>
  );
};

export default CommentsList;