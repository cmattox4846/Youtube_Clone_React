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
      videoInfo: [
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
      ],
      related_videos: [],
      videoId: 'V65uAHzofbg',
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
      videoInfo: response.data.items,
    });
    console.log(this.state.videoInfo);
    this.SearchForRealatedVideo(response.data.items[0].id.videoId);
    this.getAllComments(response.data.items[0].id.videoId);
  };

  SearchForRealatedVideo = async (videoId) => {
    let response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&part=snippet&type=video&key=${googleAPIKey}`
    );
    console.log(videoId + " videoId");
    console.log(response.data.items.snippet + " this is the snippet");
    this.setState({
      related_videos: response.data.items,
    });
  };

  setVideoId = (videoId) => {
    this.setState({
      videoId: videoId,
    });
  };

  async getAllComments() {
    const { videoId } = this.state;
    const response = await axios.get(`http://127.0.0.1:8000/comment/`);
    const comments = response.data.filter((comment) => comment.video_ID === videoId);
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

      if (videoId !== prevState.videoId) {
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
        <div className="container-fluid ">
          <nav class="navbar navbar-expand-lg sidebar1">
            <div class="container bd-highlight">
              <div className="row">
                <span class="navbar-brand mb-0 h1">Youtube Clone</span>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavAltMarkup"
                  aria-controls="navbarNavAltMarkup"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon">My Button</span>
                </button>
                <div class="navbar-nav">
                  <span class="navbar-brand mb-0 h1">
                    <SearchBar
                      search_term={this.SearchForVideo}
                      related_videos={this.SearchForRealatedVideo}
                    />
                  </span>
                </div>
              </div>
            </div>
          </nav>
          <div className="container-fluid w-200">
            <div className="row">
              <div className="col-md-7 border1">
                {this.state.videoId && (
                  <div>
                    <DisplayVideo
                      videoID={this.state.videoId}
                      video={this.state.videoInfo[0]}
                    />
                  </div>
                )}
              </div>
              <div className="col sidebar1">
                {this.state.videoId && (
                  <div className="align=center">
                    {this.state.related_videos.length > 0 && (
                      <RelatedVideoThumbnails
                        related_videos={this.state.related_videos}
                        setVideoId={this.setVideoId}
                      />
                    )}
                  </div>
                )}
              </div>
              <CommentForm
                videoId={this.state.videoId}
                addComment={this.addComment}
              />
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
      </div>
    );
  }
}

export default App;
