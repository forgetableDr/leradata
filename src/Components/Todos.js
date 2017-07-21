import React, { Component } from 'react'
import TodoItem from './TodoItem'

class Todos extends Component {
  render() {
    let todoItems = this.props.todos ?
    this.props.todos.map(todo => <TodoItem key={todo.title} todo={todo}/>) : ''
    return (
      <div className="todos">
        <h3>Todo list:</h3>
        {todoItems}
      </div>
    );
  }
}




export default Todos;
