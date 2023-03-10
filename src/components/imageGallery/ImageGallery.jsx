import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import { List, ListItem } from './ImageGallery.styled';
import { FeatchImages } from '../../servises/ApiRequest';
import { Button } from '../button/Button';
import { Loader } from '../loader/Loader';

const controller = new AbortController();

export class ImageGallery extends Component {
  state = {
    searchImages: [],
    page: 1,
    per_page: 20,
    status: 'idle',
    showLoadMore: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, per_page } = this.state;

    const prevName = prevProps.queryName.trim();
    const nextName = this.props.queryName.trim();

    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });
      this.setState({ page: 1 });

      try {
        const galleryMake = await FeatchImages(nextName, page, per_page);
        this.setState({ searchImages: galleryMake.hits, status: 'resolved' });

        if (galleryMake.hits.length === 0 || nextName === '') {
          toast.error(
            'There are no such images. Please enter a valid image title...'
          );
          this.setState({ status: 'idle' });
        }
        if (Math.ceil(galleryMake.totalHits / per_page) > page) {
          this.setState({
            showLoadMore: true,
          });
        } else {
          this.setState({
            showLoadMore: false,
          });
        }
        controller.abort();
      } catch (error) {
        console.log(error);
      }
    }

    if (newPage !== '' && prevPage !== newPage) {
      // this.setState({ status: 'pending' });
      try {
        const galleryMake = await FeatchImages(nextName, page, per_page);
        this.setState(prevState => ({
          searchImages: [...prevState.searchImages, ...galleryMake.hits],
          status: 'resolved',
        }));

        if (Math.ceil(galleryMake.totalHits / per_page) > page) {
          this.setState({
            showLoadMore: true,
          });
        } else {
          this.setState({
            showLoadMore: false,
          });
        }
        controller.abort();
      } catch (error) {
        console.log(error);
      }
    }
  }

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { status, searchImages, showLoadMore } = this.state;
    return (
      <>
        {status === 'idle' && (
          <h2 className="">
            This field is waiting for the images you will search for...
          </h2>
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
            <Button onClick={this.loadMore} />
          ) : (
            <h2>These are all the images we found...</h2>
          ))}
      </>
    );
  }
}

ImageGallery.propTypes = {
  queryName: PropTypes.string.isRequired,
};
