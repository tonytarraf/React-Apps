import React, { Component } from "react";

// push: will add the new address in the browser history.
// replace: will replcae the current address so we won't have history.

class ProductDetails extends Component {
    handleSave = () => {
        // Navigate to /products
        // this.props.history.push("/products");
        this.props.history.replace("/products");
    };

    render() {
        return (
            <div>
                <h1>Product Details - {this.props.match.params.id}</h1>
                <button onClick={this.handleSave}>Save</button>
            </div>
        );
    }
}

export default ProductDetails;