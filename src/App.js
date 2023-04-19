import NavigationBar from "./nav";
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import LoginComponent from "./login";
import ProfileComponent from "./profile";
import EditProfileComponent from "./profile/edit-profile";
import PublicProfileComponent from "./profile/public-profile";
import BookDetailsComponent from "./details/book-details";
import authReducer from "./reducers/auth-reducers"
import { configureStore }
    from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import SearchComponent from "./search";
import SearchResultsComponent from "./search/search-results";
import bookReducer from "./services/book-reducer";
const store = configureStore(
    {reducer: {auth: authReducer, books: bookReducer}});


function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
            <NavigationBar/>
            <Routes>
                <Route path="/login" element={<LoginComponent/>}/>
                <Route path="/profile" element={<ProfileComponent/>}/>
                <Route path="/edit-profile" element={<EditProfileComponent/>}/>
                <Route path="/profile/:username" element={<PublicProfileComponent/>}/>
                <Route path="/search" element={<SearchComponent/>}/>
                <Route path="/search/:query" element={<SearchResultsComponent/>}/>
                <Route path="/details/:bid" element={<BookDetailsComponent/>}/>
            </Routes>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
