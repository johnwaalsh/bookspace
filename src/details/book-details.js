import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {json, useNavigate, useParams} from "react-router";
import {getBookThunk} from "../services/book-thunks";
import {getBookIfExistsThunk, getCreatedDetailsThunk, updateBookThunk} from "../services/created-thunks";
import {current} from "@reduxjs/toolkit";
import {getCriticsForBookThunk, updateUserThunk} from "../services/auth-thunks";
import {createReviewThunk, getReviewsForBookThunk} from "../services/review-thunks";
import BookItem from "../search/book-item";
import ReviewItem from "./review-item";
import {Link} from "react-router-dom";

function BookDetailsComponent() {
    const { currentUser } = useSelector((state) => state.auth);
    const { bid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [details, setDetails] = useState({"volumeInfo": {"title": "", "authors": "", "description":"", "imageLinks": {"thumbnail": ""}}});
    const [createdDetails, setCreatedDetails] = useState({"favorites": [], currentlyReading: [], "title": details.volumeInfo.title, "authors": details.volumeInfo.authors, "desc": details.volumeInfo.description})
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("")
    const [currentlyReading, setCurrentlyReading] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false)
    const [critics, setCritics] = useState([]);

    const favoriteClickHandler = () => {
        const favorited = currentUser && createdDetails.favorites.includes(currentUser.username);
        if (currentUser) {
            let curr_favorites = [];
            let curr_user_favorites = [];
            const newFavorited = !favorited
            if (newFavorited) {
                curr_favorites = [...createdDetails.favorites, currentUser.username]
                curr_user_favorites = [...currentUser.favorites, bid]
            } else {
                curr_favorites = createdDetails.favorites.filter(user => user !== currentUser.username);
                curr_user_favorites = currentUser.favorites.filter(bookID => bookID !== bid);
            }
            setCreatedDetails({...createdDetails, "favorites": curr_favorites});
            dispatch(updateBookThunk({
                "id": bid,
                ...createdDetails,
                "favorites": curr_favorites,
                "title": details.volumeInfo.title.toString(),
                "desc": details.volumeInfo.description.toString(),
            }))
            dispatch(updateUserThunk({
                ...currentUser,
                "favorites": curr_user_favorites,
            }))
        } else {
            navigate("/login");
        }
    }

    const currentlyReadingClickHandler = () => {
        if (currentUser) {
            let curr_reading = [];
            let curr_user_reading = [];
            const newReading = !currentlyReading
            if (newReading) {
                curr_reading = [...createdDetails.currentlyReading, currentUser.username]
                curr_user_reading = [...currentUser.currentlyReading, bid]
            } else {
                curr_reading = createdDetails.currentlyReading.filter(user => user !== currentUser.username);
                curr_user_reading = currentUser.currentlyReading.filter(bookID => bookID !== bid);
            }
            setCreatedDetails({...createdDetails, "currentlyReading": curr_reading});
            setCurrentlyReading(newReading);
            dispatch(updateBookThunk({
                "id": bid,
                ...createdDetails,
                "currentlyReading": curr_reading,
                "title": details.volumeInfo.title.toString(),
                "desc": details.volumeInfo.description.toString(),
            }))
            dispatch(updateUserThunk({
                ...currentUser,
                "currentlyReading": curr_user_reading,
            }))
        } else {
            navigate("/login");
        }
    }

    const postReviewHandler = () => {
        if (rating && reviewText) {
            dispatch(createReviewThunk({
                "book": bid,
                "title": details.volumeInfo.title,
                "author": currentUser.username,
                "rating": rating,
                "text": reviewText,
            }))
            setReviews([...reviews, {"book": bid, "author": currentUser.username, "rating": rating, "text": reviewText}])
            setHasReviewed(true);
        }
    }

    const recommendClickHandler = () => {
        dispatch(updateUserThunk({...currentUser, "recommendation": bid}));
        setCritics([...critics, currentUser]);
    }

    const unrecommendClickHandler = () => {
        dispatch(updateUserThunk({...currentUser, "recommendation": ""}));
        setCritics(critics.filter(critic => critic.username !== currentUser.username));
    }

    const changeReviews = (reviewID) => {
        setReviews(reviews.filter(other_review => other_review._id !== reviewID))
    }

    useEffect(() => {
        async function getAndLoadBookMain() {
            const { payload } = await dispatch(getBookIfExistsThunk({"id": bid}));
            async function getAndLoadBook() {
                const { payload } = await dispatch(getBookThunk({"id": bid}));
                setDetails(payload);
                async function getBookDetails(bookData) {
                    const { payload } = await dispatch(getCreatedDetailsThunk({"id": bid, "title": bookData.volumeInfo.title, "authors": bookData.volumeInfo.authors.toString(), "desc": bookData.volumeInfo.description, "image": bookData.volumeInfo.imageLinks.thumbnail, "favorites": [], "currentlyReading":[]}));
                    setCreatedDetails(payload);
                }
                await getBookDetails(payload);
            }
            if (!payload) {
                getAndLoadBook();
            } else {
                if ("username" in payload) {
                    setDetails({"volumeInfo": {"title": payload.title, "username": payload.username, "author_first": payload.author_first, "author_last": payload.author_last, "description":payload.desc, "imageLinks": {"thumbnail": payload.image}}});
                } else {
                    setDetails({"volumeInfo": {"title": payload.title, "authors": payload.authors, "description":payload.desc, "imageLinks": {"thumbnail": payload.image}}});
                }
                setCreatedDetails({"favorites": payload.favorites, "currentlyReading": payload.currentlyReading});
            }
        }

        // async function getBookDetails() {
        //     const { payload } = await dispatch(getCreatedDetailsThunk({"id": bid, "title": details.volumeInfo.title, "authors": details.volumeInfo.authors, "desc": details.volumeInfo.description, "favorites": [], "currentlyReading":[]}));
        //     setCreatedDetails(payload);
        // }
        async function getReviews() {
            const { payload } = await dispatch(getReviewsForBookThunk({"id": bid }));
            setReviews(payload);
        }
        async function getCritics() {
            const { payload } = await dispatch(getCriticsForBookThunk({"id": bid }));
            setCritics(payload);
        }
        if (!details.volumeInfo.id) {
            getAndLoadBookMain();
        }
        // getBookDetails();
        getReviews();
        getCritics();
    }, [bid]);
    let authorsFormatted = "";
    if (!("username" in details.volumeInfo)) {
        console.log(details)
        let authors = details.volumeInfo.authors
        authorsFormatted = authors.toString().replace(/,/g, ", ")
    }
    let desc = details.volumeInfo.description
    let descriptionFormatted = desc.toString().replace(/<p>|<\/p>|<br>|<\/br>|<b>|<\/b>|<i>|<\/i>/g, "")
    let reviewsCopy = [...reviews];
    reviewsCopy.reverse();
    console.log(details.volumeInfo)
    return (
        <div className="m-5">
            <div className="d-flex flex-lg-nowrap flex-wrap flex-md-nowrap mt-3 mb-3 me-3">
                <img className="col-lg-5 col-md-6 col-sm-6 col-6 ms-5 ms-md-0 ms-lg-0 rounded-2 ms-sm-5" src={details.volumeInfo.imageLinks.thumbnail}/>
                <div className="d-flex flex-column m-5">
                    <h3>{details.volumeInfo.title}</h3>
                    <>{!("username" in details.volumeInfo) && <h4 className="text-secondary">{authorsFormatted}</h4>}</>
                    <>{("username" in details.volumeInfo) && <Link to={"/profile/" + details.volumeInfo.username}><h4 className="text-secondary">{details.volumeInfo.author_first} {details.volumeInfo.author_last}</h4></Link>}</>
                    <span>{descriptionFormatted}</span>
                </div>
            </div>
            <div className="d-flex justify-content-around border border-2">
                <div className="d-flex flex-column">
                    <>{!(currentUser && createdDetails.favorites.includes(currentUser.username)) && <i className="align-self-center bi bi-star text-warning" onClick={favoriteClickHandler} style={{fontSize : 30}}></i>}</>
                    <>{currentUser && createdDetails.favorites.includes(currentUser.username) && <i className="align-self-center bi bi-star-fill text-warning" onClick={favoriteClickHandler} style={{fontSize : 30}}></i>}</>
                    <h4 className="align-self-center">{createdDetails.favorites.length} Favorites</h4>
                </div>
                <div className="d-flex flex-column">
                    <>{!(currentUser && createdDetails.currentlyReading.includes(currentUser.username)) && <i className="align-self-center bi bi-book text-primary" onClick={currentlyReadingClickHandler} style={{fontSize : 30}}></i>}</>
                    <>{currentUser && createdDetails.currentlyReading.includes(currentUser.username) && <i className="align-self-center bi bi-book-fill text-primary" onClick={currentlyReadingClickHandler} style={{fontSize : 30}}></i>}</>
                    <h4 className="align-self-center">{createdDetails.currentlyReading.length} Currently Reading</h4>
                </div>
            </div>
            <div className="border border-2 mt-3">
                <h4 className="p-3 ps-5">Reviews</h4>
                <>{currentUser && (!reviews.map(review => review.author).includes(currentUser.username)) && !hasReviewed && <div className="ms-5 text-bg-light col-9 col-md-10 col-lg-10 rounded-2 mb-3 pt-3 ps-3 pb-3">
                    <span className="ps-3 fw-bold">{currentUser.username}</span>
                    <div className="d-flex ps-2 pe-3 pb-1">
                        <>{rating === 0 && <i style={{fontSize: 20}} onClick={() => setRating(1)}
                                              className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                        <>{rating > 0 && <i style={{fontSize: 20}} onClick={() => setRating(1)}
                                            className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                        <>{rating < 2 && <i style={{fontSize: 20}} onClick={() => setRating(2)}
                                            className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                        <>{rating > 1 && <i style={{fontSize: 20}} onClick={() => setRating(2)}
                                            className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                        <>{rating < 3 && <i style={{fontSize: 20}} onClick={() => setRating(3)}
                                            className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                        <>{rating > 2 && <i style={{fontSize: 20}} onClick={() => setRating(3)}
                                            className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                        <>{rating < 4 && <i style={{fontSize: 20}} onClick={() => setRating(4)}
                                            className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                        <>{rating > 3 && <i style={{fontSize: 20}} onClick={() => setRating(4)}
                                            className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                        <>{rating < 5 && <i style={{fontSize: 20}} onClick={() => setRating(5)}
                                            className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                        <>{rating > 4 && <i style={{fontSize: 20}} onClick={() => setRating(5)}
                                            className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                    </div>
                    <textarea className="col-11 mb-2" value={reviewText} placeholder="Write your review..." style={{resize: "none"}} rows={3} onChange={(event) => setReviewText(event.target.value)}></textarea>
                    <button className="rounded-3" onClick={postReviewHandler}>Post Review</button>
                </div>}</>
                <>{
                    reviewsCopy.map(review =>
                        <div className="">
                            <ReviewItem
                                review={review} currentUser={currentUser} reviewChanger={changeReviews}/>
                        </div>
                    )
                }</>
            </div>
            <div className="border border-2 mt-3 pb-4 d-flex flex-column">
                <h4 className="pt-3 pe-3 ps-5 mb-3">Critic Recommendations</h4>
                <>{currentUser && currentUser.role == "Critic" && !(critics.map(critic => critic.username).includes(currentUser.username)) && <button className="m-3 ms-5 align-self-start rounded-3 p-2 text-bg-primary" onClick={recommendClickHandler}>Recommend this book!</button>}</>
                <>{currentUser && currentUser.role == "Critic" && (critics.map(critic => critic.username).includes(currentUser.username)) && <button className="m-3 ms-5 align-self-start rounded-3 p-2 text-bg-primary" onClick={unrecommendClickHandler}>Undo recommendation</button>}</>
                <>{critics.length === 0 && <span className="p-3 ps-5 me-5">Looks like no critics have recommended this book yet...</span>}</>
                <>{
                    critics.map(critic =>
                        <div className="mt-4 mb-4">
                            <span className="m-3 ms-5 text-bg-light p-3 rounded-3"><Link className="text-decoration-none" to={"/profile/" + critic.username}>{critic.firstname} {critic.lastname}</Link> recommends this!</span>
                        </div>
                    )
                }</>
            </div>
        </div>
    );
}
export default BookDetailsComponent;