import React, { useState, useEffect } from "react";
import {useDispatch, useSelector}
    from "react-redux";import {useParams} from "react-router";
import {loginThunk, profileThunk, publicProfileThunk}
    from "../services/auth-thunks";
import { useNavigate } from "react-router";
import {searchBooksThunk} from "../services/book-thunks";
import BookItem from "./book-item";

function SearchResultsComponent() {
    const { query } = useParams();
    const [currQuery, setCurrQuery] = useState(query);
    const [results, setResults] = useState("Loading...");
    const {books, loading} = useSelector(state => state.books)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function getAndLoadSearchResults(query) {
        const { payload } = await dispatch(searchBooksThunk({"query": query}));
        setResults(payload);
    }
    const searchHandler = async () => {
        getAndLoadSearchResults(currQuery);
        if (currQuery) {
            navigate(`/search/${currQuery}`);
        }
    }
    useEffect(() => {
        getAndLoadSearchResults(query);
    }, [dispatch, query]);
    return (
        <div>
            <div className="d-flex m-5">
                <textarea className="rounded-3 m-3 col-lg-10 col-9 p-2" placeholder="Search books..." rows="1" value={currQuery} onChange={(event) => setCurrQuery(event.target.value)}></textarea>
                <button className="align-self-center col-lg-1 col-2 ms-3 rounded-3" onClick={searchHandler}>Search</button>
            </div>
            <div className="d-flex m-5">
                <div className="d-flex row">
                    {
                        books.map(book =>
                            <div className="col-6 col-md-3 col-lg-3">
                                <BookItem
                                    book={book}/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
export default SearchResultsComponent;