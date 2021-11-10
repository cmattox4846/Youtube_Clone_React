import React, { Component } from "react";

class DisplayVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return (
      <React.Fragment>
        <div>
            <iframe
                id="ytplayer"
                type="text/html"
                width="640"
                height="360"
                src='https://www.youtube.com/embed/'{props.videoId}
                frameBorder="0"
            ></iframe>
        </div>
      </React.Fragment>
    );
  }
}

export default DisplayVideo;