import * as React from 'react';
import * as DOM from 'react-dom';

import { Hovedknapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
//import { ApiKeys } from './apiKeys/apiKeys'
import ApiKeys from './apiKeys/apiKeys'

import './index.less';

function Application() {
    return (
            <ApiKeys/>
    );
}

DOM.render(<Application />, document.getElementById('root'));