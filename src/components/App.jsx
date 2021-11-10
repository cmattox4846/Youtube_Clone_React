import React, { Component } from 'react';
import DisplayVideo from './DisplayVideo/DisplayVideo';
import {googleAPIKey} from './keys'
import axios from "axios";
import SearchBar from './SearchBar/SearchBar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: []
        };
    }

  
    SearchForVideo = async (search_term) => {
        
        let response = await axios.get('https://www.googleapis.com/youtube/v3/search?q='+{search_term}+'&key=AIzaSyASgHWeo95jh3pLZ-QrTEq_lx-OZCLXwGQ')
        this.setState({
            songs:response.data
        })
        
    }


    render() {
        return (
            <div>
                <h1> TEST </h1>
                <DisplayVideo videoID={this.state.videos[0].videoId} />
                <SearchBar search_term={this.SearchForVideo}/>
            
            </div>
        );

        }
    }


export default App;