import React from 'react';

class HelloComponent extends React.Component {
  render(){
    return (
      <div >
        Hello {this.props.name}, age: {this.props.age}
      </div>
    );
  }
}

export default HelloComponent;
