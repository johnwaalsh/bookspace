import React, { useState, useEffect } from "react";
import {useDispatch } from "react-redux";
import {useParams} from "react-router";
import {loginThunk, publicProfileThunk}
    from "../services/auth-thunks";
import { useNavigate } from "react-router";

function SearchComponent() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const searchHandler = async () => {
        if (query) {
            navigate(`/search/${query}`);
        }
    };
    return (
        <div>
            <div className="d-flex m-5">
                <textarea className="rounded-3 m-3 col-10 p-2" placeholder="Search books..." rows="1" value={query} onChange={(event) => setQuery(event.target.value)}></textarea>
                <button className="align-self-center col-1 ms-3" onClick={searchHandler}>Search</button>
            </div>
        </div>
    );
}
export default SearchComponent;