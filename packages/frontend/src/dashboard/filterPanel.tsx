import { Close } from '@navikt/ds-icons'

const FilterPanel = ({ dashboardState, dispatch }) => {
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
      {Array.from(dashboardState.filters.entries()).map(([key, value]) => (
        <div
          style={buttonStyle}
          key={`${key}:${value}`}
          onClick={() => dispatch({ type: 'FILTER_REMOVE', value: value })}
        >
          <Close style={{ fontSize: '.7rem', marginRight: '.5em' }} />
          <span>
            {key}: {value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default FilterPanel
