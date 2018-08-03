import React, {Component, Fragment} from 'react';
import {handleInitialData} from '../actions/app';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading-bar'; 
import Leaderboard from './Leaderboard'; 
import AddPoll from './AddPoll'; 
import Poll from './Poll'; 
import Nav from './Nav';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <div className='container'>
            <Nav/>
            {
              !this.props.loading 
                ? <div>
                  <Route exact path='/' component={Dashboard} />
                  <Route exact path='/leaderboard' component={Leaderboard} />
                  <Route exact path='/polls/:id' component={Poll} />
                  <Route exact path='/add' component={AddPoll} />
                </div>
                : null
            }
          </div>
        </Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.any,
};

function mapStateToProps({authedUser}) {
  return {
    loading:  authedUser === null,
  };
}

export default connect(mapStateToProps)(App);