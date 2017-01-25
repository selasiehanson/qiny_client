import 'bootstrap/dist/css/bootstrap.css';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery
// var $ = require('jquery')
// window.$ = window.jQuery = $;
// import 'bootstrap/dist/js/bootstrap.js'
import 'font-awesome/css/font-awesome.css';
import './App.css';
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';

import * as fn from './shell';
fn.run('root');
