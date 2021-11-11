import React, { Component } from 'react';
import DisplayVideo from './DisplayVideo/DisplayVideo';
import {googleAPIKey} from './keys'
import axios from "axios";
import SearchBar from './SearchBar/SearchBar';
import CommentForm from './CommentForm/CommentForm';
import CommentsList from './CommentsList/CommentsList';
import './App.css';
import RelatedVideoThumbnails from './RelatedVideoThumbNails/RelatedVideoThumbNails';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            videos: [],
            related_videos:[],
            videoId: 'kshM6NvKutw',
            filteredComments: [],
            replies: [],
            
        };
        this.getAllReplies = this.getAllReplies.bind(this); 
        
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
        console.log(videoId +'videoId')
        console.log(response.data.items.snippet +"this is the snippet")
        this.setState({
            related_videos:response.data.items
        })
        
    }

   


    setVideoId = (videoId) => {

        this.setState({
            videoId:videoId
        })
    }

    async getAllComments() {
        
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
        this.getAllReplies();
        
    }


    addComment = (comment) => {
        console.log(comment);
        console.log(this.state.comments);
        axios.post(`http://127.0.0.1:8000/comment/`, comment);
        this.setState({
          comments: [...this.state.comments, comment],
        });
      };
    
    addLike = (id) => {
        console.log(id)
      axios.put(`http://127.0.0.1:8000/comment/${id}/like/`);
      this.getAllComments();
    };
  
    addDislike = (id) => {
      axios.put(`http://127.0.0.1:8000/comment/${id}/dislike/`);
      this.getAllComments();
    };  

    async getAllReplies(e) {
        await axios.get(`http://127.0.0.1:8000/reply/`).then((response) => {
          this.setState({
           replies: response.data,
          })}
        );
      } 
    


    render() {
        return (
           
            <div className="render">
                
                <SearchBar search_term={this.SearchForVideo} related_videos={this.SearchForRealatedVideo} />
                {this.state.videoId && 
                    <div>
                        <DisplayVideo videoID = {this.state.videoId}/>
                        {this.state.related_videos.length > 0 &&
                            <RelatedVideoThumbnails  related_videos={this.state.related_videos} setVideoId={this.setVideoId} />
                        }
                        
                    </div>
                }
               <CommentForm videoId={this.state.videoId} addComment={this.addComment} />
               <br></br>
               <CommentsList
                comments={this.state.comments} 
                videoId={this.state.videoId} 
                addLike={this.addLike}
                addDislike={this.addDislike}
                replies={this.state.replies}
                getAllReplies={this.getAllReplies}
                /> 
             </div>
        );

        }
    }


export default App;