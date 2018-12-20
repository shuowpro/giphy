import React, { Component } from 'react';
import ImageFlow from './ImageFlow';
import axios from 'axios';
import { debounce } from 'lodash';
import './App.css';

class App extends Component {
  state = {
    searchText: '',
    imageAddrs: [],
  }

  componentWillUnmount() {
    this.handleFetchImages.cancel();
  }

  handleUpdateSearchText = event => {
    const searchText = event.target.value;
    this.setState({
      searchText,
    });
    this.handleFetchImages(searchText);
  }

  handleFetchImages = debounce(async searchText => {
    const res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=YWvK8etOQgpDuzevIRng2Np91aSn38PF&q=${searchText}`);
    const addrs = res.data.data.map(({ images }) => images.original.url);
    this.setState({ imageAddrs: addrs });
  }, 1000)
  
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
