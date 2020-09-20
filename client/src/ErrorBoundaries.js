import React from 'react'

import { Link } from 'react-router-dom'

class ErrorBoundaries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  handleRecovery() {
    this.setState({
      error:false
    })
    //window.location.reload()
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: true
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Something went wrong, </h1>
          <Link onClick={this.handleRecovery.bind(this)} to="/">Back to Home</Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaries;