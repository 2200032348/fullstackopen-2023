// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const total = blogs.reduce((total, currentValue) => {
    return total + currentValue.likes
  }, 0)
  return total
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }
  
  const max = blogs.reduce((maxblog, blog) =>
  maxblog.likes > blog.likes ? maxblog : blog,
  )
  
  const favBlog = {
    title: max.title,
    author: max.author,
    likes: max.likes,
  }

  return favBlog
}

const mostBlogs = (blogs) => {
  // Get all authors of blogs
  const authors = blogs.map((blog) => blog.author)

  if (!authors || authors.length === 0) {
    return null
  }

  // Count number of blogs for each author
  const countBlogsForAuthor = authors.reduce((acc, curr) => {
    acc[curr] ? acc[curr]++ : (acc[curr] = 1)

    return acc
  }, {})

  // Return array with name of author with most blogs and amount of blogs.
  const authorWithMostBlogsArray = Object.entries(
    countBlogsForAuthor,
  ).reduce((a, b) => (countBlogsForAuthor[a[0]] > countBlogsForAuthor[b[0]] ? a : b))

  const authorWithMostBlogs = {
    author: authorWithMostBlogsArray[0],
    blogs: authorWithMostBlogsArray[1],
  }

  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // Get all authors from blogs
  const authors = blogs.map((blog) => blog.author)

  // get unique authors or eliminate duplicate authors
  let uniqueAuthors = [...new Set(authors)]

  const likesByAuthor = uniqueAuthors.map((author) => {
    // Get the blogs for each author
    const blogsByAuthor = blogs.filter((blog) => blog.author === author)

    // Count the total number of likes by author
    const countLikesPerAuthor = blogsByAuthor.reduce(
      (accumulator, currentValue) => accumulator + currentValue.likes,
      0,
    )

    // Create an object to return author + total amount of it's likes.
    const numberOfLikesByAuthor = {
      author: author,
      likes: countLikesPerAuthor,
    }

    return numberOfLikesByAuthor
  })
  // Return author with the most likes
  return likesByAuthor.reduce((a, b) => (a.likes > b.likes ? a : b))
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
