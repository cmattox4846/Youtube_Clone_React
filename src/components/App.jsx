import React, { Component } from 'react';
import DisplayVideo from './DisplayVideo/DisplayVideo';
import {googleAPIKey} from './keys'
import axios from "axios";
import SearchBar from './SearchBar/SearchBar';
import CommentForm from './CommentForm/CommentForm';
import RelatedVideoThumbNails from './RelatedVideoThumbNails/RelatedVideoThumbNails';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            videos: [],
            related_videos:[],
            videoId: 'V65uAHzofbg',
            
        };

        
    }

  
    SearchForVideo = async (search_term) => {
        
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${search_term}&key=${googleAPIKey}`)
        
        this.setState({
            videoId: response.data.items[0].id.videoId
        })
        this.SearchForRealatedVideo(response.data.items[0].id.videoId);
        
    }
    SearchForRealatedVideo = async (videoId) => {
        
        let response = await axios.get( `https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&part=snippet&type=video&key=${googleAPIKey}`)
        console.log(response.data.items)
        this.setState({
            related_videos:response.data.items
        })
        
    }


    selectNewVideo = (videoId) => {

    this.setState({
        videoId:videoId
    })
    }

    async getAllComments(e) {
        
        const {videoId} = this.state
        await axios.get(`http://127.0.0.1:8000/comment/`).then((response) =>{
            
            const comments = response.data.filter(comment => comment.video_ID === videoId)
          this.setState({
            comments: comments,
            
          })}
        );
      }

    
    
    componentDidMount() {
        this.getAllComments();
        
    }


    addComment = (comment) => {
        console.log(comment);
        console.log(this.state.comments);
        axios.post(`http://127.0.0.1:8000/comment/`, comment);
        this.setState({
          comments: [this.state.comments, comment],
        });
      };
    
      

    


    render() {
        return (
           
            <div>
                
                <SearchBar search_term={this.SearchForVideo} related_videos={this.SearchForRealatedVideo} />
                {this.state.videoId &&
                    <div>
                        <DisplayVideo videoID = {this.state.videoId}/>
                        {this.state.related_videos.length > 0 &&
                            <RelatedVideoThumbNails  thumbnails={this.state.related_videos}/>
                        }
                        
                    </div>
                }
               <CommentForm videoId={this.state.videoId} addComment={this.addComment} />
               
             </div>
        );

        }
    }


export default App;