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
  const [wishes, setWishes] = useState<[number, string, boolean][]>([])
  const [searchResults, setSearchResults] = useState<
    [number, string, boolean][]
  >([])
  // 検索窓の表示
  const [wish, setWish] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  const handleAddWish = () => {
    if (wish.trim()) {
      const newId = wishes.length > 0 ? wishes[wishes.length - 1][0] + 1 : 1
      setWishes((prevWishes) => [...prevWishes, [newId, wish, false]])
      setWish('')
    }
  }
  const handleSearch = () => {
    setSearchResults(
      search
        ? wishes.filter((item) =>
            item[1].toLowerCase().includes(search.toLowerCase())
          )
        : wishes
    )
    setSearch('')
  }
  const searchClear = () => {
    setSearchResults([])
  }

  const toggleBought = (index: number) => {
    console.log(index)
    setWishes((prevWishes) =>
      prevWishes.map((item) =>
        item[0] === index ? [item[0], item[1], !item[2]] : item
      )
    )
    setSearchResults((prevSearchResults) =>
      prevSearchResults.map((item) =>
        item[0] === index ? [item[0], item[1], !item[2]] : item
      )
    )
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
        <Button variant='text' onClick={searchClear}>
          クリア
        </Button>
      </Stack>

      <List>
        {(searchResults.length > 0 ? searchResults : wishes).map((item) => (
          <ListItem>
            <span>{item[0]}</span>
            <span>{item[1]}</span>
            <Button variant='text' onClick={() => toggleBought(item[0])}>
              {item[2] ? '購入済み' : '未購入'}
            </Button>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}
