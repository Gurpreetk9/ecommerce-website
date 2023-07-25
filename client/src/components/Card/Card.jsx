import React from "react";
import "./Card.scss";
import {Link} from "react-router-dom";
function Card(props){
    return (
        <Link className="link" to={`/product/${props.item.id}`}>
            <div className="card">
                <div className="image">
                    {props.item?.attributes?.isNew && <span>New Season</span>}
                    <img src={process.env.REACT_APP_UPLOAD_URL + props.item.attributes?.img?.data?.attributes?.url} alt="" className="mainImg"></img>
                    <img src={process.env.REACT_APP_UPLOAD_URL + props.item.attributes?.img2?.data?.attributes?.url} alt="" className="secondImg"></img>
                </div>
                <h2>{props.item?.attributes?.title}</h2>
                <div className="prices">
                    <h3>${props.item.oldPrice || props.item?.attributes?.price + 20}</h3>
                    <h3>${props.item?.attributes?.price}</h3>
                </div>
            </div>
        </Link>
    );

};

export default Card;