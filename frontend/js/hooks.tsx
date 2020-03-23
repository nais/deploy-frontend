import { useState, useEffect, useReducer } from 'react'

enum ActionTypes {
    FETCH_INIT,
    FETCH_SUCCESS,
    FETCH_FAILURE
}


const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  data: []
}

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_INIT:
      return { ...state, isLoading: true, isError: false, errorMessage: '' }
    case ActionTypes.FETCH_SUCCESS:
      return { ...state, isLoading: false, isError: false, data: action.payload }
    case ActionTypes.FETCH_FAILURE:
      return { ...state, isLoading: false, isError: true, errorMessage: action.payload }
  }
}

const useHttpGet = initialPath => {
  const [url, setPath] = useState(initialPath)
  const [state, dispatch] = useReducer(dataFetchReducer, initialState)

  const fetchUrl = async () => {
    dispatch({ type: ActionTypes.FETCH_INIT })

    try {
      const response = await fetch(url)

      if (response.ok) {
        const json = await response.json()
        dispatch({ type: ActionTypes.FETCH_SUCCESS, payload: json })
      } else {
        const errorMessageBody = await response.text()
        dispatch({
          type: ActionTypes.FETCH_FAILURE,
          payload: `${errorMessageBody} (HTTP ${response.status} ${response.statusText}).`
        })
      }
    } catch (e) {
      dispatch({ type: ActionTypes.FETCH_FAILURE, payload: e })
    }
  }

  useEffect(() => {
    fetchUrl()
  }, [])

  return [state, setPath]
}

export { useHttpGet }
