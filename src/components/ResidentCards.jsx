import { useState } from 'react'
import useFetch from '../Hooks/useFetch'
import './Style/Resident.css'

const ResidentCards = ( {url, index = 0} ) => {

  const [resident] = useFetch(url)
  const [imgLoaded, setImgLoaded] = useState(false)

  // 3D tilt following the mouse (only on devices with a real pointer)
  const handleMove = e => {
    if (e.pointerType !== 'mouse') return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    card.style.setProperty('--rx', `${(0.5 - y) * 12}deg`)
    card.style.setProperty('--ry', `${(x - 0.5) * 12}deg`)
    card.style.setProperty('--mx', `${x * 100}%`)
    card.style.setProperty('--my', `${y * 100}%`)
  }

  const handleLeave = e => {
    e.currentTarget.style.setProperty('--rx', '0deg')
    e.currentTarget.style.setProperty('--ry', '0deg')
  }

  if (!resident) {
    return (
      <article className='resident resident--skeleton' style={{ '--i': index }} aria-busy='true'>
        <div className='skeleton skeleton_img'></div>
        <div className='resident_body'>
          <div className='skeleton skeleton_line skeleton_line--title'></div>
          <div className='skeleton skeleton_line'></div>
          <div className='skeleton skeleton_line'></div>
          <div className='skeleton skeleton_line skeleton_line--short'></div>
        </div>
      </article>
    )
  }

  const status = resident.status.toLowerCase()

  return (
    <article
      className='resident'
      style={{ '--i': index }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
     <div className='resident_inner'>
       <header className='resident_header'>
        {!imgLoaded && <div className='skeleton skeleton_img'></div>}
        <img
          className={`resident_img ${imgLoaded ? 'is-loaded' : ''}`}
          src={resident.image}
          alt={resident.name}
          loading='lazy'
          onLoad={() => setImgLoaded(true)}
        />
        <div className={`resident_status resident_status--${status}`}>
          <span className='resident_status-circle'></span>
          <span className='resident_status-label'>{resident.status}</span>
        </div>
       </header>
       <div className='resident_body'>
        <h3 className='resident_name'>{resident.name}</h3>
        <hr className='resident_hr' />
        <ul className='resident_list'>
          <li className='resident_item'><span className='resident_label'>Species</span><span className='resident_value'>{resident.species}</span></li>
          <li className='resident_item'><span className='resident_label'>Origin</span><span className='resident_value'>{resident.origin.name}</span></li>
          <li className='resident_item'><span className='resident_label'>Episodes where appear</span><span className='resident_value'>{resident.episode.length}</span></li>
        </ul>
       </div>
       <span className='resident_glare' aria-hidden='true'></span>
     </div>
    </article>
  )
}

export default ResidentCards
