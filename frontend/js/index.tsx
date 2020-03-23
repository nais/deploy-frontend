
import React from 'react';
import * as DOM from 'react-dom';

import Header from './ui/header'
import { BrowserRouter as Router } from 'react-router-dom';
//import { ApiKeys } from './apiKeys/apiKeys'
import ApiKeys from './apiKeys/apiKeys'

import './styles.less';



function Application() {
    return (
        <Router>
        <div className="mainWrapper">
            <Header/>
            <ApiKeys/>
        </div>
        </Router>
    );
}





DOM.render(<Application />, document.getElementById('root'));