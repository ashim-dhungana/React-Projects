import { useState } from 'react'
import Navbar from './components/Navbar'

function App() {

  return (
    <>

      <Navbar/>

      <div className="conainer mx-auto my-5 rounded-xl p-5 bg-red-600">

          <h1 className='text-xl font-bold'>Your Todos</h1>

          <div className="todos">
            <div className="todo">

            </div>
          </div>

      </div>
    </>
  )
}

export default App