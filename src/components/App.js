import React, {Component} from 'react';
import {handleInitialData} from '../actions/app';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading-bar'; 
import Leaderboard from './Leaderboard'; 
import AddPoll from './AddPoll'; 

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div>
        <LoadingBar/>
        {
          !this.props.loading 
            ? <AddPoll/>
            : null
        }
      </div>
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