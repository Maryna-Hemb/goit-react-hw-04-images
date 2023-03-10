import { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout.styled';
import { Toaster } from 'react-hot-toast';

import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';

export const App = () => {
  const [queryName, setQueryName] = useState('');

  const changeQueryName = ({ queryName }) => {
    setQueryName(queryName);
  };

  return (
    <Layout>
      <Searchbar onAddnewQueryName={changeQueryName}></Searchbar>
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
};
