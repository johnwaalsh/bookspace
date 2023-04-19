import React, { useState, useEffect } from "react";
import {useDispatch } from "react-redux";
import {useParams} from "react-router";
import {getBookThunk} from "../services/book-thunks";
import {getCreatedDetailsThunk} from "../services/created-thunks";

function BookDetailsComponent() {
    const { bid } = useParams();
    const dispatch = useDispatch();
    const [details, setDetails] = useState({"volumeInfo": {"title": "", "authors": "", "description":"", "imageLinks": {"thumbnail": ""}}});
    const [createdDetails, setCreatedDetails] = useState({"favorites": 0})
    useEffect(() => {
        async function getAndLoadBook() {
            const { payload } = await dispatch(getBookThunk({"id": bid}));
            setDetails(payload);
            const { createdDetailsPayload } = await dispatch(getCreatedDetailsThunk({"id": bid}));
            if (createdDetailsPayload) {
                setCreatedDetails(createdDetailsPayload);
            }
        }
        getAndLoadBook();
    }, [dispatch, bid]);
    let authors = details.volumeInfo.authors
    let authorsFormatted = authors.toString().replace(/,/g, ", ")
    let desc = details.volumeInfo.description
    let descriptionFormatted = desc.toString().replace(/<p>|<\/p>|<br>|<\/br>|<b>|<\/b>|<i>|<\/i>/g, "")
    return (
        <div className="m-5">
            <div className="d-flex mt-3 mb-3 me-3">
                <img className="col-5" src={details.volumeInfo.imageLinks.thumbnail}/>
                <div className="d-flex flex-column m-5">
                    <h3>{details.volumeInfo.title}</h3>
                    <h4 className="text-secondary">{authorsFormatted}</h4>
                    <span>{descriptionFormatted}</span>
                </div>
            </div>
            <div className="d-flex justify-content-around mt-5 me-5 border border-2">
                <i className="bi bi-star" style={{fontSize : 30}}></i>
                <i className="bi bi-book" style={{fontSize : 30}}></i>
            </div>
            <div className="d-flex justify-content-around me-5 border border-2 border-top-0">
                <h4 className="">0 Favorites</h4>
                <h4 className="">0 Currently Reading</h4>
            </div>
        </div>
    );
}
export default BookDetailsComponent;