import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Features/authSlice";
import { toast } from "react-toastify";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Navbar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            <h2 className="text-white fw-bold fs-1">Dukan Store</h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-3">
              <li className="nav-item">
                <Link className="text-white" to={"/cart"}>
                  <div className="nav-bag d-flex align-items-center">
    
                    <IconButton aria-label="cart" sx={{ color: "#ffffff" }} >
                      <StyledBadge badgeContent={cartTotalQuantity} color="success">
                        <ShoppingCartIcon sx={{ fontSize: 40  ,  }} />
                      </StyledBadge>
                    </IconButton>
                
                  </div>
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-3">
              {auth._id ? (
                <>
                  {auth.isAdmin ? (
                    <li>
                      <Link className="text-white" to={"/admin/summary"}>
                        Admin
                      </Link>
                    </li>
                  ) : null}

                  <li className="nav-item">
                    <Link
                      className="text-white"
                      onClick={() => {
                        dispatch(logoutUser(null));
                        toast.warning("Logged out !!", {
                          position: "bottom-left",
                        });
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="text-white" to={"/login"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="text-white" to={"/register"}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
