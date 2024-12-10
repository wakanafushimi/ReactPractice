import './Cat.css'
// import './index.css'
import { useState } from 'react'

export default function Cat() {
  const tags = ['black', 'orange', 'cute', 'tiger']
  return (
    <div className='px-5'>
      <h1 className='text-2xl py-10'>かわいい猫集めました</h1>
      <div className='container flex gap-5'>
        {tags.map((tag) => (
          <CatCard key={tag} tag={tag} />
        ))}
      </div>
    </div>
  )
}

function CatCard({ tag }: { tag: string }) {
  const [count, setCount] = useState(0)
  const [book, setBook] = useState(false)
  return (
    <div className='text-xs relative catCard border-2 rounded-md w-44 p-3 pb-10'>
      <img src={`https://cataas.com/cat/${tag}`} className='' />
      <div className='buttons absolute bottom-2 flex gap-4'>
        <button
          onClick={() => {
            setCount(count + 1)
            console.log(count + '回ボタン押されたにゃ')
          }}
          className=''
        >
          {count}いいにゃ
        </button>

        <button
          onClick={() => {
            if (book === false) {
              setBook(true)
            } else {
              setBook(false)
            }
          }}
        >
          {book ? 'ブックマーク済み' : 'ブックマーク'}
        </button>
      </div>
    </div>
  )
}
