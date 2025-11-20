import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div className="flex items-center pb-10">
        <h1 className="mr-5">{this.state.count}</h1>
        <button
          className="bg-indigo-700 text-white p-2 rounded-md hover:bg-slate-200 hover:text-indigo-700 hover:scale-105 hover:duration-300 transition-transform duration-300 cursor-pointer"
          onClick={() => this.setState({ count: this.state.count + 1 })}
        >
          +
        </button>
      </div>
    );
  }
}

export default Counter;
