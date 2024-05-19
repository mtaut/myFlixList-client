import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Tetris",
      image:
        "https://www.imdb.com/title/tt12758060/mediaviewer/rm1597778433/?ref_=ttmi_mi_all_2",
      director: "Jon Baird",
      genre: "Drama",
      description:
        "Henk Rogers discovers Tetris in 1988 and then risks everything by travelling to the Soviet Union, where he joins forces with inventor Alexey Pajitnov to bring the game to the masses.",
    },
    {
      id: 2,
      title: "Batman Begins",
      image:
        "https://en.wikipedia.org/wiki/Batman_Begins#/media/File:Batman_Begins_Poster.jpg",
      director: "Christopher Nolan",
      genre: "Action",
      description:
        "After witnessing his parents death, Bruce Wayne learns the art of fighting to confront injustice. When he returns to Gotham as Batman, he must stop a secret society that intends to destroy the city.",
    },
    {
      id: 3,
      title: "The Departed",
      image:
        "https://en.wikipedia.org/wiki/The_Departed#/media/File:Departed234.jpg",
      director: "Martin Scorsese",
      genre: "Drama",
      description:
        "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
