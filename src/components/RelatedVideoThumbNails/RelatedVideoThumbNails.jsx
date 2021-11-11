import React from 'react';


const RelatedVideoThumbNails = (props) => {
   
    // function filterVideos(props)
    // {
    //     let filteredVideos = props.related_videos.map.filter(function(video)
    //         {
    //             if (video.snippet.thumbnails !== null)
    //                 {
    //                     return true;
    //                 }
    //         })
        
    // }

    

    return (

        <div>
             {props.related_videos.map(video =><div onClick={()=>props.setVideoId(video.id.videoId)} className="align-bottom">{console.log(video)}{video.snippet !== undefined ?
            <img src={video.snippet.thumbnails.default.url} alt="images"/>: <h2>No Thumbnail Available</h2>}</div>)}
              
            
        </div>
      );
}
 
export default RelatedVideoThumbNails;