import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Bill Gates',
      url: 'wwww.google.com',
      likes: 100,
      user: {
        user: 'test'
      }
    }

    const user = {
      username: 'Test'
    }
    component = render(
      <Blog blog={blog} user={user} />
    )

  })
  test('Title and author visible in the blog', () => {
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library Bill Gates'
    )
  })
})
