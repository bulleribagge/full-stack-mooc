const listHelper = require('../utils/list_helper')
const { initialBlogs } = require('./tests_helper')

test('dummy returns 1', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of an empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the number of likes for that one blog', () => {
    const likesForSingleBlog = 1337
    const result = listHelper.totalLikes([{likes: likesForSingleBlog}])
    expect(result).toBe(likesForSingleBlog)
  })

  test('of a bigger list is calculated correctly as well', () => {
    const blogs = [
      {
        '_id': '5d2f7444cd308466af899165',
        'title': 'Blogautus',
        'author': 'Berit Blogaaja',
        'url': 'http://blog.it/1',
        'likes': 13,
        '__v': 0
      },
      {
        '_id': '5d30c4a2dbe96c7744a66a11',
        'title': 'Humppa on hauskaa',
        'author': 'Hessu Humpauttaja',
        'url': 'http://blog.it/2',
        'likes': 1324,
        '__v': 0
      }
    ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(1337)
  })
})

describe('favorite blog', () => {
  test('of an empty list is undefined', () => {
    expect(listHelper.favoriteBlog([])).toEqual(undefined)
  })

  test('of a list with just one blog is equal to the single blog', () => {
    const blog = {
      '_id': '5d2f7444cd308466af899165',
      'title': 'Blogautus',
      'author': 'Berit Blogaaja',
      'url': 'http://blog.it/1',
      'likes': 13,
      '__v': 0
    }
    expect(listHelper.favoriteBlog([blog])).toEqual(blog)
  })

  test('of a list with multiple blogs is the one with most likes', () => {

    expect(listHelper.favoriteBlog(initialBlogs)).toEqual(initialBlogs[3])
  })
})

describe('most blogs', () => {
  test('of an empty list is undefined', () => {
    expect(listHelper.mostBlogs([])).toEqual({author: undefined, blogs: 0})
  })

  test('of a list with just one blog returns the author for that one blog', () => {
    const author = 'Kikka Kirjailija'
    expect(listHelper.mostBlogs([{ author }])).toEqual({author: author, blogs: 1})
  })

  test('of a list with multiple blogs returns the author with most entries', () => {
    expect(listHelper.mostBlogs(initialBlogs)).toEqual({author: 'Hessu Humpauttaja', blogs: 2})
  })
})

describe('most likes', () => {
  test('of an empty list is undefined', (() => {
    expect(listHelper.mostLikes([])).toEqual(undefined)
  })),

  test('of a list with just one blog returns the author and number of likes for that single blog', () => {
    expect(listHelper.mostLikes([{author : 'foo', likes : 13}])).toEqual({author : 'foo', likes : 13})
  }),

  test('of a list with multiple blogs returns the author with most total likes', () => {
    expect(listHelper.mostLikes(initialBlogs)).toEqual({author : 'Budo Isti', likes : 14})
  })
})