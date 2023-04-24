import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllCriticsThunk, getCriticsForBookThunk, updateUserThunk} from "../services/auth-thunks";
import ReviewItem from "../details/review-item";
import {getCreatedDetailsThunk} from "../services/created-thunks";
import BookItem from "../search/book-item";
import {Link} from "react-router-dom";
import {createUserBookThunk} from "../services/user-book-thunks";
import {current} from "@reduxjs/toolkit";
import {useNavigate} from "react-router";

function UploadComponent() {
    const { currentUser } = useSelector((state) => state.auth);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const postHandler = async () => {
        if (title && desc) {
            let temp = title;
            if (title.replaceAll(" ", "").length < 12) {
                temp = title + title + title + title + title + title + title + title + title + title + title
                setTitle(temp)
            }
            const id = temp.replaceAll(" ", "").slice(0, 12);
            await dispatch(createUserBookThunk({"id": id, "title": title, "username": currentUser.username, "author_first": currentUser.firstname, "author_last": currentUser.lastname, "desc": desc, "image": "/image/blank_book_cover.jpg", "favorites": [], "currently_reading": []}));
            navigate("/profile");
        }
    };
    return (
        <div className="m-5">
            <h4>Upload a book!</h4>
            <div className="d-flex flex-column">
                <label className="mt-3" for="title">Title:</label>
                <input className="col-10 col-sm-9 col-md-8 col-lg-7 align-self-start" id="title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Book title"></input>
                <label className="mt-3" htmlFor="desc">Description:</label>
                <textarea rows={3} className="col-10 col-sm-9 col-md-8 col-lg-7 align-self-start" id="desc" value={desc} onChange={(event) => setDesc(event.target.value)} placeholder="Book description"></textarea>
                <button className="p-2 text-bg-primary mt-4 align-self-start rounded-3" onClick={postHandler}>Post Book</button>
            </div>
        </div>
    );
}
export default UploadComponent;