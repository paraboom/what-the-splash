import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadImages } from '../../actions';

import './styles.css';

import Button from '../Button';
import Stats from '../Stats';

export default () => {
  const dispatch = useDispatch();

  const images = useSelector(state => state.images);
  const error = useSelector(state => state.error);
  const isLoading = useSelector(state => state.isLoading);
  const imageStats = useSelector(state => state.imageStats);

  useEffect(() => {
    dispatch(loadImages());
  }, []);

  return (
    <div className="content">
      <section className="grid">
        {images.map(image => (
          <div
            key={image.id}
            className={`item item-${Math.ceil(image.height / image.width)}`}
          >
            <Stats stats={imageStats[image.id]} />
            <img src={image.urls.small} alt={image.user.username} />
          </div>
        ))}
        {error && <div className="error">{error}</div>}
      </section>
      <Button onClick={() => !isLoading && dispatch(loadImages())} loading={isLoading}>
        Load More
      </Button>
    </div>
  );
};
