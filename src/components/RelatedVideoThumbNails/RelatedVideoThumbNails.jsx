import React from 'react';
import img from "./no-thumbnail.jpg";


const RelatedVideoThumbNails = (props) => {
   
    
    

    return (

        <div>
            
            <h5> Recommended Videos</h5>
            
             {props.related_videos.map(video =><div onClick={()=>props.setVideoId(video.id.videoId)} className="align-bottom">{console.log(video)}{video.snippet !== undefined ?
          <img src={video.snippet.thumbnails.default.url} alt="images"/>: <img src={img} alt="images" height="90" width ="120" /> }</div>)}
            
            
        </div>
      );
}
 
export default RelatedVideoThumbNails;