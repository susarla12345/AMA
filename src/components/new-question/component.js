import React from 'react';
import ModalOverlay from '../modal-overlay/component';
import FormInput from '../form-input/component';
import FormButton from '../form-button/component';
import Select from 'react-select';

const TAGS = [
  { value: 'product development', label: 'product development' },
  { value: 'sales and support', label: 'sales and support' },
  { value: 'Employee and culture', label: 'Employee and culture' },
  { value: 'Buisiness updates', label: 'Buisiness updates' },
  { value: 'others', label: 'others' },
  { value: 'Facilities', label: 'Facilities' },
  { value: 'Policies', label: 'Policies' },
];

class NewQuestion extends React.Component {
  constructor() {
    super() 

    this.state = {
      'title': '',
      'description': '',
      'anonymous': true,
      'sessionId': "zTcBDjlKn9gO6iVM1Xf2",
      'tags': []
    }
  }

  changeTitle = event => {
    this.setState({
      ...this.state,
      title: event.target.value
    })
  }

  changeDescription = event => {
    this.setState({
      ...this.state,
      description: event.target.value
    })
  }

  handleTagsChange = values => {
    this.setState({
      ...this.state,
      tags: values
    })
  }

  submit = () => {
    this.props.createQuestion(this.state);
  }

  render() {
    return (
        <ModalOverlay title="Ask a question">
          <div className="new-question-wrapper">
            <FormInput name="title" type="text" placeholder="enter question title" onChange={(event) => this.changeTitle(event)}/>
            <FormInput name="description" type="text" placeholder="enter question description" onChange={(event) => this.changeDescription(event)}/>

            <Select
              value={this.state.tags}
              onChange={this.handleTagsChange}
              options={TAGS}
              isMulti={true}
              placeholder="select a category"
              isSearchable={true}
            />

            <FormButton name="submit" buttonClass="button button--primary mt-20" onClick={() => this.submit()}> submit </FormButton>
          </div>
        </ModalOverlay>
    )
  }
}

export default NewQuestion;