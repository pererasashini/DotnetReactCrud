import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Person from './components/people/Person'
import {Routes, Route } from "react-router";
import { Toaster } from 'react-hot-toast';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="Person" element={<Person />} />
        <Route path="*" element={<NotFound />} />


      </Routes>

      <Toaster />

    </>
  )
}

export default App
