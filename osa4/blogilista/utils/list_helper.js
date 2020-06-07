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

module.exports = {
    dummy,
    totalLikes
}