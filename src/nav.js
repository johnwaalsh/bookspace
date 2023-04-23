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
        <div className="d-flex m-3 ms-5 me-5">
            <Link to="/" className="align-self-center me-5 text-decoration-none text-dark">
                <div className="d-flex">
                    <i className="align-self-center bi bi-book-half me-2" style={{fontSize : 30}}></i>
                    <h3 className="align-self-center">BookSpace</h3>
                </div>
            </Link>
            <Link to="/search" className="align-self-center me-5 text-decoration-none text-dark">Search</Link>
            <>{currentUser && currentUser.role === "Author" && <button onClick={acclaimedClickHandler} className="border-0 bg-white align-self-center me-5 text-decoration-none text-dark">Critically Acclaimed</button>}</>
            <>{(!currentUser || (currentUser && currentUser.role !== "Author")) && <button onClick={acclaimedClickHandler} className="me-auto border-0 bg-white align-self-center me-5 text-decoration-none text-dark">Critically Acclaimed</button>}</>
            <>{currentUser && currentUser.role == "Author" && <Link to="/upload" className="align-self-center me-auto text-decoration-none text-dark">Upload Book</Link>}</>
            <>
                {
                    currentUser &&
                    <Link to="/profile" className="align-self-center me-5 text-decoration-none text-dark">Profile</Link>

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