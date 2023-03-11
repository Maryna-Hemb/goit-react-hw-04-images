import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import { List, ListItem } from './ImageGallery.styled';

export const ImageGallery = ({ searchImages }) => {
  return (
    <>
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
    </>
  );
};

ImageGallery.propTypes = {
  searchImages: PropTypes.array.isRequired,
};
