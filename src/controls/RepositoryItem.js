import React from 'react'
import Star from './icons/Star'
import Fork from './icons/Fork'

export default function RepositoryItem (props) {
  var r = props.repository
  return (
    <div className='repo-item'>
      <h6>
        <a href={r.html_url}>{r.name}</a>
      </h6>
      <div className='description'>
        { r.description || '<no description>'}
      </div>
      <span style={{marginLeft: '0em'}}><Star /> {r.stargazers_count} <Fork /> {r.forks_count}</span>
    </div>
  )
}

RepositoryItem.propTypes = {
  repository: React.PropTypes.object.isRequired
}
