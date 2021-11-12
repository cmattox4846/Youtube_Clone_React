import React from 'react';
import img from "./no-thumbnail.jpg";


const RelatedVideoThumbNails = (props) => {
   
    
    

    return (

        <div>
            
            <h5> Recommended Videos</h5>
            
             {props.related_videos.map(video =><div onClick={()=>props.setVideoId(video.id.videoId)} className="align-bottom">{console.log(video)}{video.snippet !== undefined ?
          <img src={video.snippet.thumbnails.default.url} alt="images"/>: null }</div>)}
            
            
        </div>
      );
}
 
export default RelatedVideoThumbNails;