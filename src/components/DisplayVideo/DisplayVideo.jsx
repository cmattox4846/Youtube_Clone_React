import React, { Component } from "react";

class DisplayVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return (
      
        <div>
            <h1>{this.props.video.snippet.title}</h1>
            <h4>{this.props.video.snippet.description}</h4>
              <iframe
                id="ytplayer"
                type="text/html"
                width="640"
                height="360"
                title="YouTube Video"
                src={"https://www.youtube.com/embed/" + this.props.videoID}
                frameBorder="0"
            >

            </iframe>
            
        </div>
      
    );
  }
}

export default DisplayVideo;