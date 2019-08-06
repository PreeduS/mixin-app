import React from 'react';
import '../styles/TodoApp.css';
import Todos from './TodoApp/Todos';
import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:4000',
});


class TodoApp extends React.Component {
    state = {
        todos: [],
        inputValue:''
    }
    // todos
    /*
    [
        {id: ...,  name: '...', checked: true/false}
    ]
    */

    componentDidMount(){
        instance.get('/getTodos')
        .then( (response) => {
            console.log(response)
            const todos = response.data.todos;
            this.setState({todos})
        })   
    }

    addTodo = () => {
        let inputValue = this.state.inputValue;
        let newTodo = {
            id: inputValue + '_' + Math.random(),
            name: inputValue,
            checked: false
        }

        instance.post('/add',{
            todo:{
                name: newTodo.name,
                id: newTodo.id,
                checked: newTodo.checked
            }
        })
        .then( (response) => {
          // handle success, todo added on backend, add on frontend state also
          console.log(response);

            let newTodos = [
                ...this.state.todos,
                newTodo
            ]
            this.setState({
                todos: newTodos
            })
        })

    }

    deleteItem = (id) => {


        instance.post('/delete/' + id)
        .then( (response) => {
            let updatedTodos = [...this.state.todos];
            let index = updatedTodos.findIndex( x => x.id === id);
            updatedTodos.splice(index,1); //remove one element from index
            this.setState({todos: updatedTodos});          
        })


    }

    updateChecked = (id) => {

        instance.post('/checked/' + id)
        .then( (response) => {
            let updatedTodos = [...this.state.todos];
            let index = updatedTodos.findIndex( x => x.id === id);
            updatedTodos[index] = {
                ...updatedTodos[index],
                checked: !updatedTodos[index].checked
            }
          
            this.setState({todos: updatedTodos});
    
        })
    }

    inputChangeHandler = (e) => {
        this.setState({inputValue: e.target.value})
    }
    render(){
        return (
            <div >
                <div className = {'app-header'}>Header</div>
                <div>
                    <input 
                        value = {this.state.inputValue} 
                        onChange = {this.inputChangeHandler}
                    />
                    <button 
                        className = {'add-button'}
                        onClick = {this.addTodo}
                    >
                        Add 
                    </button>
                    <br />

                    <Todos 
                        todos = {this.state.todos} 
                        deleteItem = {this.deleteItem}
                        updateChecked = {this.updateChecked}
                    />
                </div>

            </div>
        );
    }
}

export default TodoApp;
