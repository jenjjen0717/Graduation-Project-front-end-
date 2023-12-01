import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./styles/style.css";
import NavComponent from "./components/nav-component";
import FooterComponent from "./components/footer-component";
import SignUpComponent from "./pages/signUp";
import IntroComponent from "./pages/intro";
import HomeComponent from "./pages/home";
import ManualInputComponent from "./pages/manualInput";
import IsbnComponent from "./pages/isbn";
import BookNoteComponent from "./pages/bookNote";
import AuthService from "./services/auth.service";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  let [bookData, setBookData] = useState(null);

  return (
    <div>
      <NavComponent
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        bookData={bookData}
        setBookData={setBookData}
      />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <IntroComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/signUp"
          exact
          element={
            <SignUpComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/home"
          exact
          element={
            <HomeComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              bookData={bookData}
              setBookData={setBookData}
            />
          }
        />
        <Route
          path="/inputBookData"
          exact
          element={
            <ManualInputComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/isbnData"
          exact
          element={
            <IsbnComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/bookNote"
          exact
          element={
            <BookNoteComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
