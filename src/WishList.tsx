// やること
// コンポーネント分割

import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { useState } from 'react'

export default function WishList() {
  const [wishes, setWishes] = useState<string[]>([])
  const [wish, setWish] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [searchResults, setSearchResults] = useState<string[]>([])

  const handleAddWish = () => {
    if (wish.trim()) {
      setWishes((prevWishes) => [...prevWishes, wish])
      setWish('')
    }
  }

  const handleSearch = () => {
    if (search.trim()) {
      wishes.forEach((item) => {
        if (item === search) {
          setSearchResults((prevSearchResults) => [...prevSearchResults, item])
        }
      })
    }
    setSearch('')
  }
  return (
    <Card>
      <h1>WishList</h1>
      {/* 追加 */}
      <Stack>
        <TextField
          id='outlined-basic'
          label='ほしいもの'
          variant='outlined'
          value={wish}
          onChange={(e) => setWish(e.target.value)}
        />
        <Button variant='text' onClick={handleAddWish}>
          追加
        </Button>
      </Stack>

      {/* 検索 */}
      <Stack>
        <TextField
          id='outlined-basic'
          label='検索'
          variant='outlined'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant='text' onClick={handleSearch}>
          検索
        </Button>
      </Stack>

      <List>
        if(search=''){
        {wishes.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
    }
      </List>
    </Card>
  )
}
