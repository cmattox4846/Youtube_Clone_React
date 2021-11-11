import React, { Component } from "react";
import axios from "axios";

class ReplyForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          reply: "",
          
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addReply = this.addReply.bind(this);
      }
    
      handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };
    
      handleSubmit = (event) => {
        event.preventDefault();
        const reply = {
          comment: this.props.id,
          comment_reply: this.state.reply,
          
        };
        this.addReply(reply);
        this.setState(
          {
            reply: '',
          },
        );
      };
    
      addReply = (comment) => {
        axios.post(`http://127.0.0.1:8000/reply/`, comment);
        this.setState({
          reply: [...this.state.reply, comment],
        });
      
        this.props.getAllReplies()
      };

      render() {
        return (
          <React.Fragment>
            <div>
              <form onSubmit={this.handleSubmit}>
                <input
                  id="comment_form text"
                  type="text"
                  name="reply"
                  placeholder="Write a reply"
                  onChange={this.handleChange}
                  value={this.state.reply}
                />
                <button type="submit">Submit Reply</button>
              </form>
            </div>
          </React.Fragment>
        );
      }
    }


export default ReplyForm;