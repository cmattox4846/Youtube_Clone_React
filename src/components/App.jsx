import React, { Component } from "react";
import DisplayVideo from "./DisplayVideo/DisplayVideo";
import { googleAPIKey } from "./keys";
import axios from "axios";
import SearchBar from "./SearchBar/SearchBar";
import CommentForm from "./CommentForm/CommentForm";
import CommentsList from "./CommentsList/CommentsList";
import "./App.css";
import RelatedVideoThumbnails from "./RelatedVideoThumbNails/RelatedVideoThumbNails";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      videoIndex: 0,
      videoInfo: 
        {
          kind: "youtube#searchResult",
          etag: "Sl5BVy1g0I5gFwLVuJDwRS_8RrM",
          id: {
            kind: "youtube#video",
            videoId: "Kp3-pXoDoIw",
          },
          snippet: {
            publishedAt: "2019-01-15T19:37:23Z",
            channelId: "UCKdALw0BErtqmGI2AUtbbhg",
            title: "devCodeCamp shaking up traditional 4-year degree",
            description:
              "A new Milwaukee boot camp called devCodeCamp is shaking up the traditional four-year college degree.",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/Kp3-pXoDoIw/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/Kp3-pXoDoIw/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/Kp3-pXoDoIw/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "TMJ4 News",
            liveBroadcastContent: "none",
            publishTime: "2019-01-15T19:37:23Z",
          },
        },
      
      related_videos: [],
      videoId:"Kp3-pXoDoIw",
      filteredComments: [],
      replies: [],
    };

    this.addComment = this.addComment.bind(this);
    this.getAllReplies = this.getAllReplies.bind(this);
  }

  SearchForVideo = async (search_term) => {
    let response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${search_term}&part=snippet&key=${googleAPIKey}`
    );

    this.setState({
      videoId: response.data.items[0].id.videoId,
      videoInfo: response.data.items[0],
    });
    
    this.SearchForRealatedVideo(response.data.items[0].id.videoId);
    this.getAllComments(response.data.items[0].id.videoId);
  };

  SearchForRealatedVideo = async (videoId) => {
    let response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&part=snippet&type=video&key=${googleAPIKey}`
    );
    console.log(videoId + " videoId");
    console.log(response.data.items + " ****** This in related videos");
    this.setState({
      related_videos: response.data.items,
    });
  };

  


  setVideo = (video) => {
      console.log(video)
      this.setState({
        videoInfo:video
      })
    
  };

  async getAllComments() {
    //const { videoId } = this.state;
    const response = await axios.get(`http://127.0.0.1:8000/comment/`);
    const comments = response.data.filter((comment) => comment.video_ID === this.state.videoInfo.id.videoId);
    this.setState({
      comments: comments,
    });
  }

  componentDidMount() {
    this.getAllComments();
    this.getAllReplies();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      const {videoId} = this.state

      if (videoId !== prevState.videoInfo.id.videoId) {
        this.getAllComments();
        this.getAllReplies();
      }
  }

  async addComment(comment) {
    const newComment = await axios.post(`http://127.0.0.1:8000/comment/`, comment);
    this.setState({
      comments: [...this.state.comments, newComment.data],
    });
  };

  addLike = (id) => {
    console.log(id);
    axios.put(`http://127.0.0.1:8000/comment/${id}/like/`);
    this.getAllComments();
  };

  addDislike = (id) => {
    axios.put(`http://127.0.0.1:8000/comment/${id}/dislike/`);
    this.getAllComments();
  };

  async getAllReplies() {
    let response = await axios.get(`http://127.0.0.1:8000/reply/`)
    this.setState({
        replies: response.data,
    });
  }

  render() {
    return (
      <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a href="#" class="navbar-brand">Youtube Clone</a>
                    <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        
                        <div class="navbar-nav ms-auto">
                        <SearchBar
                                  search_term={this.SearchForVideo}
                                  related_videos={this.SearchForRealatedVideo}
                                />
                        </div>
                    </div>
                </div>
            </nav>
                  
          <div className="container-fluid w-200">
            <div className="row">
              <div className="col sidebar1 w-auto p-3 d-flex align-items-basline">
              <CommentForm
                videoId={this.state.videoInfo.id.videoId}
                addComment={this.addComment}
              />
              </div>
              <div className="col-md-7 text-center ">
                {this.state.videoInfo.id.videoId.length > 0  && (
                  <div className="mainVideo">
                    <DisplayVideo
                     
                      video={this.state.videoInfo}
                    />
                  </div>
                )}
              </div>
              <div className="col sidebar1">
                {this.state.videoInfo.id.videoId && (
                  <div className="align=center">
                    {this.state.related_videos.length > 0 && (
                      <RelatedVideoThumbnails
                        related_videos={this.state.related_videos}
                        setVideoId={this.setVideo}
                      />
                    )}
                  </div>
                )}
              </div>
              
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
          </div>
        </div>
      
    );
  }
}

export default App;
