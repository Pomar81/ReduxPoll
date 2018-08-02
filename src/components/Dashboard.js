import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Dashboard extends Component {
  state = {
    showAnswered: false,
  }

  showAnswered = () => {
    this.setState({showAnswered: true});
  }

  showUnanswered = () => {
    this.setState({showAnswered: false});
  }

  render() {
    const {showAnswered} = this.state;
    const {answered, unanswered} = this.props;
    const list = showAnswered ? answered : unanswered;
    return (
      <div>
        <div className="dashboard-toggle">
          <button
            style = {{textDecoration: !showAnswered ? 'underline' : 'none'}}
            onClick = {this.showUnanswered}
          >
            Unanswered
          </button>
          <button
            style = {{textDecoration: showAnswered ? 'underline' : 'none'}}
            onClick = {this.showAnswered}
          >
            Answered
          </button>
        </div>
        <ul className="dashboard-list">
          {
            list.map(poll => (
              <li key={poll.id}>
                {poll.question}
              </li>
            ))
          }
        </ul> 
      </div>
    );
  }
}

function mapStateToProps({authedUser, polls, users}) {
  if (authedUser) {
    const answers = users[authedUser].answers;
    const answered = answers.map(id => polls[id])
      .sort((a, b) => b.timestamp - a.timestamp);
  
    const unanswered = Object.keys(polls)
      .filter(id => !answers.includes(id))
      .map(id => polls[id])
      .sort((a, b) => b.timestamp - a.timestamp);
     
    return {
      answered,
      unanswered,
    };
  }
  
  return {
    answered: [],
    unanswered: [],
  };
}


Dashboard.propTypes = {
  answered: PropTypes.array,
  unanswered: PropTypes.array,
};

export default connect(mapStateToProps)(Dashboard);