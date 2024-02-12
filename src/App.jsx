import { useState } from 'react'
import Login from './components/Login'
import { Application } from './components/Application'

function App () {
  const [user, setUser] = useState(null)
  return (
    <>
      {
      user === null
        ? <Login setUser={setUser} />
        : <Application />
    }
    </>
  )
}

export default App
