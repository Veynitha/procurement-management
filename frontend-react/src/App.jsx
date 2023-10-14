import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import GetAllRqs from './Screen/Get_all_rqs';
import SetStatus from './Screen/Set_rq_status';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<GetAllRqs/>}></Route>
          <Route path='/update:requestId' element={<SetStatus />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
