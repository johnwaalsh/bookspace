import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk }
    from "../services/auth-thunks";
import {Link} from "react-router-dom";

function ProfileComponent() {
    const { currentUser } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const save = () => { dispatch(updateUserThunk(profile)); };
    useEffect(() => {
        async function getAndLoadProfile() {
            const { payload } = await dispatch(profileThunk());
            setProfile(payload);
        }
        getAndLoadProfile();
    }, [dispatch]);
    return (

        <div className="m-5 border border-2">
            <div className="d-flex border border border-top-0 border-start-0 border-end-0">
                <div className="d-flex flex-column pb-2">
                    <h3 className="ps-3 pt-3">{currentUser.firstname} {currentUser.lastname}</h3>
                    <span className="ps-3 text-secondary mb-2">{currentUser.username}</span>
                    <span className="ps-3 text-secondary mb-2">Role: {currentUser.role}</span>
                    <span className="ps-3 text-secondary">Account Email: {currentUser.email}</span>
                </div>
                <Link to="/edit-profile" className="ms-auto align-self-center p-2 m-3"><button>Edit Profile</button></Link>
            </div>
            <div className="row">
                <div className="col-3 border border-start-0 border-top-0 border-bottom-0">
                    <div className="p-3">
                        <h5>Followers</h5>
                        <h5>Following</h5>
                    </div>
                </div>
                <div className="col-3 border border-start-0 border-top-0 border-bottom-0">
                    <h5 className="p-3">Currently Reading</h5>
                </div>
                <div className="col-3 border border-start-0 border-top-0 border-bottom-0">
                    <h5 className="p-3">Favorites</h5>
                </div>
                <div className="col-3">
                    <h5 className="p-3">Reviews</h5>
                </div>
            </div>
        </div>
    );
}
export default ProfileComponent;