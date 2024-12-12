// やること
// コンポーネント分割
// 未入力だったとき
// 数字を空にする

import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { useState, useEffect } from 'react'

interface WishItem {
  id: number
  wish: string
  isBought: boolean
  date: string
  price: number | null
  imageUrl?: string | null
  category: string
}

export default function WishList() {
  const [wishes, setWishes] = useState<WishItem[]>([
    {
      id: 1,
      wish: '車',
      isBought: false,
      date: '2024/2/1',
      price: 1000000,
      imageUrl: 'https://placehold.jp/150x150.png',
      category: '家電',
    },
    {
      id: 2,
      wish: 'スマートフォン',
      isBought: false,
      date: '2024/2/10',
      price: 80000,
      imageUrl: 'https://placehold.jp/150x150.png',
      category: 'ファッション',
    },
  ])
  const [searchResults, setSearchResults] = useState<WishItem[]>([])
  const [editId, setEditId] = useState<number>()
  // 検索窓の表示
  const [wish, setWish] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [price, setPrice] = useState<number | null | undefined>()
  const [category, setCategory] = useState<string>('家電')

  // 日時
  const [date, setDate] = useState<string>('')
  useEffect(() => {
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleDateString()
    setDate(formattedDate)
  }, [])

  // 画像のアップロード
  const [image, setImage] = useState<File | null>(null)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    if (file) {
      setImage(file)
    }
  }

  const handleAddWish = () => {
    if (wish.trim() && price !== null) {
      const newId =
        wishes.length > 0 ? Math.max(...wishes.map((item) => item.id)) + 1 : 1
      const imageUrl = image ? URL.createObjectURL(image) : null
      console.log(imageUrl)
      const newWishItem: WishItem = {
        id: newId,
        wish,
        isBought: false,
        date,
        price,
        imageUrl,
        category,
      }
      setWishes((prevWishes) => [...prevWishes, newWishItem])
      setWish('')
      setPrice(null)
      setImage(null)
      setCategory('家電')
    }
  }

  const handleSearch = () => {
    setSearchResults(
      search
        ? wishes.filter((item) =>
            item.wish.toLowerCase().includes(search.toLowerCase())
          )
        : wishes
    )
    setSearch('')
  }
  const searchClear = () => {
    setSearchResults([])
  }

  const toggleBought = (id: number) => {
    setWishes((prevWishes) =>
      prevWishes.map((item) =>
        item.id === id ? { ...item, isBought: !item.isBought } : item
      )
    )
    setSearchResults((prevSearchResults) =>
      prevSearchResults.map((item) =>
        item.id === id ? { ...item, isBought: !item.isBought } : item
      )
    )
  }

  const editHandle = (id: number) => {
    setEditId(id)
  }

  const handleSaveEdit = (
    id: number,
    newWish: string,
    newPrice: number,
    newCategory: string
  ) => {
    setWishes((prevWishes) =>
      prevWishes.map((item) =>
        item.id === id
          ? { ...item, wish: newWish, price: newPrice, category: newCategory }
          : item
      )
    )
    setSearchResults((prevSearchResults) =>
      prevSearchResults.map((item) =>
        item.id === id
          ? { ...item, wish: newWish, price: newPrice, category: newCategory }
          : item
      )
    )
    setEditId(null)
  }

  // 削除
  const deleteHandle = (id: number) => {
    setWishes((prevWishes) => prevWishes.filter((item) => item.id !== id))
    setSearchResults((prevSearchResults) =>
      prevSearchResults.filter((item) => item.id !== id)
    )
  }

  const sortPrice = () => {
    const sortedWishes = [
      ...(searchResults.length ? searchResults : wishes),
    ].sort((a, b) => a.price - b.price)
    setSearchResults(sortedWishes)
  }

  const sortPriceDesc = () => {
    const sortedWishes = [
      ...(searchResults.length ? searchResults : wishes),
    ].sort((a, b) => b.price - a.price)
    setSearchResults(sortedWishes)
  }

  const sortDate = () => {
    const sortedWishes = [
      ...(searchResults.length ? searchResults : wishes),
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    setSearchResults(sortedWishes)
  }

  const sortDateDesc = () => {
    const sortedWishes = [
      ...(searchResults.length ? searchResults : wishes),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    setSearchResults(sortedWishes)
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
        <TextField
          id='outlined-basic'
          label='金額'
          variant='outlined'
          value={price}
          type='number'
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <FormControl variant='outlined'>
          <InputLabel>カテゴリ</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as string)}
            label='カテゴリ'
          >
            <MenuItem value='家電'>家電</MenuItem>
            <MenuItem value='ファッション'>ファッション</MenuItem>
            <MenuItem value='食品'>食品</MenuItem>
          </Select>
        </FormControl>
        <input type='file' accept='image/*' onChange={handleImageChange} />
        {image && (
          <img src={URL.createObjectURL(image)} alt='Preview' width={100} />
        )}
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

      <List>
        {(searchResults.length > 0 ? searchResults : wishes).map((item) => (
          <ListItem key={item.id}>
            {editId === item.id ? (
              <>
                <TextField
                  id='outlined-basic'
                  label='ほしいもの'
                  variant='outlined'
                  value={item.wish}
                  onChange={(e) => {
                    setWishes((prevWishes) =>
                      prevWishes.map((i) =>
                        i.id === item.id ? { ...i, wish: e.target.value } : i
                      )
                    )
                  }}
                />
                <TextField
                  id='outlined-basic'
                  label='金額'
                  variant='outlined'
                  value={item.price}
                  type='number'
                  onChange={(e) => {
                    setWishes((prevWishes) =>
                      prevWishes.map((i) =>
                        i.id === item.id
                          ? { ...i, price: Number(e.target.value) }
                          : i
                      )
                    )
                  }}
                />
                <FormControl variant='outlined'>
                  <InputLabel>カテゴリ</InputLabel>
                  <Select
                    value={item.category}
                    onChange={(e) => {
                      setWishes((prevWishes) =>
                        prevWishes.map((i) =>
                          i.id === item.id
                            ? { ...i, category: e.target.value as string }
                            : i
                        )
                      )
                    }}
                    label='カテゴリ'
                  >
                    <MenuItem value='家電'>家電</MenuItem>
                    <MenuItem value='ファッション'>ファッション</MenuItem>
                    <MenuItem value='食品'>食品</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant='text'
                  onClick={() =>
                    handleSaveEdit(
                      item.id,
                      item.wish,
                      item.price,
                      item.category
                    )
                  }
                >
                  保存
                </Button>
              </>
            ) : (
              <>
                <span>{item.wish}</span>
                <span>{item.price}円</span>
                <span>{item.category}</span>
                <Button variant='text' onClick={() => toggleBought(item.id)}>
                  {item.isBought ? '購入済み' : '未購入'}
                </Button>
                <Button variant='text' onClick={() => editHandle(item.id)}>
                  編集
                </Button>
                <Button variant='text' onClick={() => deleteHandle(item.id)}>
                  削除
                </Button>
              </>
            )}
            <span>追加日: {item.date}</span>
            {item.imageUrl && (
              <img src={item.imageUrl} alt='Item' width={100} />
            )}
          </ListItem>
        ))}
      </List>
    </Card>
  )
}
