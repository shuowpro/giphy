import React, { Component } from 'react';
import logo from './logo.svg';
import ImageFlow from './ImageFlow';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      imageAddrs: [],
    };
    this.timeout = null;
  }

  handleUpdateSearchText = event => {
    this.setState({
      searchText: event.target.value,
    });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(searchText => {
      axios.get(`https://api.giphy.com/v1/gifs/search?api_key=YWvK8etOQgpDuzevIRng2Np91aSn38PF&q=${searchText}`)
      .then(res => res.data.data)
      .then(res => res.map(data => data.images.original.url))
      .then(addr => {
        this.setState({
          imageAddrs: addr,
        });
      });
    }, 1000, event.target.value);
  }
  
  render() {
    const { searchText, imageAddrs } = this.state;
    return (
      <div className="App">
        <input type="text" value={searchText} onChange={this.handleUpdateSearchText}/>
        <ImageFlow imageAddrs={imageAddrs} />
      </div>
    );
  }
}

export default App;
