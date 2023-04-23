import React, {useEffect, useState} from "react";
import {getBookThunk} from "../services/book-thunks";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {getBookIfExistsThunk} from "../services/created-thunks";

const MiniBook = ({bookID, details}) => {
    const dispatch = useDispatch();
    const [bookDetails, setBookDetails] = useState({"volumeInfo": {"title": "", "authors": "", "description":"", "imageLinks": {"thumbnail": ""}}});
    const [bookLinkID, setBookLinkID] = useState(bookID);
    useEffect(() => {
        async function getAndLoadBookMain() {
            const { payload } = await dispatch(getBookIfExistsThunk({"id": bookID}));
            async function getAndLoadBook() {
                const { payload } = await dispatch(getBookThunk({"id": bookID}));
                setBookDetails(payload);
            }
            if (!payload) {
                getAndLoadBook();
                setBookLinkID(bookID);
            } else {
                setBookDetails({"volumeInfo": {"title": payload.title, "imageLinks": {"thumbnail": payload.image}}})
            }
        }

        if (!details) {
            getAndLoadBookMain();
        } else {
            setBookLinkID(details.id);
            setBookDetails({"volumeInfo": {"title": details.title, "imageLinks": {"thumbnail": details.image}}})
        }

    }, [dispatch]);
    return(
        <Link className="text-decoration-none text-black d-flex border mb-3 pb-4 border-top-0 border-start-0 border-end-0" to={"/details/" + bookLinkID}>
            <img className="col-3" src={bookDetails.volumeInfo.imageLinks.thumbnail}/>
            <span className="m-2">{bookDetails.volumeInfo.title}</span>
        </Link>
    );
};
export default MiniBook;