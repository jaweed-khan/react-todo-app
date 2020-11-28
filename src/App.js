import React, { Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import {v4 as uuid} from "uuid"; 
import './App.css';
import About from './components/pages/About';
import axios from 'axios';

class App extends Component {
  state = {
    /*todos: [
      {
        id: uuid(),
        title: 'Take out the trash',
        completed: false
      },
      {
        id: uuid(),
        title: 'Dinner with Wife',
        completed: true
      },
      {
        id: uuid(),
        title: 'Meeting with boss',
        completed: false
      }
    ]
    */
   todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20')
    .then(res => this.setState({todos: res.data}) );
  }

    /**
     * now setting the state to completed by matching the id
     */
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        /**
         * !todo.completed means we are setting the toggle if its true it will set to false and when its false it sets to true
         */
        todo.completed = !todo.completed   
      }
      return todo;
    }) });
  }

  /**
   * Delete Todo 
   */
  delTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });
  }

  /**
   * AddTodo
   */
  addTodo = (title) => {
    const newTodo = {
      id: uuid(),
      title: title,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo] });
  }

  /**
   * Without Router 
   */
  /*

   render(){
    return (
      <div className="App">
        <div className="container">
        <Header />
        <AddTodo addTodo={this.addTodo}/>
       <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
      </div>
      </div>
    );
  }

  */

/**
 * With Router
 */
  render(){
    return (
      <Router>
        <div className="App">
        <div className="container">
        <Header />
        <Route exact path="/" render={props => (
          <React.Fragment>

            <AddTodo addTodo={this.addTodo}/>
            <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
          
          </React.Fragment>
        )}/>

        <Route path="/about" component={About} />
        
      </div>
      </div>
      </Router>
      
    );
  }
 
}

export default App;
