import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//Screens 
import GetAllRqs from './Screen/Get_all_rqs';
import SetStatus from './Screen/Set_rq_status';
import Invoice from './Screen/Invoices';
import ViewInvoiceOrder from './components/ViewInvoiceOrder';
import SupplyOrders from './Screen/SupplyOrders';
import SupplyOrder from './components/ViewSupplyOrder';


//Components


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Invoice />}></Route>
          <Route path='/update/:id' element={<SetStatus />}></Route>
          <Route path='/invoices' element={<Invoice />}></Route>
          <Route path='/invoices/:id' element={<ViewInvoiceOrder />}></Route>
          <Route path='/requests' element={<GetAllRqs />}></Route>
          <Route path='/supplyOrders' element={<SupplyOrders />}></Route>
          <Route path='/supplyOrder/:id' element={<SupplyOrder />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
