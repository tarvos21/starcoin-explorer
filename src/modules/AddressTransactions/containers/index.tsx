import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import List from '../components/List/adapter';

interface TransactionsRouterProps {
  computedMatch: any;
}

class TransactionsRouter extends PureComponent<TransactionsRouterProps> {
  render() {
    const { computedMatch: match } = this.props;
    return (
      <Switch>
        <Route path={`${match.path}/:page`} render={(props: any) => (<List {...props} />)} />
      </Switch>
    );
  }
}

export default TransactionsRouter;
