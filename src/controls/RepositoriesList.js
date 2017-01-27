import React from 'react'
import RepositoryItem from './RepositoryItem'
import Pager from '../hoc/Pager'

export function RepositoriesList (props) {
  var repositories = props.repositories || []
  return (
    <div className='repo-list'>
      {repositories.map(r => (
        <RepositoryItem repository={r} key={r.id} />
      ))}
      {repositories.length === 0 && <b>No Repositories</b>}
    </div>
  )
}

RepositoriesList.propTypes = {
  repositories: React.PropTypes.array.isRequired
}


export default Pager('repositories', 10, RepositoriesList)
