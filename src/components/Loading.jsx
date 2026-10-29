import './Style/Loandingz.css'

const Loading = () => {
  return (
    <div className='loading' role='status' aria-live='polite'>
        <div className='loading_portal' aria-hidden='true'>
          <span></span>
          <span></span>
          <span></span>
          <img className='loading_gif' src="./image/carga.gif" alt="" />
        </div>

        <h1 className='loading_text'>
          Opening portal<span className='loading_dots'><i>.</i><i>.</i><i>.</i></span>
        </h1>
    </div>
  )
}

export default Loading
