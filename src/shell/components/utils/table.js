import React, { Component } from 'react';

export default class Table extends Component {    

    actionClicked(data, event) {
        try {
            this.props.handleEvent(data.action, data.data);
        } catch (e) {
            console.error(e);
        }

        event.preventDefault();
    }

    renderRows(tableData, actionCols, tableFields, columnWrappers = {}) {
        let fields = tableFields
            .filter(x => x.type !== 'action')
            .map(x => x.name);
        
        return tableData
            .map((data, index) => {
                let row = fields.map((columnKey, key) => {
                    let itemToDisplay = data[columnKey];
                    let displayFn = columnWrappers[columnKey] ? columnWrappers[columnKey] : null;

                    let row =
                        <td key={key}> {itemToDisplay}</td>
                    if (displayFn) {
                        row = <td key={key}> {displayFn(itemToDisplay)} </td>
                    }
                    return row;
                });

                let actions = actionCols.map((actionData, idx) => {

                    let item = { data: data, action: actionData.action }
                    let col = null;
                    let displayFn = columnWrappers[actionData['name']] ? columnWrappers[actionData['name']] : null;
                    if (displayFn) {
                        col = <td key={idx} className="col-1">
                            <a href="" onClick={this.actionClicked.bind(this, item)}>
                                {displayFn()}
                            </a>
                        </td>
                    } else {
                        col = <td key={idx} className="col-1">
                            <a href="" onClick={this.actionClicked.bind(this, item)}> {actionData.name} </a>
                        </td>
                    }
                    return col;
                });

                return (
                    <tr key={index}>
                        <td> {index + 1}. </td>
                        {row}
                        {actions}
                    </tr>
                );
            });
    }

    renderHeaders(tableFields, actionCols) {

        let tableHeaders =
            tableFields
                .map((x, idx) => <th key={idx}> {x.header} </th>);

        return (
            <tr>
                <th className="col-1"> </th>
                {tableHeaders}                
            </tr>
        )
    }

    render() {
        let {
            tableData = [],
            tableFields = [],                    
            columnWrappers
        } = this.props;

        let actionCols =
            tableFields
                .filter(x => x.type === 'action');

        let headers = this.renderHeaders(tableFields, actionCols);
        let rows = this.renderRows(tableData, actionCols, tableFields, columnWrappers);

        return (
            <div>
                <div className="">
                    <table className="table-custom table">
                        <thead>
                            {headers}
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}