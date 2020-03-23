import { useState, useEffect, useReducer } from 'react'

const FETCH_INIT = 'FETCH_INIT'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_FAILURE = 'FETCH_FAILURE'

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  data: []
}

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, isLoading: true, isError: false, errorMessage: '' }
    case FETCH_SUCCESS:
      return { ...state, isLoading: false, isError: false, data: action.payload }
    case FETCH_FAILURE:
      return { ...state, isLoading: false, isError: true, errorMessage: action.payload }
  }
}

const useHttpGet = initialPath => {
  const [url, setPath] = useState(initialPath)
  const [state, dispatch] = useReducer(dataFetchReducer, initialState)

  const fetchUrl = async () => {
    dispatch({ type: FETCH_INIT })

    try {
      const response = await fetch(url)

      if (response.ok) {
        const json = await response.json()
        dispatch({ type: FETCH_SUCCESS, payload: json })
      } else {
        const errorMessageBody = await response.text()
        dispatch({
          type: FETCH_FAILURE,
          payload: `${errorMessageBody} (HTTP ${response.status} ${response.statusText}).`
        })
      }
    } catch (e) {
      dispatch({ type: FETCH_FAILURE, payload: e })
    }
  }

  useEffect(() => {
    fetchUrl()
  }, [])

  return [state, setPath]
}

export { useHttpGet }
