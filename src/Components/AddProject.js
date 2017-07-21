import React, { Component } from 'react';
import uuid from 'uuid'

class AddProject extends Component {
  constructor() {
    super()
    this.state = {
      newProject: {}
    }
  }

  static defaultProps = {
    categories: ['Web Design', 'Mobile Design', 'Web Development']
  }

  handleSubmit(event) {
    event.preventDefault()
    if(!this.refs.title.value) alert("Title is Required")
    else {
      this.setState({
        newProject: {
          id: uuid.v4(),
          title: this.refs.title.value,
          category: this.refs.category.value
        }
      }, function() {
        this.props.addProject(this.state.newProject)
      })
    }
  }

  render() {
    let categoryOptions = this.props.categories.map(category => {
      return <option key={category} value={category}>{category}</option>
    })
    return (
      <div>
        <h3>Add Project</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Title</label>
            <input type="text" ref="title" /><br />
          </div>
          <div>
          <br />
            <label>Category</label>
            <select ref="category">
             {categoryOptions}
            </select>
            <br />
          </div>
          <br />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default AddProject;
