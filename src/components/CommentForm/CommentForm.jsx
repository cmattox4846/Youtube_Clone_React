import React, { Component } from "react";
import './CommentForm.css'

class CommentForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          videoId: this.props.videoId,
          comment: "",
          likes: 0,
          dislikes: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };
    
      handleSubmit = (event) => {
        event.preventDefault();

        const { comment } = this.state
     
        if (!comment || (comment && comment.trim() === '')) {
            alert('Cannot submit an empty comment.')
            return false
        }

        const newComment = {
          video_ID: this.props.videoId,
          comment: comment,
          likes: 0,
          dislikes: 0,
        };
        this.props.addComment(newComment);
        this.setState(
          {
            comment: '',
          },
        );
      };

      
    
      render() {
        return (
          <React.Fragment>
            <div className="CommentButton" >
              <form onSubmit={this.handleSubmit}>
                <input
                  id="comment_form text"
                  type="text"
                  name="comment"
                  placeholder="Write a Comment"
                  onChange={this.handleChange}
                  value={this.state.comment}
                />
                <button type="submit">Submit Comment</button>
              </form>
            </div>
          </React.Fragment>
        );
      }
    }


export default CommentForm;