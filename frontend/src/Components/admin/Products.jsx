import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="container">
          <div className="d-flex justify-content-between">
            <h1>Products</h1>
            <div>
                <button
                  onClick={() => navigate("/admin/products/create-product")}
                  className="btn btn-success me-5"
                >
                  Create
                </button>
            </div>
          </div>
        </div>
  
      </div>
      <Outlet />
    </>
  );
};

export default Products;
