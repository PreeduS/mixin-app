import React from 'react';
// import HelloComponent from './components/HelloComponent';
// import InputField from './components/InputField';
import TodoApp from './components/TodoApp';

class App extends React.Component {
  state = {
    counter: 0,
    age: 10,
    value: 'initial value'
  }
  clickHandler = () => {
    let newCounter = this.state.counter + 1
    let newAge = this.state.age + 5
    this.setState({
      counter: newCounter,
      age: newAge
    })
  }

  inputChangeHandler = (e) => {

    this.setState({
      value: e.target.value
    })
  }

  render(){
    return (
      <div >
        {/*counter: {this.state.counter}
          <br />
          <button onClick = {this.clickHandler}>
            increment counter
          </button>
          <br /> 
          <HelloComponent name = "Bob" age = {this.state.age} />

          <InputField 
            value = {this.state.value} 
            onChange = {this.inputChangeHandler}
          />
          <hr />
        <br />  <br />  <br />
      */}
        <TodoApp />

      </div>
    );
  }

}

export default App;
