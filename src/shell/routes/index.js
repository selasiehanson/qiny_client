import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from '../components/layout';
import Dashboard from '../components/dashboard/Dashboard';
import Report from '../components/Report';
import ClientList from '../components/clients/client-list';
import Client from '../components/clients/client';
import InvoiceList from '../components/invoices/invoice-list';
import Invoice from '../components/invoices/invoice';
import ProductList from '../components/products/product-list';
import Product from '../components/products/product';
import TaxList from '../components/taxes/tax-list';
import Tax from '../components/taxes/tax';
import SignIn from '../components/layout/sign-in';
import Register from '../components/layout/register';
import AccountChooser from '../components/layout/account-chooser';
export default (
    <Route path="/" component={Layout}>
        <IndexRoute component={Dashboard} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="chooser" component={AccountChooser} />
        <Route path="/clients">
            <IndexRoute component={ClientList} />
            <Route path="/clients/new" component={Client} />
            <Route path="/clients/:id/edit" component={Client} />
        </Route>
        <Route path="/invoices">
            <IndexRoute component={InvoiceList} />
            <Route path="/invoices/new" component={Invoice} />
            <Route path="/invoices/:id/edit" component={Invoice} />
        </Route>
        <Route path="/products" >
            <IndexRoute component={ProductList} />
            <Route path="/products/new" component={Product}> </Route>
            <Route path="/products/:id/edit" component={Product}> </Route>
        </Route>
        <Route path="/taxes" >
            <IndexRoute component={TaxList} />
            <Route path="/taxes/new" component={Tax}> </Route>
            <Route path="/taxes/:id/edit" component={Tax}> </Route>
        </Route>
        <Route path="reports" component={Report} />
        <Route path="signup" component={Register} />
        <Route path="signin" component={SignIn} />
    </Route>
);