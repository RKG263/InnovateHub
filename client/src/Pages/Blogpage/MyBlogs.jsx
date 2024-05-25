import { Link, useLocation } from "react-router-dom"


import {  useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { URL } from "../../url";
import HomePosts from "../../Components/Blog/HomePost";
import SpinningLoader from "../../Shared/SpinningLoader";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";


const MyBlogs = () => {
    const {search}=useLocation()
  // console.log(search)
  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const { isAuthenticated, user, message, error, loading } = useSelector(
    (state) => state.user
  );
  // console.log(user)

  const fetchPosts=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/v1/blog/post/user/"+user._id)
       console.log(res.data)
      setPosts(res.data.posts)
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
      
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()

  },[search])

  return (
    <div>
        <Header/>
        <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader?<div className="h-[40vh] flex justify-center items-center"><SpinningLoader/></div>:!noResults?
        posts.map((post)=>(
          <>
          <Link to={user?`/posts/post-detail/${post._id}`:"/login"}>
          <HomePosts key={post._id} post={post}/>
          </Link>
          </>
          
        )):<h3 className="text-center font-bold mt-16">No posts available</h3>}
        </div>
        <Footer/>
    </div>
  )
}

export default MyBlogs