import { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from './ImageGalleryItem.styled';
import { Modal } from '../modal/Modal';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Image
        onClick={() => {
          setShowModal(true);
        }}
        src={webformatURL}
        alt={tags}
      />
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
          }}
        >
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
