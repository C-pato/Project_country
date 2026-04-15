import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Leaderboard from './components/Leaderboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
