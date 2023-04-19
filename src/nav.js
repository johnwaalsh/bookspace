import {Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {logoutThunk} from "./services/auth-thunks";
import React from "react";

function NavigationBar() {
    const { currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="d-flex m-3 ms-5 me-5">
            <i className="bi bi-book-half me-2" style={{fontSize : 30}}></i>
            <Link to="/" className="align-self-center me-3 text-decoration-none text-dark"><h3>BookSpace</h3></Link>
            <Link to="/search" className="me-auto align-self-center me-3 text-decoration-none text-dark">Search</Link>
            <>
                {
                    currentUser &&
                    <Link to="/profile" className="align-self-center me-3 text-decoration-none text-dark">Profile</Link>

                }
            </>
            <>
                {
                    !currentUser &&
                    <Link to="/login" className=" align-self-center me-3 text-decoration-none text-dark">Log In</Link>

                }
            </>
            <>
                {
                    currentUser &&
                    <button className=" align-self-center me-3 text-decoration-none text-dark"
                        onClick={() => {
                            dispatch(logoutThunk());
                            navigate("/login");
                        }}>
                        Logout
                    </button>
                }
            </>


        </div>
    )
}

export default NavigationBar;