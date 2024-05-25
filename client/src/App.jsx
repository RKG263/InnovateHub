import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import ProtectedRoute from "./Utils/ProtectedRoute";
import Profile from "./Components/Profile";
import Register from "./Components/Auth/Register";
import Home from "./Components/Home/Home";
import NotFound from "./Shared/NotFound";
import SpinningLoader from "./Shared/SpinningLoader";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import SubmitIdea from "./Pages/Users/SubmitIdea";
import { loadUser } from "./redux/actions/user";
import AboutUs from "./Pages/About";
import TermsAndConditions from "./Pages/TermsAndConditions";
import ConnectToInnovators from "./Pages/ConnectToInnovators";
import BlogHome from './Pages/Blogpage/BlogHome'
import CreatePost from "./Pages/Blogpage/CreatePost";
import PostDetails from "./Pages/Blogpage/PostDetail";
import EditPost from "./Pages/Blogpage/Editpost";
import MyBlogs from "./Pages/Blogpage/MyBlogs";

function App() {
  const { isAuthenticated, user, message, error, loading } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, loading]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {loading ? (
        <SpinningLoader />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute user={!isAuthenticated} redirect="/">
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute user={!isAuthenticated} redirect="/">
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/contact"
              element={
                //   <ProtectedRoute
                //     user={isAuthenticated}
                //     redirect="/login"
                //   >
                //     <Contact/>
                //  </ProtectedRoute>
                <Contact />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute user={isAuthenticated} redirect="/login">
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="/ideasubmit" element={<SubmitIdea />} />
            <Route path="/about" element={<AboutUs />} />
            <Route
              path="/termsandconditions"
              element={<TermsAndConditions />}
            />
            <Route
              path="/connecttoinnovators"
              element={<ConnectToInnovators />}
            />
            <Route path="/posts" element={<BlogHome/>}/>
            <Route
              path="/create-post"
              element={
                
                <ProtectedRoute user={isAuthenticated} redirect="/login">
                  <CreatePost/>
                </ProtectedRoute>
                
              }
            />
            <Route
              path="/post/edit/:id"
              element={
                
                <ProtectedRoute user={isAuthenticated} redirect="/login">
                  <EditPost/>
                </ProtectedRoute>
                
              }
            />
             <Route
              path="/my-posts"
              element={
                
                <ProtectedRoute user={isAuthenticated} redirect="/login">
                  <MyBlogs/>
                </ProtectedRoute>
                
              }
            />

            <Route
              path="/posts/post-detail/:id"
              element={
                <PostDetails/>
               
                
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
