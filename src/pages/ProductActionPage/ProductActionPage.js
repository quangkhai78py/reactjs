import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {actAddproductRequest, actGetProductRequest, actUpdateProductRequest} from './../../actions/index';
import { connect } from 'react-redux';
import products from '../../reducers/products';

class ProductActionPage extends Component {

    constructor(prosp) {
        super(prosp);
        this.state = ({
            id : '',
            txtName : '',
            txtPrice : '',
            chkbStatus : '',
        });
    }

    componentDidMount() {
        var { match } = this.props;
        if(match) {
            var id = match.params.id;
            this.props.onEditProduct(id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.itemEditing) {
            var {itemEditing} = nextProps;
            this.setState({
                id : itemEditing.id,
                txtName : itemEditing.name,
                txtPrice : itemEditing.price,
                chkbStatus : itemEditing.status
            });
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name] : value
        })
    }

    onSave = (e) => {
        e.preventDefault();
        var {id, txtName, txtPrice, chkbStatus} = this.state;
        var {history} = this.props;
        var products = {
            id : id,
            name : txtName,
            price : txtPrice,
            status : chkbStatus
        }
        if(id) { //update
            this.props.onUpdateProduct(products);
        }else {
            this.props.onAddProduct(products);
        }
        history.goBack();
    }

    render() {
        var {txtName, txtPrice, chkbStatus} = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit = {this.onSave}>
                    <div className="form-group">
                        <label>Tên Sản Phẩm: </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="txtName" 
                            value={txtName} 
                            onChange = {this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Giá Sản Phẩm: </label>
                        <input 
                            type="number" 
                            className="form-control" 
                            name="txtPrice" 
                            value = {txtPrice}
                            onChange = {this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng Thái: </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input 
                                type="checkbox" 
                                name="chkbStatus"
                                value = {chkbStatus}
                                onChange = {this.onChange}
                                checked = {chkbStatus}
                            />
                            Còn Hàng
                        </label>
                    </div>
                    <Link to = "/Product-list" className="btn btn-danger mr-10">
                        Trở Lại
                    </Link>
                    <button type="submit" className="btn btn-primary">Lưu Lại</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        itemEditing : state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddProduct : (products) => {
            dispatch(actAddproductRequest(products));
        },
        onEditProduct : (id) => {
            dispatch(actGetProductRequest(id));
        },
        onUpdateProduct : (products) => {
            dispatch(actUpdateProductRequest(products));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);