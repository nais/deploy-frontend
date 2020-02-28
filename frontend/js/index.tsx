import * as React from 'react';
import * as DOM from 'react-dom';

import { Hovedknapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';

import './index.less';

function Application() {
    return (
        <div>
            <h1>Hei 4</h1>
            <Systemtittel>Test from react</Systemtittel>
            <Hovedknapp >Hei banan</Hovedknapp>
        </div>
    );
}

DOM.render(<Application />, document.getElementById('root'));