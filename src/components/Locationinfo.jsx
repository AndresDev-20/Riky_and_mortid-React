import './Style/Location.css'

const Locationinfo = ( {location} ) => {
  return (
    <article className='location'>
        <span className='location_id'>#{location?.id}</span>
        <p className='location_kicker'>Current location</p>
        <h2 className='location_name'>{location?.name}</h2>
        <ul className='location_list'>
            <li className='location_item'>
              <span className='location_icon'>🪐</span>
              <span className='location_label'>Type</span>
              <span className='location_value'>{location?.type || 'unknown'}</span>
            </li>
            <li className='location_item'>
              <span className='location_icon'>🌌</span>
              <span className='location_label'>Dimension</span>
              <span className='location_value'>{location?.dimension || 'unknown'}</span>
            </li>
            <li className='location_item'>
              <span className='location_icon'>👥</span>
              <span className='location_label'>Population</span>
              <span className='location_value'>{location?.residents.length}</span>
            </li>
        </ul>
    </article>
  )
}

export default Locationinfo
