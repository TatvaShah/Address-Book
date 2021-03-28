import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import UsersPage from '../pages/users';
import UserDetail from '../pages/users/detail';
import NotFound from '../pages/notfound';
import { Container } from 'react-bootstrap';

export default function RouterComponent() {
	return (
        <Container className="body-container">
            <Switch history={""}>
                <Route exact path="/" render={() => (<Redirect to="/users" />)} />
                <Route exact path="/users" component={UsersPage} />
                <Route exact path="/users/:id" component={UserDetail} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Container>
    );
}