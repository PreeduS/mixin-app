import React from 'react';

class InputField extends React.Component {
  render(){
    return (
        <input 
            value = {this.props.value} 
            onChange = {(e) =>this.props.onChange(e)}
        />
    );
  }
}

export default InputField;
