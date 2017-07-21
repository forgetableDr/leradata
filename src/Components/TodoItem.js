import React, { Component } from 'react';

class TodoItem extends Component {

  deleteProject(id) {
    this.props.onDelete(id)
  }

  render() {
    return (
      <li className="todo-item">
        <strong>{this.props.todo.title}</strong>
      </li>
    );
  }
}

export default TodoItem;
