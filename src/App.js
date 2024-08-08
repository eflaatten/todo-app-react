import React, { Component } from 'react';
import './App.css';
import TodoCard from './TodoCard';

class App extends Component{

  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
      listOfTodos: [],
      editingIndex: null,
      editingValue: '',
      isCompleted: false,
      isEditable: false,
      isDraggable: true
    }
  }

  handleChange = (e) => {
    this.setState({inputValue : e.target.value})
  }

  handleEditChange = (e) => {
    this.setState({editingValue : e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newTodo = {
      text: this.state.inputValue,
      isCompleted: false,
    };
    this.setState({
      listOfTodos: [...this.state.listOfTodos, newTodo],
      inputValue: "",
    });
  }

  // Checks if a checkbox is checked
  handleCheckboxChange = (index) => {
    const updateTodos = [...this.state.listOfTodos];
    updateTodos[index].isCompleted = !updateTodos[index].isCompleted;
    this.setState({listOfTodos: updateTodos});
  }

  //Clears the listOfTodos array
  clearAllTodos = () => {
    this.setState({listOfTodos : []})
  }

  //Clear all completed todos
  clearAllCompletedTodos = () => {
    this.setState({listOfTodos : this.state.listOfTodos.filter(todo => !todo.isCompleted)})
  }

  // Delete todo
  deleteTodo = (index) => {
    let copyOfTodos = [...this.state.listOfTodos]
    copyOfTodos.splice(index, 1)
    this.setState({listOfTodos : copyOfTodos})
  }

  // Start editing the chosen todo item
  startEditing = (index, todo) => {
    this.setState({ editingIndex: index, editingValue: todo })
  }

  // Save the edited todo item
  saveEdit = (index) => {
    const updateTodos = [...this.state.listOfTodos];
    updateTodos[index].text = this.state.editingValue;
    this.setState({
      listOfTodos: updateTodos,
      editingIndex: null,
      editingValue: "",
    });
  }

  render() {
    return (
      <div className='App'>

        <header className='App-header'>
          <h1>List of todos</h1>

          <form onSubmit={this.handleSubmit}>

            <input
              type='text'
              placeholder='Add a todo'
              value={this.state.inputValue}
              onChange={this.handleChange}
            ></input>

            <button type='button' onClick={this.clearAllCompletedTodos}>Clear completed todos</button>
            <button type='button' onClick={this.clearAllTodos}>Clear all todos</button>
          </form>

          <ul>
          {this.state.listOfTodos.length === 0 && <p>No todos</p>}
            {this.state.listOfTodos.map((todo, index) => {
              return (
                <TodoCard
                  key={index}
                  index={index}
                  title={todo}
                  deleteTodo={this.deleteTodo}
                  isCompleted={todo.isCompleted}
                  handleCheckboxChange={this.handleCheckboxChange}
                  editingIndex={this.state.editingIndex}
                  editingValue={this.state.editingValue}
                  saveEdit={this.saveEdit}
                  handleEditChange={this.handleEditChange}
                  startEditing={this.startEditing}
                />
              );
            })}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
