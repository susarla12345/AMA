import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import firebase from '../../utils/firebase';

import '../question/style.scss';
import { ReactComponent as Like } from '../../public/images/like.svg';
import { ReactComponent as Dislike } from '../../public/images/dislike.svg';


class Question extends React.Component {

  componentDidMount() {
    this.setState({
      like: this.props.question.likes.includes(this.props.user.id),
      dislike: this.props.question.dislikes.includes(this.props.user.id)
    })
  }

  constructor() {
    super();

    this.state = {
      like: false,
      dislike: false
    }
  }

  like = (question) => {
    let db = firebase.firestore();
    let questionRef = db.collection("questions").doc(question.id);
    let { likes, dislikes } = question
    let { like } = this.state;
    let { id } = this.props.user;
    if(!like) {
      likes.push(id)
      if(dislikes.includes(id)) {
        let index = dislikes.indexOf(id);
        dislikes.splice(index, 1);
      }
    } else {
      let index = likes.indexOf(id);
      likes.splice(index, 1);
    }
    questionRef.update({
      likes,
      dislikes
    }).then(() => {
      debugger;
      this.setState({
        like: !this.state.like,
        dislike : false
      })
    }).catch((error) => {
      alert(error);
    })
    
  }

  dislike = (question) => {
    let db = firebase.firestore();
    let questionRef = db.collection("questions").doc(question.id);
    let { dislikes, likes } = question
    let { dislike } = this.state;
    let { id } = this.props.user;

    if(!dislike) {
      dislikes.push(id)
      if(likes.includes(id)) {
        let index = likes.indexOf(id);
        likes.splice(index, 1);
      }
    } else {
      let index = dislikes.indexOf(id);
      dislikes.splice(index, 1);
    }

    questionRef.update({
      likes,
      dislikes
    }).then(() => {
      debugger;
      this.setState({
        like: false,
        dislike : !this.state.dislike
      })
    }).catch((error) => {
      alert(error);
    })
  }

  render() {
    let { question } =  this.props;
    return(
      <div className="question-wrapper mb-12">
        <h4 className="title mb-0 mt-0">{question.title}</h4>
        <div className="author-details mt-8">
          <span className="author-name mr-4">{question.createdBy}</span>
          <span className="mr-4">.</span>
          <span className="created-on"><Moment fromNow>{new Date(question.createdOn.seconds * 1000)}</Moment></span>
          
        </div>
        <div class="tags mt-8">
          {
            question.tags.map((tag) => {
              return (
                <span class="tag">{tag}</span>
              )
            })
          }
        </div>
        <div className="description mt-8">{question.description}</div>
        <div className="voting-section">
          <div className="votes">
            {question.likes.length + question.dislikes.length} votes
          </div>

          <a className={`like mr-8 ${this.state.like ? 'liked' : ''}`} role="button" onClick={() => this.like(question)}>
            <span className="mr-4 likes-count">{question.likes.length}</span><Like />
          </a>

          <a className={`dislike ${this.state.dislike ? 'disliked' : ''}`} role="button" onClick={() => this.dislike(question)}>
            <span className="mr-4 dislikes-count">{question.dislikes.length}</span><Dislike />
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: {...state.currentUser}
  }
}

export default Question;