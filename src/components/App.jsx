import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout.styled';
import { Toaster } from 'react-hot-toast';

import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';

export class App extends Component {
  state = {
    queryName: '',
  };

  changeQueryName = queryName => {
    this.setState(queryName);
  };

  render() {
    const { queryName } = this.state;

    return (
      <Layout>
        <Searchbar onAddnewQueryName={this.changeQueryName}></Searchbar>
        <ImageGallery queryName={queryName} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
          }}
        />
        <GlobalStyle />
      </Layout>
    );
  }
}
