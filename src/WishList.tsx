import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { orange } from '@mui/material/colors'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: 'AIzaSyA9-JVW6EJU93oThhhcS4qfUm8vHwGOQvk',
  authDomain: 'reactpracticedb.firebaseapp.com',
  projectId: 'reactpracticedb',
  storageBucket: 'reactpracticedb.firebasestorage.app',
  messagingSenderId: '50081227303',
  appId: '1:50081227303:web:65eebf3e00d793132ca402',
  measurementId: 'G-M61TLYEHBW',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// コンポーネント
import SortControls from './SortControls'

interface WishItem {
  id: number
  wish: string
  isBought: boolean
  date: string
  price: number | null
  imageUrl?: string | null
  category: string
}

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
})

export default function WishList() {
  const [wishes, setWishes] = useState<WishItem[]>([])
  const [searchResults, setSearchResults] = useState<WishItem[]>([])

  const [editId, setEditId] = useState<number>()
  // 検索窓の表示
  const [wish, setWish] = useState<string>('')
  const [price, setPrice] = useState<number | null>('')
  const [category, setCategory] = useState<string>('家電')
  const [search, setSearch] = useState<string>('')
  //画像プレビュー
  const [newImage, setNewImage] = useState<string | null>(null)
  const [editedImage, setEditedImage] = useState<string | null>(null)
  // 日時
  const [date, setDate] = useState<string>('')
  useEffect(() => {
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleDateString()
    setDate(formattedDate)
  }, [])

  //firestoreのデータをwishesに格納
  //疑問：ここasync必要？
  useEffect(() => {
    const fetchWishes = async () => {
      const querySnapshot = await getDocs(collection(db, 'wishes'))
      const wishesData: WishItem[] = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: data.id,
          wish: data.wish,
          isBought: data.isBought,
          date: data.date,
          price: data.price,
          imageUrl: data.imageUrl || null,
          category: data.category,
        }
      })
      setWishes(wishesData)
    }
    fetchWishes()
  }, [])

  const handleAddWish = () => {
    searchClear() //sort後addできなくなる対策
    if (wish.trim() && price !== null) {
      const newId =
        wishes.length > 0 ? Math.max(...wishes.map((item) => item.id)) + 1 : 1
      const imageUrl = newImage || 'https://placehold.jp/150x150.png'

      const newWishItem: WishItem = {
        id: newId,
        wish,
        isBought: false,
        date,
        price,
        imageUrl,
        category,
      }
      addDoc(collection(db, 'wishes'), newWishItem)
      setWishes((prevWishes) => [...prevWishes, newWishItem])

      setWish('')
      setPrice(0)
      setNewImage(null)
      setCategory('家電')
    }
    if (!wish.trim() || price === null || price === undefined) {
      toast.error('ほしいものと金額を入力してください。')
      return
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
    newImageUrl: string,
    newCategory: string
  ) => {
    setWishes((prevWishes) =>
      prevWishes.map((item) =>
        item.id === id
          ? {
              ...item,
              wish: newWish,
              price: newPrice,
              category: newCategory,
              imageUrl: newImageUrl,
            }
          : item
      )
    )
    setSearchResults((prevSearchResults) =>
      prevSearchResults.map((item) =>
        item.id === id
          ? {
              ...item,
              wish: newWish,
              price: newPrice,
              category: newCategory,
              imageUrl: newImageUrl,
            }
          : item
      )
    )
    setEditId(null)
    setEditedImage(null)
  }

  // 削除
  const deleteHandle = (id: number) => {
    setWishes((prevWishes) => prevWishes.filter((item) => item.id !== id))
    setSearchResults((prevSearchResults) =>
      prevSearchResults.filter((item) => item.id !== id)
    )
  }

  // ソート
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
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Box>
        <Typography variant='h4' gutterBottom>
          WishList
        </Typography>
        {/* 追加 */}
        <Stack spacing={2} sx={{ maxWidth: 400, marginBottom: 3 }}>
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
          <TextField
            label='画像URL'
            value={newImage || ''}
            onChange={(e) => setNewImage(e.target.value)}
          />
          {newImage && <img src={newImage} alt='Preview' width={100} />}

          <Button variant='contained' onClick={handleAddWish}>
            追加
          </Button>
        </Stack>

        {/* 検索 */}
        <Stack direction='row' spacing={2} sx={{ marginBottom: 3 }}>
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

        <SortControls
          sortPrice={sortPrice}
          sortPriceDesc={sortPriceDesc}
          sortDate={sortDate}
          sortDateDesc={sortDateDesc}
        />

        <Grid container spacing={2}>
          {/* デバッグ用 */}
          {/* {searchResults.length > 0 ? (
            <p>searchResultsShowing</p>
          ) : (
            <p>wishesShowing</p>
          )} */}

          {(searchResults.length > 0 ? searchResults : wishes).map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.id}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  {editId === item.id ? (
                    <Stack spacing={1}>
                      <TextField
                        label='画像URL'
                        value={editedImage || item.imageUrl || ''}
                        onChange={(e) => setEditedImage(e.target.value)}
                      />

                      <img
                        src={editedImage || item.imageUrl}
                        alt='preview'
                        width={40}
                      />

                      <TextField
                        id='outlined-basic'
                        label='ほしいもの'
                        variant='outlined'
                        value={item.wish}
                        onChange={(e) => {
                          setWishes((prevWishes) =>
                            prevWishes.map((i) =>
                              i.id === item.id
                                ? { ...i, wish: e.target.value }
                                : i
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
                        variant='outlined'
                        onClick={() =>
                          handleSaveEdit(
                            item.id,
                            item.wish,
                            item.price,
                            editedImage,
                            item.category
                          )
                        }
                      >
                        保存
                      </Button>
                    </Stack>
                  ) : (
                    <>
                      {item.imageUrl && (
                        <div
                          style={{
                            width: '100%',
                            height: 0,
                            paddingTop: '100%',
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: '8px',
                            marginBottom: 10,
                          }}
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.wish}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                      )}
                      <Typography variant='h6'>{item.wish}</Typography>
                      <Typography variant='body1'>{item.category}</Typography>
                      <Typography variant='body2'>{item.price}円</Typography>
                      <Typography variant='body2'>
                        追加日: {item.date}
                      </Typography>
                      <Stack direction='row' spacing={1} sx={{ marginTop: 2 }}>
                        <Button
                          variant='outlined'
                          onClick={() => toggleBought(item.id)}
                        >
                          {item.isBought ? '購入済み' : '未購入'}
                        </Button>
                        <Button
                          variant='outlined'
                          onClick={() => editHandle(item.id)}
                        >
                          編集
                        </Button>
                        <Button
                          variant='outlined'
                          onClick={() => deleteHandle(item.id)}
                        >
                          削除
                        </Button>
                      </Stack>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  )
}
