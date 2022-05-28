/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CreateComment } from '../reducers/CommentReducer'
import { InitBlogs } from '../reducers/BlogReducer'

const Comments = ({ blog }) => {

  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const submitHandler = (event) => {
    //append comment to blog comments
    event.preventDefault()

    const newComment = {
      comment: comment
    }
    setComment('')
    dispatch(CreateComment(newComment, blog.id))
    dispatch(InitBlogs())

  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comment.map(c =>
          <li key={c.id}>{c.comment}</li>
        )
        }
      </ul>
    </div>
  )
}
export default Comments 