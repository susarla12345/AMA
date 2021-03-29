import React from 'react';
import firebase from '../../utils/firebase';
import { connect } from 'react-redux';
import FormButton from '../form-button/component';
import NewQuestion from '../new-question/component';
import Question from '../question/component';

import '../questions/styles.scss';

const FILTERS = ['Product development', 'Sales and support', 'Employee and culture', 'Buisiness updates', 'Policies', 'Facilities', 'Others'];

class Questions extends React.Component {

  constructor() {
    super();

    this.state = {
      questions : [],
      unfilteredQuestions: [],
      createQuestion: false,
      filterApplied: false,
      currentFilter: null
    }
  }

  componentDidMount() {
    let db = firebase.firestore();
    // db.settings({
    //   timestampsInSnapshots: true
    // });

    const userRef = db.collection("questions").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let question = {
          id: doc.id,
          ...doc.data()
        }

        let newQuestions = [...this.state.questions, question]

        this.setState({
          questions: newQuestions,
          unfilteredQuestions: newQuestions
        }, () => console.log(this.state))
      });
    });
  }

  createQuestion = (questionObj) => {
    let db = firebase.firestore();
    let dataObject = {
      title: questionObj.title,
      createdBy: "Anonymous",
      createdOn: new Date(),
      description: questionObj.description,
      sessionId: "zTcBDjlKn9gO6iVM1Xf2",
      tags: questionObj.tags.map((value) => value.value)
    }
    db.collection("questions").add(dataObject).then((docRef) => {
      let newQuestions = this.state.questions.slice();
      newQuestions.push(dataObject);

      this.setState({ questions: newQuestions, createQuestion: false })
    }).catch((error) => {
      alert(error);
    })
  }

  openQuestionModal = () => {
    this.setState({
      ...this.state,
      createQuestion: true
    });
  }

  closeModal() {
    this.setState({
      ...this.state,
      createQuestion: false
    });
  }

  handleSort = (type) => {
    switch(type) {
      case 'popular': {
        let { questions } = this.state;
        let sortedQuestions = questions.sort((a, b) => {
          return ((b.likes.length + b.dislikes.length) - (a.likes.length + a.dislikes.length));
        });

        this.setState({
          ...this.state,
          questions: sortedQuestions
        })
      } break;

      case 'latest': {
        let { questions } = this.state;
        let sortedQuestions = questions.sort((a, b) => {
          return (a.createdOn.seconds - b.createdOn.seconds);
        });

        this.setState({
          ...this.state,
          questions: sortedQuestions
        })
      }
    }
  }

  handleFilter = (filter) => {
    let { questions } = this.state;

    let filteredQuestions = questions.filter((question) => {
      return question.tags.map((tag) => tag.toLowerCase()).includes(filter.toLowerCase());
    })

    this.setState({
      ...this.state,
      filterApplied: true,
      currentFilter: filter,
      questions: filteredQuestions
    })
  }

  resetFilter() {
    this.setState({
      ...this.state,
      filterApplied: false,
      currentFilter: null,
      questions: this.state.unfilteredQuestions,
      unfilteredQuestions: [],
    })
  }

  render() {
    if(!this.props.isLoggedIn) {
      this.props.history.push('/signin');
    }
    
    return (
      <div className="questions-page">
        <div className="filters">
          <div class="header element-flex">
          <h6 class="mt-0 mb-8 mr-12 title">Filter categories</h6>
          { this.state.filterApplied ? <a role="button" className="reset-filter" onClick={() => this.resetFilter()}>Reset filter</a> : null }
          </div>

          <div class="body">
            {
              FILTERS.map((filter) => (
                <div className={`filter ${this.state.currentFilter === filter ? 'active': ''}`} onClick={() => this.handleFilter(filter)}>{filter}</div>))
            }
          </div>
        </div>
        <div className="questions-wrapper">
          <div className="create-question mb-20">
            <FormButton name="create-question" buttonClass="button button--primary" onClick={() => this.openQuestionModal()}> Create </FormButton>
            <div class="sort-options">
              <a role="button" className="mr-8" onClick={() => this.handleSort('popular')}>popular</a>
              <a role="button" onClick={() => this.handleSort('latest')}>latest</a>
            </div>
          </div>
          {
            this.state.questions.length ? this.state.questions.map((question) => (
              <Question key={question.id} question={question} user={this.props.currentUser}/>
            )) : <div className="loading">No Question yet</div>
          }

          { this.state.createQuestion ? <NewQuestion createQuestion={(questionObj) => this.createQuestion(questionObj)} closeModal={() => {this.closeModal()}}/> : null }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.loggedIn,
    currentUser: {...state.currentUser}
  }
}

export default connect(mapStateToProps)(Questions);