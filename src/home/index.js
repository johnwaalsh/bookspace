import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllCriticsThunk, getCriticsForBookThunk, profileThunk} from "../services/auth-thunks";
import ReviewItem from "../details/review-item";
import {getBookIfExistsThunk, getCreatedDetailsThunk} from "../services/created-thunks";
import BookItem from "../search/book-item";
import {Link} from "react-router-dom";
import {getReviewsForUser} from "../services/review-services";
import {getAllReviewsThunk, getReviewsForUserThunk} from "../services/review-thunks";
import MiniReview from "../profile/mini-review";
import MiniBook from "../profile/mini-book";

function HomeComponent() {
    const { currentUser } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState({"firstname": "", "lastname": "", "role": "", "email": "", "favorites": [], "currentlyReading": [], "reviews": [], "followers": [], "following": []});
    const [reviews, setReviews] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        async function getAndLoadProfile() {
            const {payload} = await dispatch(profileThunk());
            setProfile(payload);
        }
        async function getAllReviews() {
            const { payload } = await dispatch(getAllReviewsThunk());
            setReviews(payload);
        }
        getAndLoadProfile();
        getAllReviews();
    }, [])
    let reviewsCopy = reviews.reverse();
    return (
        <div className="">
            <>{profile && <h4 className="m-5">Welcome back, {profile.firstname}!</h4>}</>
            <>{profile && <div className="d-flex ms-5 me-5 border border-2">
                <div className="col-4 p-2 border border-start-0 border-top-0 border-bottom-0">
                    <h4 className="p-3 ms-3">Recent Reviews</h4>
                    <div className="p-3 ms-3">
                        <>{reviewsCopy.length === 0 && <span>Nothing here yet...</span>}</>
                        <>{reviewsCopy.length !== 0 &&
                            reviewsCopy.map(review =>
                                <div className="d-flex flex-column">
                                    <span className="mb-2"><Link className="text-black" to={"/profile/" + review.author}>{review.author}</Link> posted:</span>
                                    <MiniReview
                                        review={review}/>
                                </div>
                            )
                        }</>
                    </div>
                </div>
                <div className="col-4 p-2 border border-start-0 border-top-0 border-bottom-0">
                    <h4 className="p-3 ms-5">Your Reading List</h4>
                    <div className="p-3">
                        <>{profile.currentlyReading.length === 0 && <span>Nothing here yet...</span>}</>
                        <>{profile.currentlyReading !== 0 &&
                            profile.currentlyReading.map(bookID =>
                                <div className="">
                                    <MiniBook
                                        bookID={bookID} details={null}/>
                                </div>
                            )
                        }</>
                    </div>
                </div>
                <div className="col-4 p-2">
                    <h4 className="p-3 ms-5">Your Favorites</h4>
                    <div className="p-3">
                        <>{profile.favorites.length === 0 && <span>Nothing here yet...</span>}</>
                        <>{profile.favorites !== 0 &&
                            profile.favorites.map(bookID =>
                                <div className="">
                                    <MiniBook
                                        bookID={bookID} details={null}/>
                                </div>
                            )
                        }</>
                    </div>
                </div>
            </div>}</>
            <>{!profile && <div className="d-flex me-5">
                <div className="col-12 me-5">
                    <h4 className="p-3 ms-3">Recent Reviews</h4>
                    <div className="p-3 ms-3">
                        <>{reviewsCopy.length === 0 && <span>Nothing here yet...</span>}</>
                        <>{reviewsCopy.length !== 0 &&
                            reviewsCopy.map(review =>
                                <div className="d-flex flex-column">
                                    <span className="mb-2"><Link className="text-black" to={"/profile/" + review.author}>{review.author}</Link> posted:</span>
                                    <MiniReview
                                        review={review}/>
                                </div>
                            )
                        }</>
                    </div>
                </div>
            </div>}</>

        </div>
    );
}
export default HomeComponent;