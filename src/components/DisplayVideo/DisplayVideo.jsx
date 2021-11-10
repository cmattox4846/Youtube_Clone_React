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
                src={"https://www.youtube.com/embed/" + this.props.videoID}
                frameBorder="0"
            >

            </iframe>
            
        </div>
      
    );
  }
}

export default DisplayVideo;