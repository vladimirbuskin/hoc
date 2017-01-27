import React from 'react'



// higer order component which makes paging
export default (itemsName, pageSize, Component) => {
  return class Pager extends React.Component {

    constructor (props) {
      super(props)
      this.state = {
        page: 0
      }
    }

    nextPage = () => {
      this.setState({page: this.state.page + 1})
    }

    prevPage = () => {
      this.setState({page: Math.max(this.state.page - 1, 0)})
    }

    render () {
      var items = this.props[itemsName]
      var newProps = {}
      var from = this.state.page * pageSize
      newProps[itemsName] = (items || []).slice(from, from + pageSize)
      
      var isFirst = from === 0
      var isLast = from + pageSize > items.length

      return (
        <div>
          <Component {...this.props} {...newProps} />
          <div>
            { !isFirst ? <a href='#' onClick={this.prevPage}>Prev Page</a> : <span>Prev Page</span> }
            <span> - </span>
            { !isLast ? <a href='#' onClick={this.nextPage}>Next Page</a> : <span>Next Page</span> }
          </div>
        </div>
      )
    }
  }
}