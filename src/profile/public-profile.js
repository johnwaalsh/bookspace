import React, { useState, useEffect } from "react";
import {useDispatch } from "react-redux";
import {useParams} from "react-router";
import {publicProfileThunk}
    from "../services/auth-thunks";

function PublicProfileComponent() {
    const { username } = useParams();
    const [profile, setProfile] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        async function getAndLoadProfile() {
            const { payload } = await dispatch(publicProfileThunk({"username": username}));
            setProfile(payload);
        }
        getAndLoadProfile();
    }, [dispatch, username]);
    return (

        <div className="m-5 border border-2">
            <div className="d-flex border border border-top-0 border-start-0 border-end-0">
                <div className="d-flex flex-column pb-2">
                    <h3 className="ps-3 pt-3">{profile.firstname} {profile.lastname}</h3>
                    <span className="ps-3 text-secondary mb-2">{profile.username}</span>
                    <span className="ps-3 text-secondary mb-2">Role: {profile.role}</span>
                </div>
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
export default PublicProfileComponent;