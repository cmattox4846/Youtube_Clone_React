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
                        <tr>
                            {props.replies.map((reply, index) => {
                                if(comment.id === reply.comment){
                            return(
                                <tr key={`${comment.id}-${index}`}>
                                    <td className="replies">{reply.comment_reply}</td>
                                </tr>
                                )
                             } else {
                            return null
                            }
                            })}
                        </tr>
            
                  <td>
                    {comment.likes}
<<<<<<< HEAD
                    <button type="button" className="btn btn-link" onClick={() => props.addLike(comment.id)}> Like </button>
                  </td>
                  <td>
                    {comment.dislikes}
                    <button type="button" className="btn btn-link" onClick={() => props.addDislike(comment.id)} > Dislike </button>
=======
                    <button type="button" className="btn btn-success btn-sm" onClick={() => props.addLike(comment.id)}> Like </button>
                  </td>
                  <td>
                    {comment.dislikes}
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => props.addDislike(comment.id)} > Dislike </button>
>>>>>>> 6991ceab848c04f9f9dcc863c23707cdf04f741f
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