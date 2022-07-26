import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState("true");
  const [movie, setMovie] = useState([]);

  const getMovie = async function () {
    const res = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    if (!res) {
      throw new Error("fetch 못받았어요");
    }
    const data = await res.json();
    console.log(data.data.movie);
    setMovie(data.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className="App">
      <Link to="/">
        <h1>하하호호 영화마당</h1>
      </Link>
      {loading ? (
        <h2>Now Loading...</h2>
      ) : (
        <div>
          <img src={movie.large_cover_image} alt={movie.title}></img>
          <h1>{movie.title}</h1>

          <p>{movie.description_full}</p>
          <ul>
            {movie.genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
