import React, { Component } from 'react'
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Fade, Zoom } from 'react-reveal';
import formatCurrency from '../util';
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";

class Cart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      address: '',
      showCheckout: false,
    };
  }
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, b) => a + b.price * b.count, 0)
    }
    this.props.createOrder(order);
  }

  closeModal= () => {
    this.props.clearOrder();
  }

  render() {
    const { cartItems, order } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty...</div>
        ) :
          (
            <div className="cart cart-header">You have {cartItems.length} items in the cart{" "}</div>
          )
        }
        {
          order && (
            <Modal
              isOpen="true"
              onRequestClose={this.closeModal}
            >
              <Zoom>
                <button className="close-model" onClick={this.closeModal}>X</button>
                <div className="order-details">
                  <h1 className="success-message">
                    Your order has been placed
                  </h1>
                  <h2>Order: {order._id}</h2>
                  <ul>
                    <li>
                      <div>Name:</div>
                      <div>{order.name}</div>
                    </li>
                    <li>
                      <div>Email:</div>
                      <div>{order.email}</div>
                    </li>
                    <li>
                      <div>Address:</div>
                      <div>{order.address}</div>
                    </li>
                    <li>
                      <div>Date:</div>
                      <div>{order.createdAts}</div>
                    </li>
                    <li>
                      <div>Total:</div>
                      <div>{formatCurrency(order.total)}</div>
                    </li>
                    <li>
                      <div>Items:</div>
                      <div>{order.cartItems.map(item => 
                        <div>{item.count} {" X "} {item.title} </div>
                      )}</div>
                    </li>
                  </ul>
                </div>
              </Zoom>
            </Modal>
          )
        }
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {
                  cartItems.map((item) =>
                    <li key={item._id}>
                      <div>
                        <img src={item.images} alt={item.title} />
                      </div>
                      <div>
                        <div>{item.title}</div>
                        <div className="right">
                          {formatCurrency(item.price)} x {item.count}{"   "}
                          <button className="button" onClick={() => this.props.removeFromCart(item)}>remove</button>
                        </div>
                      </div>
                    </li>
                  )
                }
              </ul>
            </Fade>
          </div>
          {
            cartItems.length !== 0 && (
              <div>
                <Fade bottom>
                  <div className="cart">
                    <div className="total">
                      <div>
                        Total:{" "}
                        {formatCurrency(cartItems.reduce((a, b) => a + b.price * b.count, 0))}
                      </div>
                      <button onClick={() => this.setState({ showCheckout: true })} className="button primary">Proceed</button>
                    </div>
                  </div>
                </Fade>
                {this.state.showCheckout &&
                  <Fade bottom>
                    <div className="cart">
                      <form onSubmit={this.createOrder}>
                        <ul className="form-container">
                          <li>
                            <label htmlFor="email">Email</label>
                            <input
                              id="email"
                              name="email"
                              placeholder="john.valedskoy@gmail.com"
                              type="email"
                              required
                              onChange={this.handleInput}
                            />
                          </li>
                          <li>
                            <label htmlFor="name">Name</label>
                            <input
                              id="name"
                              name="name"
                              placeholder="John"
                              type="text"
                              required
                              onChange={this.handleInput}
                            />
                          </li>
                          <li>
                            <label htmlFor="address">Address</label>
                            <input
                              id="address"
                              name="address"
                              placeholder="street 2902 Park Avenue"
                              type="text"
                              required
                              onChange={this.handleInput}
                            />
                          </li>
                          <li>
                            <button
                              type="submit"
                              className="button primary"
                            >
                              Checkout
                            </button>
                          </li>
                        </ul>
                      </form>
                    </div>
                  </Fade>
                }
              </div>
            )
          }
        </div>
      </div>
    )
  }
}


export default connect(
  (state) =>
  ({
    cartItems: state.carts.cartItems,
    order: state.order.order,
  }),
  {
    removeFromCart,
    createOrder,
    clearOrder,
  }
)(Cart)