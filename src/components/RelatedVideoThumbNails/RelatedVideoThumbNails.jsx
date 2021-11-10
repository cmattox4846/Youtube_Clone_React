import React from 'react';


const RelatedVideoThumbNails = (props) => {
    return (

       
           
        
        <div>
             {props.thumbnails.map(video =><div onClick={()=>props.setVideoId(props.id.videoId)} className="align-bottom"><img src={props.thumbnails} alt="Thumbnail"/></div> )}
            
        </div>
      );
}
 
export default RelatedVideoThumbNails;