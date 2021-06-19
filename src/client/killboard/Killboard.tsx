import { Route, RouteComponentProps, Switch, useLocation } from 'react-router';
import * as React from 'react';
import { Page404 } from '../404';
import KillboardFull from './KillboardFull';
import KillboardHorizontal from './KillboardHorizontal';
import KillboardVertical from './KillboardVertical';
import KillboardPlayer from './KillboardPlayer';
import './Killboard.css';
import { Character } from '../../lib/models/KQStream';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

class Killboard extends React.Component<RouteComponentProps<{}>> {
  render() {
    const query = useQuery();
    const queryAddress = query.get('address');
    let address = 'kq.local';
    if (queryAddress) {
      address = queryAddress;
    }

    return (
      <Switch>
        <Route
          exact={true}
          path={`${this.props.match.path}/full`}
          render={() => <KillboardFull address={address} />}
        />
        <Route
          exact={true}
          path={`${this.props.match.path}/horizontal/blue`}
          render={() => (
            <KillboardHorizontal address={address} team="blue" mirror={false} />
          )}
        />
        <Route
          exact={true}
          path={`${this.props.match.path}/horizontal/gold`}
          render={() => (
            <KillboardHorizontal address={address} team="gold" mirror={false} />
          )}
        />
        <Route
          exact={true}
          path={`${this.props.match.path}/horizontal/blue/mirror`}
          render={() => (
            <KillboardHorizontal address={address} team="blue" mirror={true} />
          )}
        />
        <Route
          exact={true}
          path={`${this.props.match.path}/horizontal/gold/mirror`}
          render={() => (
            <KillboardHorizontal address={address} team="gold" mirror={true} />
          )}
        />
        <Route
          exact={true}
          path={`${this.props.match.path}/vertical/blue`}
          render={() => <KillboardVertical address={address} team="blue" />}
        />
        <Route
          exact={true}
          path={`${this.props.match.path}/vertical/gold`}
          render={() => <KillboardVertical address={address} team="gold" />}
        />
        <Route
          exact={true}
          path={`${this.props.match.path}/vertical/blue/mirror`}
          render={() => (
            <KillboardVertical address={address} team="blue" mirror={true} />
          )}
        />
        <Route
          exact={true}
          path={`${this.props.match.path}/vertical/gold/mirror`}
          render={() => (
            <KillboardVertical address={address} team="gold" mirror={true} />
          )}
        />
        <Route
          exact={true}
          path={`${this.props.match.path}/player/:character`}
          render={(props) => (
            <KillboardPlayer
              address={address}
              character={Character[props.match.params.character]}
            />
          )}
        />
        <Route component={Page404} />
      </Switch>
    );
  }
}

export default Killboard;
