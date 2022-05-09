import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToggleView from './ToggleView'
import Blog from './Blog'

describe('<ToggleView />', () => {
  let container

  const u1 = { name: 'kai' }
  const testBlog = {
    title: 'testblog',
    author: 'root',
    likes: 0,
    user: u1,
    url: 'www.nogo.com'
  }
  const loggedUser = {
    name: 'root',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYyNzI5MTNjZTI4NWNhODU4MDU0ZWRiMCIsImlhdCI6MTY1MTk0NDcyOX0.cci0xZtTKmXCvYQyX4DtOV41myaznKSnWGhpseooL4U',
    username: 'root'
  }

  beforeEach(() => {
    container = render(
      <ToggleView buttonLabel="view" loggedUser={loggedUser}>
        <Blog blog={testBlog}/>
      </ToggleView>
    ).container
  })

  test('at start the children are not displayed', () => {
    const title = screen.getByText('testblog', { exact: false })
    expect(title).toBeDefined()
    const author = screen.getByText('root', { exact: false })
    expect(author).toBeDefined()

    const url = screen.queryByText('www.nogo.com', { exact: false })
    expect(url).toBeNull()
    const likes = screen.queryByText('0', { exact: false })
    expect(likes).toBeNull()
    const user = screen.queryByText('kai', { exact: false })
    expect(user).toBeNull()
  })

  test('after clicking the button, children are displayed', async () => {

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const title = screen.getByText('testblog', { exact: false })
    expect(title).toBeDefined()
    const author = screen.getByText('root', { exact: false })
    expect(author).toBeDefined()
    const url = screen.getByText('www.nogo.com', { exact: false })
    expect(url).toBeDefined()
    const likes = screen.getByText('0', { exact: false })
    expect(likes).toBeDefined()
  })
})