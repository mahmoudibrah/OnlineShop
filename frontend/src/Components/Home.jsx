import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../Features/cartSlice";

const Home = () => {
  const navigate = useNavigate();
  const { items: data, status } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const handlerAddCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <>
      <div className="home">
        {status === "succsse" ? (
          <div className="container py-3">
            <h2 className="text-center py-3">New Arrivals</h2>
            <div className="prodcuts mb-4">
              <div className="row">
                {data?.map((product) => {
                  return (
                    <div key={product._id} className="col-md-3 g-4">
                      <div className="product p-2 shadow bg-white text-center rounded">
                        <h3>{product.name}</h3>
                        <Link to={`/product/${product._id}`}>
                          <img
                            className="w-100"
                            style={{ width: "150px" , maxHeight: "250px" }}
                            src={product.image.url}
                            alt={product.name}
                          />
                        </Link>
                        <h2>{product.brand}</h2>
                        <div className="details-product my-3 d-flex justify-content-between px-2">
                          <span>{product.desc}</span>
                          <span>{product.price}$</span>
                        </div>
                        <button
                          onClick={() => handlerAddCart(product)}
                          className="btn btn-success w-100"
                        >
                          Add Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Home;

//  const { data, error, isLoading } = useGetAllProductQuery(id) =>> stata spice product
