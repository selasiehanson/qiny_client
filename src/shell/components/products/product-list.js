import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../utils/table'
import { Link } from 'react-router';
import { getProducts } from '../../actions/products';
import { hashHistory } from 'react-router';

class ProductList extends Component {

    constructor(props) {
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
    }

    componentWillMount() {
        this.props.loadProducts();
    }

    //calls the appropriate method based on the action button/text that 
    //was clicked.
    handleEvent(eventName, data) {
        this[eventName](data);
    }

    viewProduct(product) {
        hashHistory.push(`/products/${product.id}`);
    }

    editProduct(product) {
        hashHistory.push(`/products/${product.id}/edit`);
    }

    render() {
        let {products } = this.props;
        let tableFields = [
            { name: 'name', header: "Name" },
            { name: 'description', header: "Description" },
            { name: "product_type", header: "Product Type" },
            { name: "reorder_level", header: "Re-Order Level" },
            { name: 'view', type: 'action', header: '', action: 'viewProduct' },
            { name: 'edit', type: 'action', header: '', action: 'editProduct' }
        ];

        let content = <div className="zero-items">
            <p>No products present, kindly add one. </p>
            <p> <Link to="/products/new" className="btn btn-primary"> New Product </Link> </p>
        </div>
        let newProductLink;
        let columnWrappers = {
            view(f) {
                return <span> <i className="fa fa-eye"> </i> </span>
            },
            edit(f) {
                return <span> <i className="fa fa-pencil"> </i> </span>
            }
        }

        if (products.length !== 0) {
            content = <Table
                tableData={products}
                tableFields={tableFields}
                handleEvent={this.handleEvent}
                columnWrappers={columnWrappers} />

            newProductLink = <Link to="/products/new" className="btn btn-primary"> New Product </Link>
        }

        return (
            <div>
                <div className="content-header">
                    <span className="title"> Products </span>
                    <span className="pull-right">
                        {newProductLink}
                    </span>
                </div>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (state, ownState) => {
    return {
        products: state.products.all
    }
}


const mapDispatchToProps = (dispatch, state) => {
    return {
        loadProducts() {
            dispatch(getProducts())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
