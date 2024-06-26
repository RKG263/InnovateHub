import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import ProtectedRoute from "./Utils/ProtectedRoute";
import Register from "./Components/Auth/Register";
import Home from "./Components/Home/Home";
import NotFound from "./Shared/NotFound";
import SpinningLoader from "./Shared/SpinningLoader";
// import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import SubmitIdea from "./Pages/Users/SubmitIdea";
import { loadUser } from "./redux/actions/user";
import AboutUs from "./Pages/About";
import TermsAndConditions from "./Pages/TermsAndConditions";
import ConnectToInnovators from "./Pages/ConnectToInnovators";
import BlogHome from "./Pages/Blogpage/BlogHome";
import MyBlogs from "./Pages/Blogpage/MyBlogs";
import CreatePost from "./Pages/Blogpage/CreatePost";
import PostDetails from "./Pages/Blogpage/PostDetail";
import EditPost from "./Pages/Blogpage/Editpost";
import Explore from "./Pages/Explore";
import AdminResources from "./Pages/AdminPages/AdminResources";
import SuccessStoryPage from "./Pages/AdminPages/SuccessStories";
import Review from "./Pages/Review/Review";
import UserChat from "./Pages/Chat/UserChat.jsx";
import ChatBot from "./Pages/ChatBot/ChatBot.jsx";
import Graph from "./Pages/graph/Graph.jsx";
import ProfilePage from "./Pages/Users/Profile.jsx";
import Dashboard from "./Pages/Users/Dashboard.jsx";
import NotificationPage from "./Components/Users/Notification.jsx";
import Plan from "./Pages/mentor-plan/Plan.jsx";
import Createplan from "./Pages/mentor-plan/Createplan.jsx";
import SuccessPost from "./Pages/SuccessPost/SuccessPost.jsx"
import SuccessStories from "./Pages/SuccessStories/SuccessStories.jsx"
import SuccessPostForm from "./Pages/SuccessPostForm/SuccessPostForm.jsx"
import EventPage from "./Pages/Event/EventPage.jsx";
import Resources from "./Pages/Resources/resourcePage/Resources.jsx"
import PostResources from "./Pages/Resources/resourcePage/PostResources.jsx"


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
                  <ProtectedRoute
                    user={isAuthenticated}
                    redirect="/login"
                  >
                    <Contact/>
                 </ProtectedRoute>
         
              }
            />
            <Route path="/posts" element={<BlogHome />} />
            <Route path="/ask" element={<ChatBot />} />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute user={isAuthenticated} redirect="/login">
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={isAuthenticated} redirect="/login">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/notifications"
              element={
                // <ProtectedRoute user={isAuthenticated} redirect="/login">
                  <NotificationPage userId = {user?._id} />
                //  </ProtectedRoute>
              }
            /> */}
            <Route
              path="/my-posts"
              element={
                <ProtectedRoute user={isAuthenticated} redirect="/login">
                  <MyBlogs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-post"
              element={
                <ProtectedRoute user={isAuthenticated} redirect="/login">
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post/edit/:id"
              element={
                <ProtectedRoute user={isAuthenticated} redirect="/login">
                  <EditPost />
                </ProtectedRoute>
              }
            />
            <Route path="/posts/post-detail/:id" element={<PostDetails />} />
            <Route path="/posts" element={<BlogHome />} />
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
            {/* <Route
              path="/chat/:id"
              element={
                <ProtectedRoute user={isAuthenticated} redirect="/login">
                  <UserChat />
                </ProtectedRoute>
              }
            /> */}
            <Route path="/explore" element={<Explore />} />

            // for resource
            <Route path="/all-admin-resource" element={<Resources />} />
            <Route path="/admin-resource-post" element={<PostResources />} />
            <Route path="/successstorypage" element={<SuccessStories />} />
            <Route path="/success-stories/form" element={<SuccessPostForm />} />
            <Route path="/success-stories/:id" element={<SuccessPost />} />
            <Route path="/mentor/review" element={<Review />} />
            <Route path="/chat/:id" element={<UserChat />} />
            <Route path="/user/graph" element={<Graph />} />
            <Route path="/mentor/:id" element={<Plan />} />
            <Route path="/mentor/create-plan" element={<Createplan />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/plan/:id" element={<Plan />} />
            {/* <Route path="/ev" element={<Plan />} /> */}

            // mentor plan Routes
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
