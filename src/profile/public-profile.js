import React, { useState, useEffect } from "react";
import {useDispatch } from "react-redux";
import {useParams} from "react-router";
import {publicProfileThunk}
    from "../services/auth-thunks";
import MiniBook from "./mini-book";
import MiniReview from "./mini-review";
import {getReviewsForUserThunk} from "../services/review-thunks";
import {Link} from "react-router-dom";
import {getCreatedDetailsThunk} from "../services/created-thunks";
import {getBooksForUserThunk} from "../services/user-book-thunks";

function PublicProfileComponent() {
    const { username } = useParams();
    const [profile, setProfile] = useState({"firstname": "", "lastname": "", "role": "", "email": "", "favorites": [], "currentlyReading": [], "reviews": [], "followers": [], "following": [], "recommendation": ""});
    const [reviews, setReviews] = useState([]);
    const [authoredBooks, setAuthoredBooks] = useState([]);
    const [recommended, setRecommended] = useState({"title": ""})
    const dispatch = useDispatch();
    useEffect(() => {
        async function getAndLoadProfile() {
            const { payload } = await dispatch(publicProfileThunk({"username": username}));
            setProfile(payload);
            async function getAuthoredBooks() {
                const { payload } = await dispatch(getBooksForUserThunk({"user": username }));
                setAuthoredBooks(payload);
            }
            getAuthoredBooks();
        }
        async function getReviews() {
            const { payload } = await dispatch(getReviewsForUserThunk({"user": username }));
            setReviews(payload);
        }
        async function getRecommended() {
            if (profile.role === "Critic" && profile.recommendation !== "") {
                const { payload } = await dispatch(getCreatedDetailsThunk({"id": profile.recommendation}));
                setRecommended(payload);
            }
        }
        getAndLoadProfile();
        getReviews();
        getRecommended();
    }, [dispatch, username, profile.recommendation]);
    return (

        <div className="m-5 border border-2">
            <div className="d-flex border border border-top-0 border-start-0 border-end-0">
                <div className="d-flex flex-column pb-2">
                    <h3 className="ps-3 pt-3">{profile.firstname} {profile.lastname}</h3>
                    <span className="ps-3 text-secondary mb-2">{profile.username}</span>
                    <span className="ps-3 text-secondary mb-2">Role: {profile.role}</span>
                    <>{profile.role === "Critic" && profile.recommendation !== "" && <span className="ps-3 mb-2 text-info">{profile.firstname} recommends that you read <Link className="text-info" to={"/details/" + profile.recommendation}>{recommended.title}</Link>!</span>}</>
                    <>{profile.role === "Critic" && profile.recommendation === "" && <span className="ps-3 mb-2">{profile.firstname} has not recommended any books yet.</span>}</>
                </div>
            </div>
            <>{profile.role === "Author" && <div className="d-flex flex-lg-row flex-column">
                <div className="col-lg-3 col-12">
                    <h5 className="p-3">Currently Reading</h5>
                    <div className="p-3">
                        <>{profile.currentlyReading.length === 0 && <span>Nothing here yet...</span>}</>
                        <>{profile.currentlyReading !== 0 &&
                            profile.currentlyReading.map(bookID =>
                                <div className="">
                                    <MiniBook
                                        bookID={bookID}/>
                                </div>
                            )
                        }</>
                    </div>
                </div>
                <div className="col-lg-3 col-12">
                    <h5 className="p-3">Favorites</h5>
                    <div className="p-3">
                        <>{profile.favorites.length === 0 && <span>Nothing here yet...</span>}</>
                        <>{profile.favorites !== 0 &&
                            profile.favorites.map(bookID =>
                                <div className="">
                                    <MiniBook
                                        bookID={bookID}/>
                                </div>
                            )
                        }</>
                    </div>
                </div>
                <div className="col-lg-3 col-12">
                    <h5 className="p-3">Reviews</h5>
                    <div className="p-3">
                        <>{reviews.length === 0 && <span>Nothing here yet...</span>}</>
                        <>{reviews.length !== 0 &&
                            reviews.map(review =>
                                <div className="">
                                    <MiniReview
                                        review={review}/>
                                </div>
                            )
                        }</>
                    </div>
                </div>
                <div className="col-lg-3 col-12">
                    <h5 className="p-3">Authored Books</h5>
                    <div className="p-3">
                        <>{authoredBooks.length === 0 && <span>Nothing here yet...</span>}</>
                        <>{authoredBooks.length !== 0 &&
                            authoredBooks.map(details =>
                                <div className="">
                                    <MiniBook
                                        bookID={""} details={details}/>
                                </div>
                            )
                        }</>
                    </div>
                </div>
            </div>}</>
            <>{profile.role !== "Author" && <div className="d-flex flex-lg-row flex-column">
                <div className="col-lg-4 col-12">
                    <h5 className="p-3">Currently Reading</h5>
                    <div className="p-3">
                        <>{profile.currentlyReading.length === 0 && <span>Nothing here yet...</span>}</>
                        <>{profile.currentlyReading !== 0 &&
                            profile.currentlyReading.map(bookID =>
                                <div className="">
                                    <MiniBook
                                        bookID={bookID}/>
                                </div>
                            )
                        }</>
                    </div>
                </div>
                <div className="col-lg-4 col-12">
                    <h5 className="p-3">Favorites</h5>
                    <div className="p-3">
                        <>{profile.favorites.length === 0 && <span>Nothing here yet...</span>}</>
                        <>{profile.favorites !== 0 &&
                            profile.favorites.map(bookID =>
                                <div className="">
                                    <MiniBook
                                        bookID={bookID}/>
                                </div>
                            )
                        }</>
                    </div>
                </div>
                <div className="col-lg-4 col-12">
                    <h5 className="p-3">Reviews</h5>
                    <div className="p-3">
                        <>{reviews.length === 0 && <span>Nothing here yet...</span>}</>
                        <>{reviews.length !== 0 &&
                            reviews.map(review =>
                                <div className="">
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
export default PublicProfileComponent;