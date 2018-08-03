import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPercentage} from '../utils/helpers';
import {handleAddAnswer} from '../actions/answers';

const getVoteKeys = () => ['aVotes', 'bVotes', 'cVotes', 'dVotes'];

class Poll extends Component {
  static propTypes = {
    poll: PropTypes.object,
    vote: PropTypes.node,
    authorAvatar: PropTypes.node,
    dispatch: PropTypes.func.isRequired,
    authedUser: PropTypes.string,

  }

  handlerAnswer = (answer) => {
    const {poll, authedUser} = this.props;
    const {id} = poll;
    this.answered = true;
    this.props.dispatch(handleAddAnswer({ id, authedUser, answer }));
  }
  
  render() {

    if (this.props.poll === null) {
      return <p>{'This poll doesn\'t exist'}</p>;
    }

    const {poll, vote, authorAvatar} = this.props;

    const totalVotes = getVoteKeys()
      .reduce((total, key) => total + poll[key].length, 0);


    return (
      
      <div className='poll-container'>
        <h1 className='question'>
          {poll.question}
        </h1>
        <div className='poll-author'>
          By <img src={authorAvatar} alt={`avatar of ${poll.author}`}/>
        </div>
        <ul>
          {
            ['aText', 'bText', 'cText', 'dText'].map(key =>{
              const count = poll[key[0] + 'Votes'].length;

              return (
                <li 
                  className={`option ${vote === key[0] ? 'chosen' :''}`}
                  key={key}
                  onClick={() => {
                    if (vote === null && !this.answered) {
                      this.handlerAnswer(key[0]);}
                  }}
                >
                  { 
                    vote === null 
                      ? poll[key]
                      : <div className ='result'>
                        <span>{poll[key]}</span>
                        <span>{getPercentage(count, totalVotes)}%({count})</span>
                      </div>
                  }
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({authedUser, polls, users}, {match}) => {
  const {id} = match.params;
  const poll = polls[id];

  if (!poll) {
    return {
      poll: null,
    };
  }

  const vote = getVoteKeys().reduce((vote, key)=>{
    if (vote !== null) {
      return vote;
    }

    return poll[key].includes(authedUser)
      ? key[0]
      : vote;
  }, null);

  return {
    poll,
    vote,
    authedUser,
    authorAvatar: users[poll.author].avatarURL,
  };
};

export default connect(mapStateToProps)(Poll);
