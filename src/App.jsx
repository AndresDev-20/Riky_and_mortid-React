import { useState } from 'react'
import './App.css'
import useFetch from './Hooks/useFetch'
import getRandomlocation, { TOTAL_LOCATIONS } from './utils/getRandomlocation'
import MainContent from './components/MainContent'
import Loading from './components/Loading'
import ScrollTop from './components/ScrollTop'

function App() {

  const [locationId, setLocationId] = useState(getRandomlocation())
  const [inputValue, setInputValue] = useState('')

  const url = `https://rickandmortyapi.com/api/location/${locationId}`
  const [location, hasError, isLoading] = useFetch(url)

  const handleSubmit = event => {
    event.preventDefault()
    const value = inputValue.trim()
    if (value) setLocationId(value)
  }

  const handleRandom = () => {
    let next = getRandomlocation()
    while (String(next) === String(locationId)) next = getRandomlocation()
    setInputValue('')
    setLocationId(next)
  }

  // First load: show the full screen portal
  if (!location && !hasError) return <Loading />

  return (
    <div className="App">
      <div className='App_stars' aria-hidden='true'></div>

      <header className='hero'>
        <img className='hero_bg' src="./image/riky.png" alt="" />
        <div className='hero_overlay'></div>

        <div className='hero_content'>
          <img className='hero_logo' src="./image/name.png" alt="Rick and Morty" />
          <h1 className='hero_phrase' data-text='Wubba Lubba Dub Dub!'>Wubba Lubba Dub Dub!</h1>

          <form className='search' onSubmit={handleSubmit}>
            <input
              className='search_input'
              type="number"
              min="1"
              max={TOTAL_LOCATIONS}
              inputMode='numeric'
              placeholder={`Location ID (1 - ${TOTAL_LOCATIONS})`}
              aria-label='Location ID'
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            <button className='search_btn' type='submit'>
              <span>Search</span>
            </button>
            <button
              className='search_random'
              type='button'
              onClick={handleRandom}
              title='Random location'
              aria-label='Random location'
            >
              🎲
            </button>
          </form>
        </div>

        <a href="#content" className='hero_scroll' aria-label='Go to content'>
          <span></span>
        </a>
      </header>

      <main id='content' className={`content ${isLoading ? 'content--loading' : ''}`}>
        {
          hasError
            ? (
              <div className='App_error' role='alert'>
                <span className='App_error-icon'>🛸</span>
                <h2>Location not found</h2>
                <p>You can only enter a number from 1 to {TOTAL_LOCATIONS} 🥲</p>
                <button className='search_btn' onClick={handleRandom}>Take me somewhere random</button>
              </div>
            )
            : <MainContent key={location.id} location={location} />
        }
      </main>

      <footer className='footer'>
        <p>Made with 💚 from dimension C-137</p>
        <a href="https://github.com/yeisonmarroquin887/tercerEntregable.git" target='_blank' rel='noreferrer'>
          Repository on GitHub ↗
        </a>
      </footer>

      <ScrollTop />
    </div>
  )
}

export default App
