import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ApiCurensy from './component/ApiCurensy'


function App() {
  const [count, setCount] = useState(0)
  console.log("app")

  return (
    <>
    <ApiCurensy/>
    </>
  )
}

export default App