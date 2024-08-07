import React, { Component } from 'react';
import './App.css';

class App extends Component{

  constructor() {
    super()

    this.state = {
      isClicked: false,
      inputValue: '',
      listOfTodos: []
    }
  }

  handleChange = (e) => {
    this.setState({inputValue : e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({listOfTodos : [...this.state.listOfTodos, this.state.inputValue]})
    this.setState({inputValue : ''})
  }

  //Clears the listOfTodos array
  clearAllTodos = () => {
    this.setState({listOfTodos : []})
  }

  //Edit todos: convert the li to input field when clicked
  editTodos = () => {
    //Check if the li is clicked
    this.setState({isClicked : true})
    //If clicked, convert the li to input field
  }

  render() {
    return (
      <div className='App'>

        <header className='App-header'>
        <h1>List of todos</h1>

          <form onSubmit={this.handleSubmit}>

            <input
              type='text'
              value={this.state.inputValue}
              onChange={this.handleChange}
            ></input>

            <button type='button'>Clear checked todos</button>
            <button type='button' onClick={this.clearAllTodos}>Clear all todos</button>
          </form>

          <ul>
            {this.state.listOfTodos.map((todo, index) => {
              return (
                <li
                onClick={this.editTodos}
                onChange={this.handleChange}
                key={index}>{todo}
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
