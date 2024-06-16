import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignIn from "./account/signIn";
import SignUp from "./account/signUp";
import User from "./account/user";

import { app } from "./config/firebase-config";

import { UserContext } from "./context/userContext";
import { ReviewerContext } from "./context/reviewerContext";
import { ReviewContext } from "./context/reviewContext";

import Footer from "./footer/footer";
import Header from "./header/Header";

import HomePage from "./home/HomePage";

import ReviewPage from "./pages/ReviewPage";
import PageNotFound from "./utils/NotFound";

function App() {
  const [user, setUser] = useState(null);
  const [reviewer, setReviewer] = useState(null);
  const [reviewId, setReviewId] = useState(null);

  const auth = getAuth(app);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {})
      .catch((error) => {
        console.error("Error setting session persistence:", error);
      });
  }, [auth]);

  return (
    <Router>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <ReviewerContext.Provider value={{ reviewer, setReviewer }}>
          <ReviewContext.Provider value={{ reviewId, setReviewId }}>
            <Header />
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/signin" element={<SignIn />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/user" element={<User />} />s
              <Route exact path="/review" element={<ReviewPage />} />
              <Route exact path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </ReviewContext.Provider>
        </ReviewerContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
