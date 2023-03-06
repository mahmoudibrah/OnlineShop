import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import  styled  from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productEdit } from '../../Features/productSlice';

export default function EditProduct({productId}) {
    const dispatch =  useDispatch()
 const  {items , editStatus}   =    useSelector(state => state.product)
 const [currentProduct, setCurrentProduct] = useState({});
 const [previewImg, setPreviewImg] = useState("");
 
 const [productImage, setProductImage] = useState("");
 const [name, setName] = useState("")
 const [price, setPrice] = useState("")
 const [brand, setBrand] = useState("")
 const [desc, setDesc] = useState("")

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    let selectedProduct = items.filter((item)=>item._id === productId )
    selectedProduct  =  selectedProduct[0]
    setCurrentProduct(selectedProduct)
    setProductImage("")
    setPreviewImg(selectedProduct.image.url)
    setName(selectedProduct.name)
    setPrice(selectedProduct.price)
    setBrand(selectedProduct.brand)
    setDesc(selectedProduct.desc)
  };

  const handleClose = () => {
    setOpen(false);
  };


  


  const handlerProductImageUpload = (e) => {
    const file = e.target.files[0];
    transFormFile(file);
  };
  const transFormFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImage(reader.result);
        setPreviewImg(reader.result);
      };
    } else {
      setProductImage("");
    }
  };
  const handlerSubmit = (e)=> {
    e.preventDefault()
    dispatch(productEdit({
        productImage,
        product : {
            ...currentProduct,
            name : name,
            brand : brand,
            price : price,
            desc : desc
        }
    }))
  }



  return (
    <div>
      <Edit  onClick={handleClickOpen}>
      Edit
      </Edit>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"md"}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
        <div className="cardProduct d-flex justify-content-between gap-3">
        <form onSubmit={ handlerSubmit}>
          <h2 className="mb-4"> Create a product</h2>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/"
              onChange={handlerProductImageUpload}
            />
          </div>
          <div className="mb-3">
            <select className="form-select" value={brand}  onChange={(e)=>setBrand(e.target.value)} required>
                <option value="" defaultValue>Select Brand</option>
                <option value="iphone">iphone</option>
                <option value="samsung">samsung</option>
                <option value="other">other</option>
            </select>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
              onChange={(e)=>setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              id="number"
              placeholder="Price"
              onChange={(e)=>setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="desc"
              placeholder="Short Description"
              onChange={(e)=>setDesc(e.target.value)}
              value={desc}
              required
            />
          </div>
          <div className="mb-3">
                <button className="btn btn-primary w-100">
                    {editStatus === "pending" ?  "Submitting" : "Submit"}
                </button>
          </div>
        </form>
        <div className="imagePreview  p-2 border w-100 d-flex justify-content-center align-items-center">
          {previewImg ? (
            <img src={previewImg} alt="productImage" />
          ) : (
            <p>Image preview will appear here</p>
          )}
        </div>
      </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



const Edit = styled.button`
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
    background-color: #4b70e2;
`