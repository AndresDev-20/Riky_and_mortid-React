import { useRef, useState } from 'react'
import ResidentCards from './ResidentCards'
import Locationinfo from './Locationinfo'
import './Style/Main.css'

const PER_PAGE = 8

// Pages to show: first, last and the neighbours of the current one
const getPages = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  if (start > 2) pages.push('…')
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total - 1) pages.push('…')
  pages.push(total)
  return pages
}

const MainContent = ( {location} ) => {
  const [page, setPage] = useState(1)
  const titleRef = useRef()

  const residents = location?.residents ?? []
  const totalPages = Math.ceil(residents.length / PER_PAGE)
  const visible = residents.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const changePage = n => {
    setPage(n)
    titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Locationinfo location={location} />

      <h2 className='residents_title' ref={titleRef}>
        Residents <span>{residents.length}</span>
      </h2>

      {
        residents.length === 0
          ? (
            <div className='residents_empty'>
              <span>👽</span>
              <p>Nobody lives here... or they all got turned into pickles.</p>
            </div>
          )
          : (
            <div className='resident_container' key={page}>
              {
                visible.map((url, index) => (
                  <ResidentCards
                    key={url}
                    url={url}
                    index={index}
                  />
                ))
              }
            </div>
          )
      }

      {
        totalPages > 1 && (
          <nav className='pagination' aria-label='Residents pages'>
            <button
              className='pagination_btn'
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
              aria-label='Previous page'
            >
              ‹
            </button>
            {
              getPages(page, totalPages).map((n, i) => (
                n === '…'
                  ? <span key={`dots-${i}`} className='pagination_dots'>…</span>
                  : (
                    <button
                      key={n}
                      className={`pagination_btn ${n === page ? 'is-active' : ''}`}
                      onClick={() => changePage(n)}
                      aria-current={n === page ? 'page' : undefined}
                    >
                      {n}
                    </button>
                  )
              ))
            }
            <button
              className='pagination_btn'
              onClick={() => changePage(page + 1)}
              disabled={page === totalPages}
              aria-label='Next page'
            >
              ›
            </button>
          </nav>
        )
      }
    </>
  )
}

export default MainContent
