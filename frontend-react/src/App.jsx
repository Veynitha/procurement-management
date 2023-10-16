import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import GetAllRqs from './Screen/Get_all_rqs';
import SetStatus from './Screen/Set_rq_status';
import RQ2PO from './Screen/Req_PO';
import PurchesOrders from './Screen/Get_all_POS';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<GetAllRqs/>}></Route>
          <Route path='/update/:id' element={<SetStatus />}></Route>
          <Route path='/rq2po/:id' element={<RQ2PO/>}></Route>
          <Route path='/po' element={<PurchesOrders />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
