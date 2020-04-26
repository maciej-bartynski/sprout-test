import React from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import Signin from '../../RouteComponents/Signin';
import Signup from '../../RouteComponents/Signup';
import Home from '../../RouteComponents/Home';
import Navigation from '../../Components/Navigation';

const webSocket = new WebSocket(`ws://localhost:8080`);

const App = () => {
    return <BrowserRouter>
        <Navigation />
        <Switch>
            <Route
                path={'/signin'}
                exact
                component={Signin}
            />
            <Route
                path={'/signup'}
                exact
                component={Signup}
            />
            <Route
                path={'/'}
                render={()=><Home webSocket={webSocket} />}
            />
        </Switch>
    </BrowserRouter>
}

export default App;