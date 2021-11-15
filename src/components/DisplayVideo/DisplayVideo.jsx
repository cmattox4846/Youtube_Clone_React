import React, { Component } from "react";

class DisplayVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return (
      
        <div>
            
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
            <h5>{this.props.video.snippet.title}</h5>
            {console.log('this is the title')}
            {console.log(this.props.video.snippet.title)} 
            <p>{this.props.video.snippet.description}</p>
            {console.log('this is the description')}
            {console.log(this.props.video.snippet.description)}
            
        </div>
      
    );
  }
}

export default DisplayVideo;