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
      
      related_videos: [
        {
          "kind": "youtube#searchResult",
          "etag": "H0uHUXp1O75N-ZOoxmvJp09lntk",
          "id": {
              "kind": "youtube#video",
              "videoId": "pnukQDQdKbc"
          },
          "snippet": {
              "publishedAt": "2021-06-11T16:40:53Z",
              "channelId": "UC-bFgwL_kFKLZA60AiB-CCQ",
              "title": "Watch THIS Before Choosing A Coding Bootcamp",
              "description": "The first 1,000 people to click the link will get a free career coaching session with a Career Karma coach: https://ck.chat/bukola-061321\n\nIn this video, I'll be sharing 5 things to consider before choosing a Coding Bootcamp.\n\nLET'S BE FRIENDS (IG)\nhttps://www.instagram.com/bukola.dev/\n\n► VIDEO RESOURCES\nhttps://insights.stackoverflow.com/survey/2020\nhttps://cirr.org/data\n\n► Music\nhttps://www.epidemicsound.com/referral/t1k1c6/\nhttps://artlist.io/Bukola-1928571\n► Desk Equipment\nhttps://kit.co/TheComeUp/desk-equipment\n► Filming Equipment\nhttps://kit.co/TheComeUp/filming-gear\n► Programming Video\nhttps://kit.co/TheComeUp/programming-books\n\n📒 Timestamps 📒\n0:00 - Intro\n0:40 - Student Outcomes\n2:02 - Get Alumni Reviews\n2:58 - Sponsorship\n4:09 - Check The Curriculum\n5:03 - Understand The Cost\n5:40 - Teachers & Teaching Style\n\nBUSINESS INQUIRIES\nmgmt@bukola.dev",
              "thumbnails": {
                  "default": {
                      "url": "https://i.ytimg.com/vi/pnukQDQdKbc/default.jpg",
                      "width": 120,
                      "height": 90
                  },
                  "medium": {
                      "url": "https://i.ytimg.com/vi/pnukQDQdKbc/mqdefault.jpg",
                      "width": 320,
                      "height": 180
                  },
                  "high": {
                      "url": "https://i.ytimg.com/vi/pnukQDQdKbc/hqdefault.jpg",
                      "width": 480,
                      "height": 360
                  },
                  "standard": {
                      "url": "https://i.ytimg.com/vi/pnukQDQdKbc/sddefault.jpg",
                      "width": 640,
                      "height": 480
                  },
                  "maxres": {
                      "url": "https://i.ytimg.com/vi/pnukQDQdKbc/maxresdefault.jpg",
                      "width": 1280,
                      "height": 720
                  }
              },
              "channelTitle": "Bukola",
              "liveBroadcastContent": "none",
              "publishTime": "2021-06-11T16:40:53Z"
          }
      },
      {
          "kind": "youtube#searchResult",
          "etag": "HhfkOmUcLMUGv_6gQIxuV1JIifQ",
          "id": {
              "kind": "youtube#video",
              "videoId": "fZcYMQG3FBI"
          },
          "snippet": {
              "publishedAt": "2017-09-06T19:01:07Z",
              "channelId": "UCx46mDniih3SxOObkibtQ2w",
              "title": "devCodeCamp",
              "description": "devCodeCamp is Milwaukee's Proven Software Development Bootcamp. We turn beginners into Software Developers in 12 immersive weeks.",
              "thumbnails": {
                  "default": {
                      "url": "https://i.ytimg.com/vi/fZcYMQG3FBI/default.jpg",
                      "width": 120,
                      "height": 90
                  },
                  "medium": {
                      "url": "https://i.ytimg.com/vi/fZcYMQG3FBI/mqdefault.jpg",
                      "width": 320,
                      "height": 180
                  },
                  "high": {
                      "url": "https://i.ytimg.com/vi/fZcYMQG3FBI/hqdefault.jpg",
                      "width": 480,
                      "height": 360
                  },
                  "standard": {
                      "url": "https://i.ytimg.com/vi/fZcYMQG3FBI/sddefault.jpg",
                      "width": 640,
                      "height": 480
                  },
                  "maxres": {
                      "url": "https://i.ytimg.com/vi/fZcYMQG3FBI/maxresdefault.jpg",
                      "width": 1280,
                      "height": 720
                  }
              },
              "channelTitle": "devCodeCamp",
              "liveBroadcastContent": "none",
              "publishTime": "2017-09-06T19:01:07Z"
          }
      },
      {
          "kind": "youtube#searchResult",
          "etag": "Z0rvbZN5BS8Cw5GgkR371Wu7usY",
          "id": {
              "kind": "youtube#video",
              "videoId": "jvaSmi1Dgkc"
          },
          "snippet": {
              "publishedAt": "2020-12-05T08:30:46Z",
              "channelId": "UCAShOI6mAA7bGd47E61-U7g",
              "title": "Why I got fired from my first two jr. developer jobs - Life after a coding bootcamp",
              "description": "Have questions about starting a web design business or questions about a coding bootcamp?\n\nReach out to me through my website! \nhttps://www.joewebbdesigns.com/links\n\n\n📚 Favorite tools for web design: 📚\n*Note: I got an affiliate link for Webflow. Consider using this link if you enjoy their service as much as I do!\n\nWebflow -  https://webflow.grsm.io/ydxtv8c0cloj\nFigma - figma.com\nCanva - canva.com\nDribbble - dribbble.com\n\nSubscribe to my channel! ❤️\nhttps://www.youtube.com/channel/UCAShOI6mAA7bGd47E61-U7g\n\nVideo Description:\n\nThis is essentially part 2 to my video about me getting fired. I had so many ask me WHY. I hope this video clarifies a little bit about my experience.\n\nWatch part 1 here: https://youtu.be/3BhHIK8vcBs\n\nMy only affiliate link:\nBuild better looking websites: https://webflow.grsm.io/ydxtv8c0cloj",
              "thumbnails": {
                  "default": {
                      "url": "https://i.ytimg.com/vi/jvaSmi1Dgkc/default.jpg",
                      "width": 120,
                      "height": 90
                  },
                  "medium": {
                      "url": "https://i.ytimg.com/vi/jvaSmi1Dgkc/mqdefault.jpg",
                      "width": 320,
                      "height": 180
                  },
                  "high": {
                      "url": "https://i.ytimg.com/vi/jvaSmi1Dgkc/hqdefault.jpg",
                      "width": 480,
                      "height": 360
                  },
                  "standard": {
                      "url": "https://i.ytimg.com/vi/jvaSmi1Dgkc/sddefault.jpg",
                      "width": 640,
                      "height": 480
                  },
                  "maxres": {
                      "url": "https://i.ytimg.com/vi/jvaSmi1Dgkc/maxresdefault.jpg",
                      "width": 1280,
                      "height": 720
                  }
              },
              "channelTitle": "Joe Webb",
              "liveBroadcastContent": "none",
              "publishTime": "2020-12-05T08:30:46Z"
          }
      },
      {
          "kind": "youtube#searchResult",
          "etag": "zm_SklZC1Hkt-RdpJ11Y5IrzLHc",
          "id": {
              "kind": "youtube#video",
              "videoId": "LdN8MGn-Irs"
          },
          "snippet": {
              "publishedAt": "2020-12-04T22:34:38Z",
              "channelId": "UC0MuuZyet6I4OPlqHLaEGaA",
              "title": "One Year After Coding Bootcamp | Did I Get A Job?",
              "description": "Hey everyone in this video, I chat up with you about how it's been since I graduated from Fullstack Academy, my journey since then, and what I am up to now! It's been  one year after coding bootcamp and I hope this video gives you insight on what it's like to go through this process, and what you can do to have a better experience then mine.",
              "thumbnails": {
                  "default": {
                      "url": "https://i.ytimg.com/vi/LdN8MGn-Irs/default.jpg",
                      "width": 120,
                      "height": 90
                  },
                  "medium": {
                      "url": "https://i.ytimg.com/vi/LdN8MGn-Irs/mqdefault.jpg",
                      "width": 320,
                      "height": 180
                  },
                  "high": {
                      "url": "https://i.ytimg.com/vi/LdN8MGn-Irs/hqdefault.jpg",
                      "width": 480,
                      "height": 360
                  },
                  "standard": {
                      "url": "https://i.ytimg.com/vi/LdN8MGn-Irs/sddefault.jpg",
                      "width": 640,
                      "height": 480
                  },
                  "maxres": {
                      "url": "https://i.ytimg.com/vi/LdN8MGn-Irs/maxresdefault.jpg",
                      "width": 1280,
                      "height": 720
                  }
              },
              "channelTitle": "KemiNaturally",
              "liveBroadcastContent": "none",
              "publishTime": "2020-12-04T22:34:38Z"
          }
      },
      ],
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
    // const { videoId } = this.state;
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

  componentDidUpdate(prevProps,prevState) {
      

      if (this.state.videoInfo.id.videoId !== prevState.videoInfo.id.videoId) {
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
              <div className="col sidebar1 w-auto p-3 d-flex-align-items-basline">
              <CommentForm
                videoId={this.state.videoInfo.id.videoId}
                addComment={this.addComment}
              />
              </div>
              <div className="col-md-7 text-center">
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
                  <div>
                    {/* {this.state.related_videos.length > 0 && ( */}
                      <RelatedVideoThumbnails
                        related_videos={this.state.related_videos}
                        setVideoId={this.setVideo}
                      />
                    {/* )} */}
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
