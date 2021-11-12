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
            {console.log('this is the title')}
            {console.log(this.props.video.snippet.title)} 
            <h4>{this.props.video.snippet.description}</h4>
            {console.log('this is the description')}
            {console.log(this.props.video.snippet.description)}
              <iframe
                id="ytplayer"
                type="text/html"
                width="640"
                height="360"
                title="YouTube Video"
                src={"https://www.youtube.com/embed/" + this.props.video.id.videoId}
                frameBorder="0"
            >

            </iframe>
            
        </div>
      
    );
  }
}

export default DisplayVideo;