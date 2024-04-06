import React from "react";
import {generateStars} from "./generateStars";
import {Link} from "react-router-dom";

function getItemOfDay() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var day = date.getDate();
    var x = (y*m*day + y + m + day) % 100 + 1; // Ex: if date is 2024-04-05, x = (2024*4*5 + 2024+4+5) % 100 + 1 = 14
    return "https://dummyjson.com/products/" + x.toString();
}

const Home = () => {
    const [item, setItem] = React.useState({});

    React.useEffect(() => {
        fetch(getItemOfDay()).then(res => res.json()).then(data => setItem(data));
    }, []);

    return (
        <div>
            <div id="main">
                <h1>Welcome to Jaymart!</h1>

                <p>Established in 2024, Jaymart is an online retailer specializing in a wide variety of products, from electronics to clothes to jewelry to home decoration to auto parts to lighting. All of our products are selected to be the very best, and have earned at least 4-star average ratings on our website.
                </p>

                <p>Jaymart serves 170 countries and territories throughout the world, and offers free shipping throughout the United States and its territories. We are headquartered in Santa Clarita, California in the United States. As of April 5, 2024, Jaymart already has over 100,000 subscribed users.</p>

                <div id="start-button-container">
                    <Link to="/products"><button id="start"><b>Start shopping</b></button></Link>
                </div>

                <div class="gap"></div>

                <h2>Item of the Day</h2>
                <div id="dayItem">
                    <div id="dayItemImage">
                        <img src={item.thumbnail} class="thumbnail"></img>
                    </div>
                    <div id="dayItemTxt">
                        <p><b>{item.title}</b></p>
                        <p>Rating: {item.rating} {generateStars(item.rating)}</p>
                        <p>{item.description}</p>
                        <p><b>Price: ${item.price}</b></p>
                    </div>
                </div>

                <div class="gap"></div>

                <h2>Contact</h2>
                <p>
                    Global Corporate Office:
                    <ul>
                        <li><b>Email:</b> corporate@jaymart.com</li>
                        <li><b>Phone:</b> +1 661 555 5555</li>
                        <li><b>Corporate address:</b> 1 Main Street, Santa Clarita, California, 91355 US</li>
                    </ul>
                </p>
            </div>
        </div>
    );
};

export default Home;