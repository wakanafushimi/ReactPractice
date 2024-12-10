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
  const [editId, setEditId] = useState<number>()
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

  const editHandle = (id: number) => {
    setEditId(id) // 編集対象のIDをセット
  }

  // 編集内容を保存
  const handleSaveEdit = (id: number, newWish: string) => {
    setWishes((prevWishes) =>
      prevWishes.map((item) =>
        item[0] === id ? [item[0], newWish, item[2]] : item
      )
    )
    setSearchResults((prevSearchResults) =>
      prevSearchResults.map((item) =>
        item[0] === id ? [item[0], newWish, item[2]] : item
      )
    )
    setEditId(null) // 編集を終了
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
          <ListItem key={item[0]}>
            {editId === item[0] ? (
              <TextField
                id='outlined-basic'
                label='ほしいもの'
                variant='outlined'
                value={item[1]}
                onChange={(e) => {
                  setWishes((prevWishes) =>
                    prevWishes.map((i) =>
                      i[0] === item[0] ? [i[0], e.target.value, i[2]] : i
                    )
                  )
                }}
              />
            ) : (
              <span>{item[1]}</span>
            )}
            <Button variant='text' onClick={() => toggleBought(item[0])}>
              {item[2] ? '購入済み' : '未購入'}
            </Button>
            {editId === item[0] ? (
              <Button
                variant='text'
                onClick={() => handleSaveEdit(item[0], item[1])}
              >
                保存
              </Button>
            ) : (
              <div>
                <Button variant='text' onClick={() => editHandle(item[0])}>
                  編集
                </Button>
                <Button variant='text' onClick={() => deleteHandle(item[0])}>
                  削除
                </Button>
              </div>
            )}
          </ListItem>
        ))}
      </List>
    </Card>
  )
}
