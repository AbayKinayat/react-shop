import React, { Component } from 'react'
import { Fade, Zoom } from 'react-reveal'
import Modal from 'react-modal';
import formatCurrency from "../util"
import { fetchProducts } from '../actions/productActions';
import { connect } from 'react-redux';

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
    }
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  openModal = (product) => {
    this.setState({
      product
    })
  }

  closeModal = () => {
    this.setState({
      product: null
    })
  }

  modalAddToCart = (product) => {
    this.closeModal();
    this.props.addToCart(product);
  }

  render() {
    const { product } = this.state;

    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? <div>Loading...</div> : 
          <ul className="products">
            {
              this.props.products.map(product =>
                <li key={product._id}>
                  <div className="product">
                    <a href={"#" + product._id} onClick={this.openModal.bind(null, product)}>
                      <img src={product.images} alt={product.title} />
                      <p>
                        {product.title}
                      </p>
                      <div className="product-price">
                        <div>
                          {formatCurrency(product.price)}
                        </div>
                        <button onClick={() => this.props.addToCart(product)} className="button primary">Add To Cart</button>
                      </div>
                    </a>
                  </div>
                </li>
              )
            }
          </ul>}

        </Fade>
        {
          product &&
          <Modal
            isOpen={true}
            onRequestClose={this.closeModal}
          >
            <Zoom>
              <div>
                <button
                  className="close-modal"
                  onClick={this.closeModal}
                >
                  X
                </button>
                <div className="product-details">
                  <img src={product.images} alt={product.title} />
                  <div className="product-details-description">
                    <p>
                      {product.title}
                    </p>
                    <p>
                      {product.description}
                    </p>
                    <p>
                      Available Sizes:{" "}
                      {product.availableSizes.map((x) => (
                        <span>{" "} <button className="button">{x}</button></span>
                      ))}
                    </p>
                    <div className="product-price">
                      <div>
                        {formatCurrency(product.price)}
                      </div>
                      <button
                        onClick={this.modalAddToCart.bind(null, product)}
                        className="button primary"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        }
      </div>
    )
  }
}

export default connect((state) => ({ products: state.products.filteredItems }), { fetchProducts, })(Products);