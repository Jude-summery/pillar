import React from 'react'
import { Route, Switch } from 'react-router-dom'

// 引入页面
import Home from './pages/Home';
import Page from './pages/Page';

// 路由
const getRouter = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/page" component={Page}/>
    </Switch>
);

export default getRouter;
