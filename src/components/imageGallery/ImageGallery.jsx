import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import { List, ListItem } from './ImageGallery.styled';
import { FeatchImages } from '../../servises/ApiRequest';
import { Button } from '../button/Button';
import { Loader } from '../loader/Loader';

export const ImageGallery = ({ queryName }) => {
  const [searchImages, setSearchImages] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 20;
  const [status, setStatus] = useState('idle');
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (queryName) {
      setPage(1);
      setStatus('pending');
      async function FeatchDataImages() {
        try {
          console.log('перший запит');
          const galleryMake = await FeatchImages(queryName, 1, perPage);
          setSearchImages(galleryMake.hits);
          setStatus('resolved');
          if (galleryMake.hits.length === 0 || queryName === '') {
            toast.error(
              'There are no such images. Please enter a valid image title...'
            );
            setStatus('idle');
          }
          if (Math.ceil(galleryMake.totalHits / perPage) > perPage) {
            setShowLoadMore(true);
          }
        } catch (error) {}
      }
      FeatchDataImages();
    }
  }, [queryName, perPage]);

  useEffect(() => {
    if (queryName.length === 0 || page === 1) {
      console.log('умова на повернення, якщо сторінка перша');
      return;
    } else {
      if (page > 1) {
        setStatus('pending');
        async function FeatchDataImages() {
          try {
            console.log(queryName);
            console.log(page);
            console.log('всі окрім першої сторінки запит');
            const galleryMake = await FeatchImages(queryName, page, perPage);
            setSearchImages(prev => [...prev, ...galleryMake.hits]);

            setStatus('resolved');
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
      }
      return;
    }
  }, [queryName, page, perPage]);

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      {status === 'idle' && (
        <h2>This field is waiting for the images you will search for...</h2>
      )}

      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <List className="gallery">
          {searchImages.map(({ id, largeImageURL, webformatURL, tags }) => (
            <ListItem key={id}>
              <ImageGalleryItem
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            </ListItem>
          ))}
        </List>
      )}
      {status === 'resolved' &&
        (showLoadMore ? (
          <Button onClick={loadMore} />
        ) : (
          <h2>These are all the images we found...</h2>
        ))}
    </>
  );
};

ImageGallery.propTypes = {
  queryName: PropTypes.string.isRequired,
};
