import { useEffect, useState } from "react";
import Movie from "../components/Movie";

function Home() {
  const [loading, setLoading] = useState("true");
  const [movies, setMovies] = useState([]);

  const getMovie = async function () {
    const res = await fetch(
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year"
    );
    if (!res) {
      throw new Error("fetch 못받았어요");
    }
    const data = await res.json();
    console.log(data.data.movies);
    setMovies(data.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className="App">
      <h1>하하호호 영화마당</h1>
      {loading ? (
        <h2>Now Loading...</h2>
      ) : (
        movies.map((movie) => (
          <Movie
            id={movie.id}
            key={movie.id}
            coverImg={movie.medium_cover_image}
            genres={movie.genres}
            title={movie.title}
            summary={movie.summary}
          ></Movie>
        ))
      )}
    </div>
  );
}

export default Home;
