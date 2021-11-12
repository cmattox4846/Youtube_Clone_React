import React from 'react';



const RelatedVideoThumbNails = (props) => {
   
    
    

    return (

        <div>
            
            <h5> Recommended Videos</h5>
            
             {props.related_videos.map(video =><div onClick={()=>props.setVideoId(video)} className="align-bottom">{console.log(video)}{video.snippet !== undefined ?
                 <div><img src={video.snippet.thumbnails.default.url} alt="images"/><div>{video.snippet.title}</div></div>: null }</div>)}

            

            
            
        </div>
      );
}
 
export default RelatedVideoThumbNails;