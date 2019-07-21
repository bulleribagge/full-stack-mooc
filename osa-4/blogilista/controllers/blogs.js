const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = await new Blog(request.body).save()
    return response.status(201).json(blog)
  } catch (exception) {
    if (exception.name === 'ValidationError') {
      return response.status(400).json({'error' : 'Failed validation'})
    }
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  console.log(request.body)
  try {
    const updated = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
    response.json(updated)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter