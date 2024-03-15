import { useContext } from 'react'

import { StateContext } from './StateProvider'

function App() {
  const { state } = useContext(StateContext)
  const child = state.component()
  return (
    <div className="container mx-auto min-h-screen">
      <div className="flex justify-center items-center min-h-screen">
        {child}
      </div>
    </div>
  )
}

export default App
