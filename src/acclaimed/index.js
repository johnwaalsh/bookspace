import React, { useState, useEffect } from "react";
import {useDispatch } from "react-redux";
import {getAllCriticsThunk, getCriticsForBookThunk} from "../services/auth-thunks";
import ReviewItem from "../details/review-item";
import {getCreatedDetailsThunk} from "../services/created-thunks";
import BookItem from "../search/book-item";
import {Link} from "react-router-dom";

function AcclaimedComponent() {
    const dispatch = useDispatch();
    const [critics, setCritics] = useState([])
    useEffect(() => {
        async function getCritics() {
            const { payload } = await dispatch(getAllCriticsThunk());
            setCritics(payload);
            async function getBookDetails(criticData) {
                console.log("in get book details")
                let newCritics = [];
                for (let i = 0; i < criticData.length; i++) {
                    if (criticData[i].recommendation !== "") {
                        let newCritic = {...criticData[i]};
                        console.log(criticData[i])
                        const { payload } = await dispatch(getCreatedDetailsThunk({"id": criticData[i].recommendation}));
                        newCritic["title"] = payload.title;
                        newCritic["image"] = payload.image;
                        newCritics.push(newCritic);
                    }
                }
                setCritics(newCritics)
            }
            await getBookDetails(payload);
        }
        getCritics();
    }, []);
        return (
            <div className="d-flex m-5 flex-column">
                <h4 className="mb-4">Check out the books that critics recommend:</h4>
                <div className="d-flex row ms-1">
                    {
                        critics.map(critic =>
                            <div className="col-3 text-bg-light me-4 pt-3 border border-2 border-warning mb-4">
                                <div className="ms-3">
                                    <span className="text-primary"><Link to={"/profile/" + critic.username}>{critic.firstname} {critic.lastname}</Link> recommends...</span>
                                </div>
                                <BookItem classname=""
                                    book={{"id": critic.recommendation, "volumeInfo": {"title": critic.title, "imageLinks": {"thumbnail": critic.image}}}}/>
                            </div>
                        )
                    }
                </div>
            </div>
    );
}
export default AcclaimedComponent;