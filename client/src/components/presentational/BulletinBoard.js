import React, { Component, PropTypes } from 'react';
import '../../styles/css/polling.css';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

class BulletinBoard extends Component {

  static propTypes = {
    winner: PropTypes.object.isRequired
  }

  render() {
    const { winner } = this.props;
    return (
      <div className="winner">
        <Link to="/dashboard"><button>Back to Dashboard</button></Link>
        <div className="winnerContent">
          <h1>
            <FontAwesome name='sign-language' size='2x' style={{ color: 'white' }} />
              Winner!
            <FontAwesome name='sign-language' size='2x' style={{ color: 'white' }} />
          </h1>
          <h1>{ winner.choice[0].name }</h1>
          <div><img className="profilePicture" alt={ winner.choice[0].name } src={ winner.choice[0].imageURL } /></div>
          <br></br>
          <button className="infoBtn">
                <a className="btnLink" href={winner.choice[0].url} target='_blank'>Info</a>
            </button>
        </div>
      </div>
    );
  }
};

export default BulletinBoard;
