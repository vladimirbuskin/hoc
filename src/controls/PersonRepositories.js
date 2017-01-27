import React from 'react'
import RepositoriesList from './RepositoriesList'


export default function PersonRepositories (props) {
  
  var { repositories, message, entered, isLoading } = props

  return (
    <div className='person-repositories'>
      <h2>GitHub user repositories</h2>
      <div>
        <input onChange={props.onTexting} type='text' placeholder='Please enter username' />
        { isLoading &&
          <span style={{marginLeft: '1em'}}>loading...</span>
        }
      </div>

      { entered &&
        <div>
          <b>{ message }</b>
          { repositories && <RepositoriesList repositories={repositories} />}
        </div>
      }
    </div>
  )
}

PersonRepositories.propTypes = {
  // entered
  entered: React.PropTypes.string,
  onTexting: React.PropTypes.func.isRequired,
  message: React.PropTypes.string,
  repositories: React.PropTypes.array,
  isLoading: React.PropTypes.bool
}
