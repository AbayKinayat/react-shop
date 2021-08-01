import React from 'react';
import './App.css';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {
  createOrder = (order) => {
    alert('Need to save order for ' + order.name);
  }

  // removeFromCart = (product) => {
  //   const cartItems = this.state.cartItems.slice();
  //   this.setState({
  //     cartItems: cartItems.filter((item) => item._id !== product._id)
  //   });
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((item) => item._id !== product._id)));
  // }
  // addToCart = (product) => {
  //   const cartItems = this.state.cartItems.slice();
  //   let alreadyInCart = false;
  //   cartItems.forEach((item) => {
  //     if (item._id === product._id) {
  //       item.count++
  //       alreadyInCart = true;
  //     }
  //   });
  //   if (!alreadyInCart) {
  //     cartItems.push({ ...product, count: 1 })
  //   }
  //   this.setState({ cartItems });
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // }
  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React-Shop</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter/>
                <Products />
              </div>
              <div className="sidebar">
                <Cart createOrder={this.createOrder} />
              </div>
            </div>
          </main>
          <footer>
            All right is reserved.
          </footer>
        </div>
      </Provider>
    );
  }
}

export default App;
