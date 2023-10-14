import React,{useEffect,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from "axios";


const Update_Rq = () => {
  
  const {id} = useParams()
  const [requestId , setRqID] = useState()
  const [name , setName] = useState()
  const [supplierName , setSupplier] = useState()
  const [deliveryDate , setDeliveryDate] = useState()
  const [address , setAddress] = useState()
  const [itemName , setItemName] = useState()
  const [quantity , setQuantity] = useState()
  const [agreedPrice , setAgreedPrice] = useState()
  const [total , setTotal] = useState()
  const [status , setStatus] = useState()
 
  const reqtId = 'requestId';

  const nav = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:8000/getRequest/${reqtId}')
      .then(result => {console.log("data",result)
        setRqID(result.data.requestId)
        setName(result.data.name)
        setSupplier(result.data.supplierName)
        setDeliveryDate(result.data.deliveryDate)
        setAddress(result.data.address)
        setItemName(result.data.itemName)
        setQuantity(result.data.quantity)
        setAgreedPrice(result.data.agreedPrice)
        setTotal(result.data.total)
        setStatus(result.data.status)
      })
      .catch((err) => console.error(err));
  }, [])

  const Update = (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:3001/updateRequest/${requestId}' )
      .then((result) => {
        console.log(result);
        nav('/');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-100 bg-white rounded p-3">
        <form onSubmit={Update}>
          <h1>Update Requistion</h1>
          <div className="mb-2">
            <label htmlFor="">requestId</label>
            <input
              type="text"
              placeholder="Enter PO number"
              className="form-control"
              value={requestId}
              
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">name </label>
            <input
              type="text"
              placeholder="Enter PO number"
              className="form-control"
              value={name}
              
            />
          </div>
          <div className="mb-2">
            <label htmlFor=""> supplierName</label>
            <input
              type="text"
              placeholder="Enter PO number"
              className="form-control"
              value={supplierName}
              
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">deliveryDate</label>
            <input
              type="text"
              placeholder="Enter PO number"
              className="form-control"
              value={deliveryDate}
              
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Supplier</label>
            <input
              type="text"
              placeholder="Enter PO number"
              className="form-control"
              value={Supplier}
              
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">address </label>
            <input
              type="text"
              placeholder="Enter PO number"
              className="form-control"
              value={address}
              
              
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">itemName </label>
            <input
              type="text"
              placeholder="Enter PO number"
              className="form-control"
              value={itemName}
              
              
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">quantity </label>
            <input
              type="text"
              placeholder="Enter PO number"
              className="form-control"
              value={quantity}
              
              
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">agreedPrice </label>
            <input
              type="text"
              placeholder="Enter PO number"
              className="form-control"
              value={agreedPrice}
              
              
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">total </label>
            <input
              type="text"
              placeholder="Enter PO number"
              className="form-control"
              value={total}
              
              
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Status</label>
            <select className="form-control" 
            value={status} 
            onChange={(e)=> setStatus(e.target.value)}>
              <option value="Approve">Approve</option>
              <option value="Reject">Reject</option>
              <option value="Pending">Pending</option>
              
            </select>
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  )
}

export default Update_Rq
