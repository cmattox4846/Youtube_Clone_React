import React, { Component } from 'react';
import DisplayVideo from './DisplayVideo/DisplayVideo';
import {googleAPIKey} from './keys'
import axios from "axios";
import SearchBar from './SearchBar/SearchBar';
import CommentForm from './CommentForm/CommentForm';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            related_videos:[],
            comment: [],
            filteredComments: [],
        };
    }

  
    SearchForVideo = async (search_term) => {
        
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${search_term}&key=${googleAPIKey}`)
        console.log(response.data)
        this.setState({
            videos:response.data.items
        })
        
    }
    SearchForRealatedVideo = async (videoID) => {
        
        let response = await axios.get('https://www.googleapis.com/youtube/v3/search?relatedToVideoId='+{videoID}+'&type=video&key='+{googleAPIKey})
        console.log(response.data)
        this.setState({
            related_videos:response.data.items
        })
        
    }


 




    render() {
        return (
           
            <div>
                
                <SearchBar search_term={this.SearchForVideo}/>
                {this.state.videos.length > 0?
                <DisplayVideo videoID = {this.state.videos[0].id.videoId}/>
                :null}
                <CommentForm />

        
             </div>
        );

        }
    }


export default App;