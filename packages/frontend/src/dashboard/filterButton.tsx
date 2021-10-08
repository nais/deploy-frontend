import { useHistory, useLocation } from 'react-router'
import { FilterFilled } from '@navikt/ds-icons'

interface FilterButtonProps {
  item: string | null
  type: string
  filterDispatch: any
  isSelected?: boolean
}

const FilterButton = ({ item, filterDispatch, type, isSelected }: FilterButtonProps) => {
  const history = useHistory()
  const location = useLocation()

  const addFilter = () => {
    const params = new URLSearchParams(location.search)
    params.append(type, item!!)
    history.replace({ search: params.toString() })
    filterDispatch({ type: `FILTER_ADD_${type.toUpperCase()}`, value: item })
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
    <div style={tdStyle} onClick={() => addFilter()}>
      <FilterFilled style={{ fontSize: '.7rem', marginRight: '.125em' }} /> {item}
    </div>
  )
}

export default FilterButton
