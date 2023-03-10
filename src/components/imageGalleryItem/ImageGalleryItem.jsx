import { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from './ImageGalleryItem.styled';
import { Modal } from '../modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  render() {
    return (
      <>
        <Image
          onClick={() => {
            this.setState({ showModal: true });
          }}
          src={this.props.webformatURL}
          alt={this.props.tags}
        />
        {this.state.showModal && (
          <Modal
            onClose={() => {
              this.setState({ showModal: false });
            }}
          >
            <img src={this.props.largeImageURL} alt={this.props.tags} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
