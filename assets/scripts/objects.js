"use strict";
const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];

const renderMovies = (filter = "") => {
  const movieList = document.getElementById("movie-list");

  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible");
  }
  movieList.innerHTML = "";

  const filteredMovies = !filter
    ? movies
    : movies.filter((myMovie) => myMovie.info.title.includes(filter));

  /*  for (const myMovie of movies) {
      const movieElement = document.createElement('li');
      movieElement.textContent = myMovie.info.title;
      movieList.appendChild(movieElement);
  }*/
  filteredMovies.forEach((myMovie) => {
    const movieElement = document.createElement("li");
    const { info, ...otherProps } = myMovie;
    console.log(otherProps);
    let { formattedTitle } = myMovie;
    //formattedTitle = formattedTitle.bind(myMovie);
    //let text = formattedTitle.call(myMovie) + " - ";
    let text = formattedTitle.apply(myMovie) + " - ";
    for (const key in info) {
      if (key !== "title" && key !== "_title") {
        text = text + `${key}: ${info[key]}`;
      }
    }
    movieElement.textContent = text;
    movieList.appendChild(movieElement);
  });
};
const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (
    /*title.trim() === "" ||*/
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    return;
  }

  const newMovie = {
    info: {
      set title(val) {
        if (val.trim() === "") {
          this._title = "DEFAULT";
          return;
        }
        this._title = val;
      },
      get title() {
        return this._title;
      },
      [extraName]: extraValue,
    },
    id: Math.random(),
    formattedTitle() {
      return this.info.title.toUpperCase();
    },
  };
  newMovie.info.title = title;
    movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};

searchBtn.addEventListener("click", searchMovieHandler);

addMovieBtn.addEventListener("click", addMovieHandler);
