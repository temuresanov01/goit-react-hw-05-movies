import { useState, useEffect } from 'react';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import * as moviesFetchAPI from '../services/MoviesSearch-api';
import s from './HomeView.module.css';

export default function HomeView() {
  const { url } = useRouteMatch();
  const location = useLocation();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesFetchAPI.fetchTrendingMovies().then(data => setMovies(data.results));
  }, []);

  return (
    <>
      <h2 className={s.heading}>Trending today</h2>
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id} className={s.item}>
              <NavLink
                className={s.link}
                to={{
                  pathname: `${url}movies/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
