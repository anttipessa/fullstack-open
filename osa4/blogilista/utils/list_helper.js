const _ = require('lodash')



const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(x => x.likes)

    const reducer = (sum, item) => {
        return sum + item
    }
    return likes.length === 0
        ? 0
        : likes.reduce(reducer, 0)

}

const favoriteBlog = (blogs) => {
    const reducer = (most, next) => {
        if (most.likes > next.likes) return most
        return next
    }
    const blog = blogs.reduce(reducer, { likes: -1 })
    return blog.likes !== -1 ? blog : 0
}

const mostBlogs = (blogs) => {
    const counts = _.countBy(blogs, 'author')
    let mostBlogs = { author: '', blogs: 0 }
    for (author in counts) {
        mostBlogs = mostBlogs.blogs < counts[author] ? { author: author, blogs: counts[author] } : 0
    }
    return mostBlogs
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}