import React, { Component } from 'react'
//import logo from './logo.svg'
import PersonRepositories from './controls/PersonRepositories'
//import debounce from 'lodash/debounce'
import Fetch from './hoc/Fetch/index'

// css
//import '../bower_components/skeleton/css/normalize.css'
//import '../bower_components/skeleton/css/skeleton.css'
import './App.css'

class App extends Component {

  constructor (props) {
    super(props)
    
    // our app top level state
    this.state = {
      entered: null
    }
  }

  onTexting = (e) => {
    this.setState({entered: e.target.value});
  }

  render () {
    return (
      <div className='container app'>
        <PersonRepositoriesFetch onTexting={this.onTexting} {...this.state} />
      </div>
    );
  }

}


// wrap our presentation PersonRepositories component with Fetch component
// which will provide fetch results to stateless PersonRepositories component
var PersonRepositoriesFetch = Fetch(
  // url generator
  props => props.entered ? 'https://api.github.com/users/'+props.entered+'/repos' : null,
  // map fetch results
  (data, err) => Array.isArray(data) ? 
    // good result
    { repositories: data, message: null } : 
    // other results
    { repositories: null, message: (data || {}).message || (err || {}).message }
)(PersonRepositories)

export default App;