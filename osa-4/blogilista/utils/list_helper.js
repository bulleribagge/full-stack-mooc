const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => blogs.reduce((acc, val) => acc + val.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((acc, val) => {
    if (acc === undefined) {
        return val
    }
    if (!acc.hasOwnProperty('likes')) {
        return val
    }
    if (!val.hasOwnProperty('likes')) {
        return acc
    }
    if (val.likes > acc.likes) {
        return val
    }
    return acc
}, undefined)

const mostBlogs = (blogs) => {
    const blogsByAuthor = blogs.reduce((acc,val) => {
        if (!acc[val.author]) {
            acc[val.author] = 1
        } else {
            acc[val.author] += 1
        }
        return acc}, {})
    let max = {author : undefined, blogs : 0}
    for (let author in blogsByAuthor) {
        if (blogsByAuthor[author] > max["blogs"]) {
            max = {author: author, blogs: blogsByAuthor[author]}
        }
    }
    return max
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}