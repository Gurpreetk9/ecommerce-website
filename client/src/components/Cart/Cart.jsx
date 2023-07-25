import React from "react";
import "./Cart.scss";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useSelector} from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { useDispatch} from "react-redux";
import {makeRequest} from "../../makeRequest";
import {loadStripe} from '@stripe/stripe-js';

function Cart(){

    const products = useSelector(state => state.cart.products);
    const dispatch = useDispatch();
    const totalPrice = () =>{
        let total =0;
        products.forEach((item) => {
            total += item.quantity * item.price;
        });
        return total.toFixed(2);
    }

    const stripePromise = loadStripe("pk_test_51NWPJiSBk8GLLGIlsACQlP2dPgFeOycuiyXMrXLN5wyZv8To94Hby3RoeFbvNM4C3CfILEigFY3Y5fz0QphZet5s00BMKo38sa");
    const handlePayment = async ()=>{
        try{
            const stripe = await stripePromise;

            const res = await makeRequest.post("/orders",{
                products,
            });

            await stripe.redirectToCheckout({
                sessionId:res.data.stripeSession.id,
            });
        } catch(err){
            console.log(err);
        }
    }
    return (
        <div className="cart">
            <h1>Products in your cart</h1>
            {products?.map((item)=>{
                return  <div className="item" key={item.id}>
                            <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt=""></img>
                            <div className="details">
                                <h1>{item.title}</h1>
                                <p>{item.desc?.substring(1,100)}</p>
                                <div className="price"> {item.quantity} x ${item.price}</div>
                            </div>
                            <DeleteOutlineIcon className="deleteicon" onClick={()=>dispatch(removeItem(item.id))} style={{color:"red",fontSize:"30px",cursor:"pointer"}}/>
                        </div>
            })}
            <div className="total">
                <span>SUBTOTAL</span>
                <span>${totalPrice()}</span>
            </div>
            <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
            <span className="reset" onClick={()=>dispatch(resetCart())}>Reset Cart</span>
        </div>
    );
}

export default Cart;