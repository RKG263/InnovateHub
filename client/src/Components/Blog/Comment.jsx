import axios from "axios"
import { BiEdit } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import { URL } from "../../url"
import { useDispatch, useSelector } from "react-redux";


const Comment = ({c,post}) => {

  const { isAuthenticated, user, message, error, loading } = useSelector(
    (state) => state.user
  );

  const deleteComment=async(id)=>{
    try{
      await axios.delete(URL+"/api/v1/comment/remove/"+id,{withCredentials:true})
      window.location.reload(true)
    }
    catch(err){
      console.log(err)
    }
  }
  // console.log(post.userId)
  // console.log(user._id)
  // console.log(post)
  // console.log(user)
  return (
    <div style={{backgroundColor:'#1976d2'}} className="px-2 py-2 rounded-lg my-2">
    <div className="flex items-center justify-between">
      <h3 className="font-bold text-white">@{c.author}</h3>
      <div className="flex items-center space-x-4">
        <p className="text-sm text-gray-200">{new Date(c.updatedAt).toLocaleDateString()}</p>
        <p className="text-sm text-gray-200">{new Date(c.updatedAt).toLocaleTimeString()}</p>
        {user?._id === c?.userId && (
          <div className="flex items-center space-x-2">
            <p
              className="cursor-pointer text-red-100 hover:text-red-200"
              onClick={() => deleteComment(c._id)}
            >
              <MdDelete />
            </p>
          </div>
        )}
      </div>
    </div>
    <p className="px-4 mt-2 text-white">{c.comment}</p>
  </div>
  

  )
}

export default Comment