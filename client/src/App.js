import Navbar from "./components/Navbar/Navbar";
import HomePage from "./views/HomePage/HomePage";
import { Switch, Route } from "react-router-dom";
import SearchPage from "./views/SearchPage/SearchPage";
import MovieDetailsPage from "./views/MovieDetailsPage/MovieDetailsPage";
import AuthPage from "./views/AuthPage/AuthPage";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/auth">
          <AuthPage />
        </Route>
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
