import React from "react";
import Card from "../Card/Card"
import "./FeaturedProducts.scss";
import useFetch from "../../hooks/useFetch";
const FeaturedProducts = ({type}) => {
    

   const {data,laoding,error} = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`);

    console.log(data);
    return (
        <div className="featuredProducts">
            <div className="top">
                <h1>{type} products</h1>
                <p>Lorem ipsum dolor sit amet. A quasi sint est rerum sunt et aliquid corrupti. Ut nihil
                 dolores ut earum animi qui quaerat corporis. Est fugiat quas ab maiores fuga et 
                 autem modi aut internos deserunt.</p>
            </div>
            <div className="bottom">
                {error ? "Something went wrong!":(laoding ? "loading" : 
                            data?.map((item)=>{
                            return <Card item={item} key={item.id}/>
                            }))
                }
            </div>
        </div>
    );
}

export default FeaturedProducts;