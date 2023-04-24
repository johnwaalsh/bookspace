import React, {useEffect, useState} from "react";
import {getBookThunk} from "../services/book-thunks";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

const MiniReview = ({review}) => {
    let text = review.text;
    if (text.length > 50) {
        text = text.substring(0, 50) + "..."
    }
    return(
        <Link className="text-decoration-none text-black d-flex border mb-3 pb-4 border-top-0 border-start-0 border-end-0" to={"/details/" + review.book}>
            <>{"image" in review && <div className="d-flex align-self-center text-bg-light rounded-3 col-12">
                <img className="col-3 p-2 align-self-center" style={{maxWidth: 150}} src={review.image}/>
                <div className="d-flex flex-column">
                <h6 className="p-2 m-2">{review.title}</h6>
                <div>
                    <>{review.rating === 0 && <i style={{fontSize: 15}}
                                                 className="ps-2 ms-2 m-1 align-self-center bi bi-star text-warning"></i>}</>
                    <>{review.rating > 0 && <i style={{fontSize: 15}}
                                               className="ps-2 ms-2 m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                    <>{review.rating < 2 && <i style={{fontSize: 15}}
                                               className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                    <>{review.rating > 1 && <i style={{fontSize: 15}}
                                               className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                    <>{review.rating < 3 && <i style={{fontSize: 15}}
                                               className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                    <>{review.rating > 2 && <i style={{fontSize: 15}}
                                               className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                    <>{review.rating < 4 && <i style={{fontSize: 15}}
                                               className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                    <>{review.rating > 3 && <i style={{fontSize: 15}}
                                               className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                    <>{review.rating < 5 && <i style={{fontSize: 15}}
                                               className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                    <>{review.rating > 4 && <i style={{fontSize: 15}}
                                               className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                </div>
                <span className="ps-2 m-2">{text}</span>
            </div></div>}</>
            <>{!("image" in review) && <div className="d-flex flex-column text-bg-light rounded-3 col-12">
                <h6 className="p-2 m-2">{review.title}</h6>
                <div>
                    <>{review.rating === 0 && <i style={{fontSize: 15}}
                                          className="ps-2 ms-2 m-1 align-self-center bi bi-star text-warning"></i>}</>
                    <>{review.rating > 0 && <i style={{fontSize: 15}}
                                        className="ps-2 ms-2 m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                    <>{review.rating < 2 && <i style={{fontSize: 15}}
                                        className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                    <>{review.rating > 1 && <i style={{fontSize: 15}}
                                        className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                    <>{review.rating < 3 && <i style={{fontSize: 15}}
                                        className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                    <>{review.rating > 2 && <i style={{fontSize: 15}}
                                        className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                    <>{review.rating < 4 && <i style={{fontSize: 15}}
                                        className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                    <>{review.rating > 3 && <i style={{fontSize: 15}}
                                        className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                    <>{review.rating < 5 && <i style={{fontSize: 15}}
                                        className="m-1 align-self-center bi bi-star text-warning"></i>}</>
                    <>{review.rating > 4 && <i style={{fontSize: 15}}
                                        className="m-1 align-self-center bi bi-star-fill text-warning"></i>}</>
                </div>
                <span className="ps-2 m-2">{text}</span>
            </div>}</>
        </Link>
    );
};
export default MiniReview;