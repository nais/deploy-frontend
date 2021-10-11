import { Close } from '@navikt/ds-icons'
import { useHistory, useLocation } from 'react-router'

const FilterPanel = ({ dashboardState, dispatch }) => {
  const location = useLocation()
  const history = useHistory()

  const removeValue = (queryValue: string | null, value: string): string | null => {
    var ret = ''
    if (queryValue !== null) {
      ret = queryValue
        .split(',')
        .filter((val) => val !== value)
        .join()
    }
    if (ret === '') {
      return null
    }
    return ret
  }

  const removeFilter = (key, value) => {
    const queryParams = new URLSearchParams(location.search)
    if (queryParams.has(key)) {
      const newValue = removeValue(queryParams.get(key), value)
      if (newValue !== null) {
        queryParams.set(key, newValue)
        dispatch({ type: `FILTER_ADD_${key.toUpperCase()}`, value: newValue })
      } else {
        queryParams.delete(key)
        dispatch({ type: `FILTER_REMOVE_${key.toUpperCase()}`, value: value })
      }
      history.replace({ search: queryParams.toString() })
    }
  }

  const emptyListStyle: React.CSSProperties = {
    fontStyle: 'italic',
    display: 'inline-block',
    marginRight: '.5em',
    fontSize: '75%',
  }
  const buttonStyle: React.CSSProperties = {
    display: 'inline-block',
    background: '#eee',
    fontFamily: "'Source Sans Pro', Arial, sans-serif",
    width: 'fit-content',
    padding: '.25em .4em',
    fontSize: '75%',
    borderRadius: '10rem',
    lineHeight: '1',
    border: '1px solid #ddd',
    cursor: 'pointer',
  }
  return !dashboardState.filters.size ? (
    <div style={emptyListStyle}>No filters currently enabled. Click a team name to filter.</div>
  ) : (
    <div>
      <div style={emptyListStyle}>Filters:</div>
      {Array.from(dashboardState.filters.entries()).map(([key, values]) =>
        values.split(',').map((value) => (
          <div style={buttonStyle} key={`${key}:${value}`} onClick={() => removeFilter(key, value)}>
            <Close style={{ fontSize: '.7rem', marginRight: '.5em' }} />
            <span>
              {key}: {value}
            </span>
          </div>
        ))
      )}
    </div>
  )
}

export default FilterPanel
