const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, url: 1 }).populate('comments', { text: 1})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.json(savedBlog.toJSON())
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const comment = new Comment({
    text: request.body.text
  }) 
  const savedComment = await comment.save()
  const blog = await Blog.findById(request.params.id)
  console.log(savedComment)
  blog.comments = blog.comments.concat(savedComment)
  await blog.save()
  response.json(blog.toJSON())
})


blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === decodedToken.id.toString()) {
    const deleteBlog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).json(deleteBlog.toJSON())
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const update = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Object.keys(update).forEach(key => {
    if (!update[key]) delete update[key]
  })

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, update, { new: true }).populate('user').populate('comments', { text: 1})
  console.log(updatedBlog)
  response.json(updatedBlog.toJSON())
})


module.exports = blogsRouter
