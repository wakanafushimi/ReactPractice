import React from 'react'
import Button from '@mui/material/Button'

interface SortControlsProps {
  sortPrice: () => void
  sortPriceDesc: () => void
  sortDate: () => void
  sortDateDesc: () => void
}

const SortControls: React.FC<SortControlsProps> = ({
  sortPrice,
  sortPriceDesc,
  sortDate,
  sortDateDesc,
}) => {
  return (
    <div>
      <Button variant='text' onClick={sortPriceDesc}>
        金額降順
      </Button>
      <Button variant='text' onClick={sortPrice}>
        金額昇順
      </Button>
      <Button variant='text' onClick={sortDateDesc}>
        日付降順
      </Button>
      <Button variant='text' onClick={sortDate}>
        日付昇順
      </Button>
    </div>
  )
}

export default SortControls
