import React from "react";
import {generateStars} from "./generateStars";
import {Link} from "react-router-dom";

const Products = () => {
    const [products, setProducts] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [maxPrice, setMaxPrice] = React.useState('');
    const [selectedCategory, setCategory] = React.useState('');
    const [cart, setCart] = React.useState([]);

    React.useEffect(() => {
        fetch("https://dummyjson.com/products?limit=0")
        .then(res => res.json())
        .then(data => setProducts(data.products));
    }, []);

    const addToCart = (product) => {
        setCart(currentCart => {
            const isProductInCart = currentCart.find(item => item.id === product.id); // Check if item is already in cart
            if (!isProductInCart) {
                return [...currentCart, {...product, quantity: 1}];
            } else {
                return currentCart.map(item =>
                item.id === product.id ? {...item, quantity: item.quantity + 1} : item
                );
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(currentCart => currentCart.filter(item => item.id !== productId));
    };

    const increaseQty = (productId) => {
        setCart(currentCart => currentCart.map(item => item.id == productId ? {...item, quantity: item.quantity + 1} : item))
    };

    const decreaseQty = (productId) => {
        setCart(currentCart => currentCart.reduce((newCart, item) => {
            if (item.id === productId) {
                if (item.quantity > 1) {
                    newCart.push({...item, quantity: item.quantity - 1});
                }
            } 
            else {newCart.push(item);}
            return newCart;
        }, []));
    };
    

    const filteredProducts = products.filter(product => 
        (product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (maxPrice == "" || product.price <= maxPrice) && 
        (selectedCategory == "" || product.category.toLowerCase() == selectedCategory.toLowerCase()))
    );
    // used to show the list of products that satisfy a search term

    const totalCartPrice = cart.reduce((total, item) => {return total + (item.price * item.quantity);}, 0);
    // the total value of all the items in the cart

    return (
        <div id="main">
            <Link to="/">&lt; Back to Home Page</Link>
            <div id="cols">
                <div id="products">
                    <h1>Product List</h1>
                    <input
                        type="text"
                        placeholder="Search for products..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <br></br><br></br>
                    <input
                        type="number"
                        placeholder="Set max price..."
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <br></br><br></br>
                    Filter by category: <select onChange={(e) => setCategory(e.target.value)} value={selectedCategory}>
                        <option value="" selected>Any</option>
                        <option value="smartphones">Smartphones</option>
                        <option value="laptops">Laptops</option>
                        <option value="fragrances">Fragrances</option>
                        <option value="skincare">Skincare</option>
                        <option value="groceries">Groceries</option>
                        <option value="home-decoration">Home decoration</option>
                        <option value="furniture">Furniture</option>
                        <option value="tops">Tops</option>
                        <option value="womens-dresses">Women's dresses</option>
                        <option value="womens-shoes">Women's shoes</option>
                        <option value="mens-shirts">Men's shirts</option>
                        <option value="mens-shoes">Men's shoes</option>
                        <option value="mens-watches">Men's watches</option>
                        <option value="womens-watches">Women's watches</option>
                        <option value="womens-bags">Women's bags</option>
                        <option value="womens-jewellery">Women's jewelry</option>
                        <option value="sunglasses">Sunglasses</option>
                        <option value="automotive">Automotive</option>
                        <option value="motorcycle">Motorcycle</option>
                        <option value="lighting">Lighting</option>
                    </select>
                    {filteredProducts.map((product) => (
                        <div key={product.id}>
                        <h2>{product.title} <span id="category">{(product.category).charAt(0).toUpperCase() + (product.category).slice(1)}</span></h2>
                        <p>Rating: {product.rating} {generateStars(product.rating)}</p>
                        <img src={product.images[0]} height="100px"></img>
                        <p>{product.description} <br></br></p>
                        <p><b>Price: ${product.price}</b>&nbsp;&nbsp;&nbsp;<button onClick={() => addToCart(product)}>Add to Cart</button></p>
                        <br></br><br></br>
                        </div>
                    ))}
                </div>

                <div id="cart">
                    <h2>Cart</h2>
                    {cart.length > 0 ? (
                        <>
                        {cart.map((item) => (
                        <div key={item.id}>
                            <h3>{item.title}</h3>
                            <p>Quantity: {item.quantity}&nbsp;
                                <button onClick={() => increaseQty(item.id)} class="q"> + </button>&nbsp;
                                <button onClick={() => decreaseQty(item.id)} class="r"> - </button>
                            </p>   
                            <p>Unit price: ${item.price}</p>
                            <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
                        </div>
                        ))}
                        <p><b>Total cart price: ${totalCartPrice}</b></p>
                        <br></br>
                        <button id="purchase">Purchase items</button>
                        </>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;