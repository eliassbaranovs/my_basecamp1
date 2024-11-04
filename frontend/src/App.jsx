import { useState } from 'react'
import './App.css'
import Input from './components/input'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <h1 className="bg-red-400">TEST</h1>
        <Input />
      </div>
    </>
  )
}

export default App
