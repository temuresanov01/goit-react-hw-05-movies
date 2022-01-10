import { useState, useEffect } from 'react';
import { fetchMovieReviews } from '../services/MoviesSearch-api';
import PropTypes from 'prop-types';
import s from './MovieReviewsView.module.css';

export default function MovieReviewesView({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(data => setReviews(data.results));
  }, [movieId]);

  return (
    <>
      {reviews.length > 0 ? (
        <ul className={s.reviews}>
          {reviews.map(review => (
            <li key={review.id} className={s.review}>
              <h3 className={s.reviewInfo}>Author: {review.author}</h3>
              <p className={s.reviewInfo}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.noReviewInfo}>
          We don't have any reviews for this movie
        </p>
      )}
    </>
  );
}

MovieReviewesView.propTypes = {
  movieId: PropTypes.string,
};
