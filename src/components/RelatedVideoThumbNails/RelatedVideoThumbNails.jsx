import React from 'react';


const RelatedVideoThumbNails = (props) => {
    return (

        <div>
             {props.thumbnails.map(video =><div onClick={()=>props.setVideoId(video.id.videoId)} className="align-bottom">{console.log(video.snippet)}<img src={video.snippet.thumbnails.default.url} alt="Thumbnail"/></div>)}
            
        </div>
      );
}
 
export default RelatedVideoThumbNails;