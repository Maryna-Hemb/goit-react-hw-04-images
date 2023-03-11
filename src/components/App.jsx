import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout.styled';
import { Toaster, toast } from 'react-hot-toast';

import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { FeatchImages } from '../servises/ApiRequest';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';

export const App = () => {
  const [queryName, setQueryName] = useState('');
  const [searchImages, setSearchImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showLoadMore, setShowLoadMore] = useState(false);
  const perPage = 20;

  useEffect(() => {
    if (!queryName) {
      return;
    }
    setStatus('pending');
    async function FeatchDataImages() {
      try {
        const galleryMake = await FeatchImages(queryName, page, perPage);
        setStatus('resolved');
        setSearchImages(prev => [...prev, ...galleryMake.hits]);
        if (galleryMake.hits.length === 0 || queryName === '') {
          toast.error(
            'There are no such images. Please enter a valid image title...'
          );
          setStatus('idle');
        }
        if (Math.ceil(galleryMake.totalHits / perPage) > page) {
          setShowLoadMore(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    FeatchDataImages();
  }, [queryName, page, perPage]);

  const loadMore = () => {
    setPage(page => page + 1);
  };

  const changeQueryName = ({ queryName }) => {
    setQueryName(queryName);
    setSearchImages([]);
    setPage(1);
  };

  return (
    <Layout>
      <Searchbar onAddnewQueryName={changeQueryName}></Searchbar>
      {status === 'idle' && (
        <h2>This field is waiting for the images you will search for...</h2>
      )}
      {status === 'pending' && <Loader />}
      {status === 'resolved' && <ImageGallery searchImages={searchImages} />}
      {status === 'resolved' &&
        (showLoadMore ? (
          <Button onClick={loadMore} />
        ) : (
          <h2>These are all the images we found...</h2>
        ))}
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
