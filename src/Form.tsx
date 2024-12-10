import { useState } from 'react'
import './Form.css'

export default function Form() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [error, setError] = useState<string | null>(null)

  return (
    <form
      onSubmit={(event) => {
        if (name === '') {
          event.preventDefault()
          setError('お名前を入力してください')
          console.log('nameのonSubmit')
          return
        }
        if (age === 0) {
          event.preventDefault()
          setError('年齢を入力してください')
          console.log('ageのonSubmit')
          return
        }
        alert(`送信します`)
      }}
    >
      <div>
        お名前：
        <input
          type='text'
          value={name}
          onChange={(event) => {
            setName(event.target.value)
            if (event.target.value === '') {
              // if (name === '') {
              setError('お名前を入力してください')
              console.log('nameのonChange')
              return
            }
            setError(null)
          }}
        />
      </div>

      <div>
        年齢（0～100歳まで）
        <input
          type='number'
          value={age}
          onChange={(event) => {
            const inputAge = Number(event.target.value)
            setAge(inputAge)
            if (inputAge === 0) {
              setError('年齢を入力してください')
              console.log('ageのonChange')
              return
            } else if (inputAge < 0 || inputAge > 100) {
              // if (name === '') {
              setError('正しい年齢を入力してください')
              console.log('ageのonChange')
              return
            }
            setError(null)
          }}
        />
      </div>

      {/* <div>
        {name === '' && empty === true && <p>お名前を入力してください</p>}
      </div> */}

      {error && <div className='error'>{error}</div>}
      <div>
        <input type='submit' />
      </div>
    </form>
  )
}
