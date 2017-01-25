import React from 'react';
import { Link } from 'react-router';

const Receipts = (props) => {

    let {receipts, current, children, onEditClick, onDeleteClick, editMode} = props;

    let amounts = receipts.map(x => x.amount);
    let total = amounts.reduceRight((prev, curr) => {
        return prev + curr
    },0);

    //tround to 2dp
    total = total.toFixed(2);
    var rows = receipts.map((receipt, idx) => {

        const editLink =
            <a href={`#/receipts/${receipt.id}/edit`}>
                <i className="fa fa-edit"> </i>
            </a>

        const deleteLink =
            <a href="" onClick={(e) => {
                e.preventDefault();
                onDeleteClick(receipt.id);
            } }>
                <i className="fa fa-trash"> </i>
            </a>

        const showLink =
            <a href={`#/receipts/${receipt.id}`}>
                <i className="fa fa-eye"> </i>
            </a>
        return (
            <tr key={receipt.id} className="">
                <td> {idx + 1}. </td>
                <td> {receipt.receivedFrom} </td>
                <td> {receipt.phoneNumber} </td>
                <td> {receipt.description} </td>
                <td> {receipt.amount} </td>
                <td>
                    {editLink}
                    {showLink}
                </td>
            </tr>
        );
    });

    let klass = '';
    if (editMode !== '') {
        klass = 'col-md-6';
    } else {
        klass = "col-md-12";
    }

    return (
        <div className="">

            <div className="col-md-12">
                <div className="total">
                    Total : <span className="total-amount"> {total} </span>
                </div>
            </div>

            <div className={klass}>
                <div className="content-header">
                    <span className="title"> Receipts </span>
                    <span className="pull-right">
                        <Link to="/receipts/new" className="btn btn-primary"> New Receipt </Link>
                    </span>
                </div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th className="col-1"> </th>
                            <th> Name </th>
                            <th> Phone </th>
                            <th> Description </th>
                            <th> Amount </th>
                            <th className="col-2"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div >
            <div className={klass}>
                {props.children}
            </div>
        </div>
    )
}

export default Receipts;