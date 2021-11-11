import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {         
        search:'',
        
     }
}


handleChange=(event)=>{
    this.setState({
          [event.target.name]:event.target.value,
      });
     

  }

handleSubmit = (event) => {
      event.preventDefault();
      this.props.search_term(this.state.search)
      
  }
    render() { 
        return (
            <div className=" ms-2 me-2">
            <form onSubmit={this.handleSubmit}>

                    
                <label></label>
                <input className=" ms-2 me-2" name='search'  onChange={this.handleChange} value={this.state.search}/>
                
                
                <button type="submit"className="btn btn-primary btn-sm ms-2 me-2">Search For Video</button>


            </form>
    </div> 

          );
    }
}
 
export default SearchBar;
   