import React, {  } from "react";
import './CommentsList.css'
import ReplyForm from "../CommentForm/ReplyForm";





const CommentsList = (props) => {
    
  return (
    
          <table className="CommentsList">
            <thead>
              <tr>
                <th> Comments </th>
                <th> Replies </th>
                <th> Likes </th>
                <th> Dislikes </th>
                <th> Submit Reply </th>
                
              </tr>
            </thead>

            <tbody>
              {props.comments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.comment}</td>
                  <td>
                      {props.replies.map((reply, index) => {
                      if(comment.id === reply.comment){
                        return(
                          <tr key={`${comment.id}-${index}`} className="replies">
                              <td>{reply.comment_reply}</td>
                          </tr>
                        )
                      } else {
                          return null
                      }
                      })}
                  </td>            
                  <td>
                    {comment.likes}
                    <button type="button" className="btn btn-success btn-sm ms-2 me-2" onClick={() => props.addLike(comment.id)}> Like </button>
                  </td>
                  <td>
                    {comment.dislikes}
                    <button type="button" className="btn btn-danger btn-sm ms-2 me-2" onClick={() => props.addDislike(comment.id)} > Dislike </button>

                  </td>
                  <td>
                      <ReplyForm id={comment.id} getAllReplies={props.getAllReplies} />
                  </td>
                
                </tr>
            
                
              ))}
            </tbody>
          </table>
  );
};

export default CommentsList;