import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { productCreate } from "../../Features/productSlice";
const CreateProduct = () => {
    const dispatch =  useDispatch()
  const [productImage, setProductImage] = useState("");
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [brand, setBrand] = useState("")
  const [desc, setDesc] = useState("")




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
      };
    } else {
      setProductImage("");
    }
  };
  const handlerSubmit = (e)=> {
    e.preventDefault()
    dispatch(productCreate({
        image : productImage,
        name,
        price,
        brand,
        desc
    }))
  }
  return (
    <>
      <div className="cardProduct d-flex justify-content-between mt-5 ms-3">
        <form onSubmit={ handlerSubmit}>
          <h2 className="mb-4"> Create a product</h2>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/"
              onChange={handlerProductImageUpload}
              required
            />
          </div>
          <div className="mb-3">
            <select className="form-select"  onChange={(e)=>setBrand(e.target.value)} required>
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
                <button className="btn btn-primary w-100">Submit</button>
          </div>
        </form>
        <div className="imagePreview m-5  border w-100 d-flex justify-content-center align-items-center">
          {productImage ? (
            <img src={productImage} alt="productImage" />
          ) : (
            <p>Image preview will appear here</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
