import React, { Component } from 'react';
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
            <SearchBar search_term={this.SearchForVideo}/>
            

            <h1> TEST </h1>
            </div>
        );

        }
    }


export default App;