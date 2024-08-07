import React, { Component } from 'react';
import './App.css';
import { isEditable } from '@testing-library/user-event/dist/utils';

class App extends Component{

  constructor() {
    super()

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
    const newTodos = {
      text: this.state.inputValue,
      isCompleted: false,
      isEditable: true
    }

    this.setState({
      listOfTodos: [...this.state.listOfTodos, newTodos],
      inputValue: ''
    })
  }

  // Checks if a checkbox is checked
  handleCheckboxChange = (index) => {
    const updateTodos = [...this.state.listOfTodos]
    updateTodos[index].isCompleted = !updateTodos[index].isCompleted
    updateTodos[index].isEditable = !updateTodos[index].isEditable
    this.setState({listOfTodos : updateTodos})
  }

  //Clears the listOfTodos array
  clearAllTodos = () => {
    this.setState({listOfTodos : []})
  }

  //Clear all completed todos
  clearAllCompletedTodos = () => {
    this.setState({listOfTodos : this.state.listOfTodos.filter(todo => !todo.isCompleted)})
  }

  // Start editing the chosen todo item
  startEditing = (index, todo) => {
    this.setState({ editingIndex: index, editingValue: todo.text })
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

                // Create the li element for each todo item, with editing functionality
                <li
                key={index}
                style={{textDecoration: todo.isCompleted ? 'line-through' : 'none'}}
                onDoubleClick={() => !todo.isCompleted && this.startEditing(index, todo)}
                draggable={this.state.isDraggable}
                >



                  {/* checkbox for marking the todo item as completed */}
                  <input
                    type='checkbox'
                    checked = {todo.isCompleted}
                    onChange={() => this.handleCheckboxChange(index)}
                    
                  />



                  {/* input field for editing the todo item */}
                  {this.state.editingIndex === index ? (
                    <input
                      type='text'
                      style={{ color: "black", borderColor: "black"}}
                      value={this.state.editingValue}
                      onChange={this.handleEditChange}
                      onBlur={() => this.saveEdit(index)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          this.saveEdit(index);
                        }
                      }}
                    />
                  ) : todo.text
                  }
                </li>

              );
            })}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
