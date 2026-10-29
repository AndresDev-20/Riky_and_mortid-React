import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState()
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Cancel the previous request if the url changes before it finishes
    const controller = new AbortController()
    setIsLoading(true)

    axios.get(url, { signal: controller.signal })
      .then(res => {
        setData(res.data)
        setHasError(false)
      })
      .catch(err => {
        if (axios.isCancel(err)) return
        console.log(err)
        setHasError(true)
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false)
      })

    return () => controller.abort()
  }, [url])

  return [data, hasError, isLoading]
}

export default useFetch
