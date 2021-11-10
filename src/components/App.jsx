import React, { Component } from 'react';
import DisplayVideo from './DisplayVideo/DisplayVideo';
import {googleAPIKey} from './keys'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }



    render() {
        return (
            <div>
                <h1> TEST </h1>
                <DisplayVideo videoID={this.state.videos[0].videoId} />

                
            </div>
        )

    }
}

export default App;