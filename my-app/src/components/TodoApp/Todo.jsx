import React from 'react';

class Todo extends React.Component {

    render(){
        const { todo, deleteItem, updateChecked } = this.props;
        const styles = {
            color: todo.checked ? 'blue' : 'initial'
            //backgroundColor background-color
        }

        return (
            <div>
                <input 
                    type= "checkbox" 
                    checked = {todo.checked}
                    onChange = {()=>updateChecked(todo.id)}
                />
                <span 
                    className = {todo.checked ? 'line_through' : ''}
                    style = {styles}
                >
                    {todo.name}
                </span>
                <input
                    type= "button" 
                    value = "delete" 
                    onClick = {()=>deleteItem(todo.id)}
                />
            </div>
        );
    }
}

export default Todo;