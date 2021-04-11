import { FilterFilled } from '@navikt/ds-icons'
import React from 'react'

interface FilterButtonProps {
  team: string
  filterDispatch: any
  isSelected?: boolean
}

const FilterButton = ({ team, filterDispatch, isSelected }: FilterButtonProps) => {
  const tdStyle: React.CSSProperties = {
    background: '#eee',
    whiteSpace: 'nowrap',
    width: 'fit-content',
    padding: '.25em .4em',
    fontSize: '75%',
    borderRadius: '10rem',
    lineHeight: '1',
    border: '1px solid #ddd',
  }
  return (
    <div style={tdStyle} onClick={() => filterDispatch({ type: 'FILTER_ADD', value: team })}>
      <FilterFilled style={{ fontSize: '.7rem', marginRight: '.125em' }} /> {team}
    </div>
  )
}

export default FilterButton
