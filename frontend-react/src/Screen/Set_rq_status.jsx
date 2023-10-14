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
 
 

  const nav = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:8000/api/get-request/'+id)
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
      .put('http://localhost:8000/api/updateRequest/'+id ,{ newStatus: status })
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
          <h1>Approve Requistion</h1>
          
          <div className="mb-2">
            <label htmlFor="">Status</label>
            <select className="form-control" 
            value={status} 
            onChange={(e)=> setStatus(e.target.value)}>
              <option value="approved">Approve</option>
              <option value="reject">Reject</option>
              <option value="pending">Pending</option>
              
            </select>
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  )
}

export default Update_Rq
