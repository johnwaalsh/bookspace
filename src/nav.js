import {Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {logoutThunk, profileThunk} from "./services/auth-thunks";
import React, {useEffect, useState} from "react";

function NavigationBar() {
    // const { currentUser } = useSelector((state) => state.auth);
    const [currentUser, setCurrentUser] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const acclaimedClickHandler = () => {
        if (currentUser) {
            navigate("/acclaimed");
        } else {
            navigate("/login");
        }
    }
    useEffect(() => {
        async function getAndLoadProfile() {
            const { payload } = await dispatch(profileThunk());
            setCurrentUser(payload);
        }
        getAndLoadProfile();
    }, [dispatch, navigate]);
    return (
        <div className="d-flex flex-column flex-sm-column flex-md-row flex-lg-row m-3 ms-5 me-5">
            <Link to="/" className="align-self-start align-self-md-center align-self-lg-center me-5 text-decoration-none text-dark">
                <div className="d-flex">
                    <i className="align-self-center bi bi-book-half me-2" style={{fontSize : 30}}></i>
                    <h3 className="align-self-center">BookSpace</h3>
                </div>
            </Link>
            <Link to="/search" className="mb-1 mb-md-0 mb-lg-0 align-self-start align-self-md-center align-self-lg-center me-5 text-decoration-none text-dark">Search</Link>
            <>{currentUser && currentUser.role === "Author" && <button onClick={acclaimedClickHandler} className="mb-1 mb-md-0 mb-lg-0 me-md-auto me-lg-5 border-0 bg-white align-self-start align-self-md-center align-self-lg-center me-5 text-decoration-none ps-0 text-dark">Critically Acclaimed</button>}</>
            <>{(!currentUser || (currentUser && currentUser.role !== "Author")) && <button onClick={acclaimedClickHandler} className="mb-1 mb-md-0 mb-lg-0 me-md-auto border-0 bg-white align-self-start align-self-md-center align-self-lg-center me-5 ps-0 text-decoration-none text-dark">Critically Acclaimed</button>}</>
            <>{currentUser && currentUser.role == "Author" && <Link to="/upload" className="mb-1 mb-md-0 mb-lg-0 d-md-none d-lg-block align-self-start align-self-md-center align-self-lg-center me-lg-auto me-5 text-decoration-none text-dark">Upload Book</Link>}</>
            <>
                {
                    currentUser &&
                    <Link to="/profile" className="mb-1 mb-md-0 mb-lg-0 align-self-start align-self-md-center align-self-lg-center me-5 text-decoration-none text-dark">Profile</Link>

                }
            </>
            <>
                {
                    !currentUser &&
                    <Link to="/login" className="mt-3 mt-md-0 mt-lg-0 mb-3 mb-md-0 mb-lg-0 border border-2 text-bg-light border-dark rounded-3 p-2 align-self-start align-self-md-center align-self-lg-center me-3 text-decoration-none text-dark">Log In</Link>

                }
            </>
            <>
                {
                    currentUser &&
                    <button className="mt-3 mt-md-0 mt-lg-0 rounded-3 p-2 align-self-start align-self-md-center align-self-lg-center me-5 me-md-0 me-lg-0 text-decoration-none text-dark"
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