import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteReviewThunk, editReviewThunk, getReviewsForBookThunk} from "../services/review-thunks";
import {current} from "@reduxjs/toolkit";
import {getBookThunk} from "../services/book-thunks";
import {getCreatedDetailsThunk} from "../services/created-thunks";

const ReviewItem = ({review, currentUser, reviewChanger}) => {
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [reviewText, setReviewText] = useState(review.text);
    const [newReviewText, setNewReviewText] = useState(review.text);
    const [rating, setRating] = useState(review.rating);
    const [newRating, setNewRating] = useState(review.rating);
    const [deleted, setDeleted] = useState(false);

    const cancelHandler = () => {
        setEditing(false);
        setNewReviewText(reviewText);
        setNewRating(rating);
    }

    const saveHandler = () => {
        setEditing(false);
        setReviewText(newReviewText);
        setRating(newRating);
        dispatch(editReviewThunk({...review, "text": newReviewText, "rating": newRating}));
    }

    const deleteHandler = () => {
        let reviewOld = {...review}
        dispatch(deleteReviewThunk(reviewOld));
        reviewChanger(review._id)
    }

    useEffect(() => {
        setReviewText(review.text);
        setRating(review.rating);
        setNewReviewText(review.text);
        setNewRating(review.rating);
    }, [review]);
    return(
        <>{!deleted && <div className="ms-5 text-bg-light col-9 col-md-10 col-lg-10 rounded-2 mb-3 pt-3 ps-3 pb-3">
            <Link className="text-decoration-none text-black" to={"/profile/" + review.author}><span className="ps-3 fw-bold">{review.author}</span></Link>
            <div className="d-flex ps-2 pe-3 pb-1">
                <>{(!editing && rating === 0 || editing && newRating === 0) && <i onClick={() => editing && setNewRating(1)} style={{fontSize: 20}}
                                      className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                <>{(!editing && rating > 0 || editing && newRating > 0) && <i onClick={() => editing && setNewRating(1)} style={{fontSize: 20}}
                                    className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                <>{(!editing && rating < 2 || editing && newRating < 2) && <i onClick={() => editing && setNewRating(2)} style={{fontSize: 20}}
                                    className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                <>{(!editing && rating > 1 || editing && newRating > 1) && <i onClick={() => editing && setNewRating(2)} style={{fontSize: 20}}
                                    className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                <>{(!editing && rating < 3 || editing && newRating < 3) && <i onClick={() => editing && setNewRating(3)} style={{fontSize: 20}}
                                    className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                <>{(!editing && rating > 2 || editing && newRating > 2) && <i onClick={() => editing && setNewRating(3)} style={{fontSize: 20}}
                                    className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                <>{(!editing && rating < 4 || editing && newRating < 4) && <i onClick={() => editing && setNewRating(4)} style={{fontSize: 20}}
                                    className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                <>{(!editing && rating > 3 || editing && newRating > 3) && <i onClick={() => editing && setNewRating(4)} style={{fontSize: 20}}
                                    className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                <>{(!editing && rating < 5 || editing && newRating < 5) && <i onClick={() => editing && setNewRating(5)} style={{fontSize: 20}}
                                    className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                <>{(!editing && rating > 4 || editing && newRating > 4) && <i onClick={() => editing && setNewRating(5)} style={{fontSize: 20}}
                                    className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
            </div>
            <div className="d-flex flex-lg-row flex-column">
                <>{!editing && <span className="ps-3 col-10 mb-2">{reviewText}</span>}</>
                <>{editing && <textarea className="ms-2 ps-1 col-10 mb-2" placeholder="Write your review..." value={newReviewText} style={{resize: "none"}} rows={3} onChange={(event) => setNewReviewText(event.target.value)}></textarea>}</>
                <div>
                    <>{currentUser && currentUser.username === review.author && !editing && <button onClick={() => setEditing(true)} className="ms-3 align-self-start rounded-3 text-bg-light me-2"><i style={{fontSize : 15}} className="p-1 bi bi-pencil"></i></button>}</>
                    <>{currentUser && currentUser.username === review.author && !editing && <button onClick={deleteHandler} className="align-self-start rounded-3 text-bg-danger"><i style={{fontSize : 15}} className="p-1 bi bi-x-lg"></i></button>}</>
                </div>
            </div>
            <>{editing && <button className="rounded-3 me-3 ms-3" onClick={saveHandler}>Save</button>}</>
            <>{editing && <button className="rounded-3" onClick={cancelHandler}>Cancel</button>}</>
        </div>}</>
    );
};
export default ReviewItem;