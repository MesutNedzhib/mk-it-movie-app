import Navbar from "./components/Navbar/Navbar";
import HomePage from "./views/HomePage/HomePage";
import { Switch, Route } from "react-router-dom";
import SearchPage from "./views/SearchPage/SearchPage";
import MovieDetailsPage from "./views/MovieDetailsPage/MovieDetailsPage";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Navbar />
          <HomePage />
        </Route>
        <Route path="/search">
          <Navbar />
          <SearchPage />
        </Route>
        <Route path="/movies/movie-title">
          <Navbar />
          <MovieDetailsPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
