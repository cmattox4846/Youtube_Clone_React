import React, { Component } from 'react';
import DisplayVideo from './DisplayVideo/DisplayVideo';
import {googleAPIKey} from './keys'
import axios from "axios";
import SearchBar from './SearchBar/SearchBar';
import CommentForm from './CommentForm/CommentForm';
import "./App.css"

import RelatedVideoThumbnails from './RelatedVideoThumbNails/RelatedVideoThumbNails';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            videoInfo: [ {
                "kind": "youtube#searchResult",
                "etag": "Sl5BVy1g0I5gFwLVuJDwRS_8RrM",
                "id": {
                    "kind": "youtube#video",
                    "videoId": "Kp3-pXoDoIw"
                },
                "snippet": {
                    "publishedAt": "2019-01-15T19:37:23Z",
                    "channelId": "UCKdALw0BErtqmGI2AUtbbhg",
                    "title": "devCodeCamp shaking up traditional 4-year degree",
                    "description": "A new Milwaukee boot camp called devCodeCamp is shaking up the traditional four-year college degree.",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/Kp3-pXoDoIw/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/Kp3-pXoDoIw/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/Kp3-pXoDoIw/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "TMJ4 News",
                    "liveBroadcastContent": "none",
                    "publishTime": "2019-01-15T19:37:23Z"
                }
            },
            ],
            related_videos:[],
            videoId: 'Kp3-pXoDoIw',
            
        };

        
    }

  
    SearchForVideo = async (search_term) => {
        
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${search_term}&part=snippet&key=${googleAPIKey}`)
        
        this.setState({
            videoId: response.data.items[0].id.videoId,
            videoInfo:response.data.items
        })
        console.log(this.state.videoInfo)
       this.SearchForRealatedVideo(response.data.items[0].id.videoId);
        
    }
    SearchForRealatedVideo = async (videoId) => {
        
        let response = await axios.get( `https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&part=snippet&type=video&key=${googleAPIKey}`)
        console.log(videoId +' videoId')
        console.log(response.data.items.snippet +" this is the snippet")
        this.setState({
            related_videos:response.data.items
        })
        
    }

   


    setVideoId = (videoId) => {

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
           
            
                <div className="container-fluid " >
                <nav class="navbar navbar-expand-lg  sidebar1">
                    <div class=" container  bd-highlight">
                    <div className="row ">
                        <span class="navbar-brand mb-0 h1">Youtube Clone</span>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            </div>
                            <div class="navbar-nav  ">
                            <span class="navbar-brand mb-0 h1">
                            <SearchBar search_term={this.SearchForVideo} related_videos={this.SearchForRealatedVideo} />
                            
                            </span>
                            </div>
                            </div>
                        </div>
                </nav>
                
                {this.state.videoId  &&
                    <div>
                        <DisplayVideo videoID = {this.state.videoId} video={this.state.videoInfo[0]}/>
                        {this.state.related_videos.length > 0 &&
                            <RelatedVideoThumbnails  related_videos={this.state.related_videos} setVideoId={this.setVideoId} />
                        }
                        
                    </div>
                }
               <CommentForm videoId={this.state.videoId} addComment={this.addComment} />
               
             </div>
        );

        }
    }


export default App;