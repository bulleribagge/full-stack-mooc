import React, {useState, useEffect} from 'react';
import blogService from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import localStorage from './services/localStorage'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getStoredUser()
    if (storedUser) {
     setUser(storedUser)
    }
  }, [])

  useEffect(() => {
    async function fetchBlogs() {
      if (user) {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      }
    }
    fetchBlogs()
  }, [user])

  useEffect(() => {
    if (notification) {
      setTimeout(() => setNotification(null), 3000)
    }
  }, [notification])

  const handleLogin = (user) => {
    localStorage.setStoredUser(user)
    setUser(user)
  }

  if (!user) {
    return (
      <div>
        <Notification {...notification}/>
        <LoginForm setUser={handleLogin} onError={(message) => setNotification({ type : 'ERROR', message })}/>
      </div>
    );
  } else {
    return (
      <div>
      <h2>Blogs</h2>
      <Notification {...notification} />
      <div>
        {user.name} is logged in <button onClick={() => { localStorage.removeStoredUser(); setUser(null) }}>log out</button>
      </div>
      <p/>
      <BlogForm user={user} notifyCallback={setNotification}/>
      { blogs.map(blog => <Blog key={blog.id} blog={blog}/>) }
      </div>
    )
  }
}

export default App;