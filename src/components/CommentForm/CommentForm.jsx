import React, { Component } from "react";

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
        const comment = {
          videoId: this.props.videoId,
          comment: this.state.comment,
          likes: 0,
          dislikes: 0,
        };
        this.props.addComment(comment);
        this.setState(
          {
            comment: this.state.comment,
          },
        );
      };
    
      render() {
        return (
          <React.Fragment>
            <div>
              <form onSubmit={this.handleSubmit}>
                <input
                  id="comment_form text"
                  type="text"
                  name="comment"
                  placeholder="Write a comment on this video"
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