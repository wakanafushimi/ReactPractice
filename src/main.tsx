import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Teams from './Teams.tsx'
import WishList from './WishList.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Teams /> */}
    <WishList />
  </StrictMode>
)
