import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk }
    from "../services/auth-thunks";

function EditProfileComponent() {
    const { currentUser } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const save = () => {
        dispatch(updateUserThunk(profile));
        navigate("/profile")
    };
    useEffect(() => {
        async function getAndLoadProfile() {
            const { payload } = await dispatch(profileThunk());
            setProfile(payload);
        }
        getAndLoadProfile();
    }, [dispatch]);
    return (

        <div className="m-5 border border-2">
            <h4 className="ps-3 pt-3">Edit Your Profile</h4>
            {profile && (
                <div className="p-3">
                    <div className="mb-3">
                        <label className="me-2">First Name:</label><br/>
                        <input type="text"
                               value={profile.firstname}
                               onChange={(event) => {
                                   const newProfile = {
                                       ...profile,
                                       firstname: event.target.value,
                                   };
                                   setProfile(newProfile);
                               }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="me-3">Last Name:</label><br/>
                        <input type="text"
                               value={profile.lastname}
                               onChange={(event) => {
                                   const newProfile = {
                                       ...profile,
                                       lastname: event.target.value,
                                   };
                                   setProfile(newProfile);
                               }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="me-3">Email:</label><br/>
                        <input type="text"
                               value={profile.email}
                               onChange={(event) => {
                                   const newProfile = {
                                       ...profile,
                                       email: event.target.value,
                                   };
                                   setProfile(newProfile);
                               }}
                        />
                    </div>
                </div>
            )}
            <button className="ms-3 mb-3" onClick={save}>Save</button>
            <Link to="/profile"><button className="ms-3 mb-3">Cancel</button></Link>
        </div>
    );
}
export default EditProfileComponent;