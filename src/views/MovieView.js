import { useState, useEffect, Suspense, lazy } from 'react';
import {
  useParams,
  Route,
  Link,
  useLocation,
  useHistory,
  useRouteMatch,
  Switch,
} from 'react-router-dom';
import { fetchMovie, IMAGE_URL } from '../services/MoviesSearch-api';
import s from './MovieView.module.css';

const MovieCastView = lazy(() =>
  import('./MovieCastView.js' /* webpackChunkName: "MovieCastView"*/),
);
const MovieReviewsView = lazy(() =>
  import('./MovieReviewsView.js' /* webpackChunkName: "MovieReviewsView"*/),
);

export default function MovieView() {
  const history = useHistory();
  const location = useLocation();
  const { url, path } = useRouteMatch();

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovie(movieId).then(data => setMovie(data));
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/movies');
    // history.goBack();
  };

  return (
    <>
      {movie && (
        <>
          <button type="submit" className={s.backButton} onClick={onGoBack}>
            &#8592; Go back
          </button>
          <div className={s.movie}>
            <img
              className={s.image}
              src={`${IMAGE_URL}${movie.poster_path}`}
              alt={movie.original_title}
            />

            <div className={s.info}>
              <h2>{movie.original_title}</h2>
              <p>User score: {movie.vote_average}</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h4>Genres</h4>
              {movie.genres &&
                movie.genres.map(genre => (
                  <span key={genre.id}>{genre.name} </span>
                ))}
            </div>
          </div>
        </>
      )}
      <hr />

      <p className={s.title}>Additional information</p>

      <Link
        to={{
          pathname: `${url}/cast`,
          state: { from: location?.state?.from },
        }}
        exact="true"
        className={s.link}
        activeclassname={s.activeLink}
      >
        Cast
      </Link>
      <br></br>
      <Link
        to={{
          pathname: `${url}/reviews`,
          state: { from: location?.state?.from },
        }}
        exact="true"
        className={s.link}
        activeclassname={s.activeLink}
      >
        Reviews
      </Link>

      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path={`${path}/cast`}>
            <MovieCastView movieId={movieId} />
          </Route>
          <Route path={`${path}/reviews`}>
            <MovieReviewsView movieId={movieId} />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
