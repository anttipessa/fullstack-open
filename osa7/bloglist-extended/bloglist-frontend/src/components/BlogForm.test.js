import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  test('BlogForm calls correct props with callback function', () => {

    const mockHandler = jest.fn()

    const component = render(
      <BlogForm createBlog={mockHandler} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, { target: { value: 'testing of forms could be easier' } } )
    fireEvent.change(author, { target: { value: 'testauthor' } } )
    fireEvent.change(url, { target: { value: 'testurl.com' } } )
    fireEvent.submit(form)

    expect(mockHandler.mock.calls.length).toBe(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('testing of forms could be easier' )
    expect(mockHandler.mock.calls[0][0].author).toBe('testauthor' )
    expect(mockHandler.mock.calls[0][0].url).toBe('testurl.com' )
  })
})
