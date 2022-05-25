import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PostForm from './PostForm'
import userEvent from '@testing-library/user-event'

test('<PostForm /> calls with proper object', async () => {
  const combareObj = {
    author:'test',
    title: 'test',
    url: 'test'
  }

  const user = userEvent.setup()
  const createPost = jest.fn()
  render(<PostForm createPost={createPost} />)

  const Button = screen.getByText('create')
  await user.click(Button)
  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')

  await user.type(title, combareObj.title)
  await user.type(author,combareObj.author)
  await user.type(url, combareObj.url)

  await user.click(Button)
  expect(createPost.mock.calls).toHaveLength(2)
  expect(createPost.mock.calls[1][0]).toEqual(combareObj)
})