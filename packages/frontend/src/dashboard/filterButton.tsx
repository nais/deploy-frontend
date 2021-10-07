import { useHistory } from 'react-router'
import { FilterFilled } from '@navikt/ds-icons'

interface FilterButtonProps {
  team: string
  filterDispatch: any
  isSelected?: boolean
}

const FilterButton = ({ team, filterDispatch, isSelected }: FilterButtonProps) => {
  const history = useHistory()

  const addTeam = () => {
    history.replace({ search: `team=${team}` })
    filterDispatch({ type: 'FILTER_ADD', value: team })
  }
  const tdStyle: React.CSSProperties = {
    background: '#eee',
    whiteSpace: 'nowrap',
    width: 'fit-content',
    padding: '.25em .4em',
    fontSize: '75%',
    borderRadius: '10rem',
    lineHeight: '1',
    border: '1px solid #ddd',
    cursor: 'pointer',
  }
  return (
    <div style={tdStyle} onClick={() => addTeam()}>
      <FilterFilled style={{ fontSize: '.7rem', marginRight: '.125em' }} /> {team}
    </div>
  )
}

export default FilterButton
