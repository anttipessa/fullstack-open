import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    mockHandler = jest.fn()

    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Bill Gates',
      url: 'wwww.google.com',
      likes: 100,
      user: {
        username: 'Test'
      }
    }

    const user = {
      username: 'Test'
    }

    component = render(
      <Blog blog={blog} user={user} updateLike={mockHandler}  deleteBlog={mockHandler}/>
    )

  })
  test('Title and author visible in the blog', () => {
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library Bill Gates'
    )
  })

  test('After clicking show button url and likes visible', () => {
    const button = component.getByText('show')
    fireEvent.click(button)
    const div = component.container.querySelector('.blogContent')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(
      'wwww.google.com100 likeTestremove'
    )
  })

  test('After clicking like button twice event handler is called twice', async () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})
