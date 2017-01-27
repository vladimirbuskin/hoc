import React from 'react'
import {debounce} from 'lodash'

export function defaultMap(data,error) {
  return {data, error}
}

// dependencies
export default (fetch) =>

// Higher order component which helps to load data
function Fetch (urlFunc, map = defaultMap, debouncePeriod = 200) {

  return Component => class FetchComponent extends React.Component {

    constructor (props) {
      super(props)
      this.state = {
        firstLoadDone: false,
        data: null,
        error: null,
        isLoading: false
      }
      // debounce call functionality
      if (debouncePeriod) {
        this.call = debounce(this.call, debouncePeriod)
      }
    }

    componentWillMount () {
      console.log('componentWillMount')
      this.call({}, {})
    }

    componentWillUpdate (props) {
      console.log('componentWillUpdate')
      this.call(this.props, props)
    }

    call (prevProps, props) {
      var url = urlFunc(props)
      var oldUrl = urlFunc(prevProps)

      // if url didn't change prevent call
      if (this.state.firstLoadDone && url === oldUrl) return false

      // if url null, set state to empty
      if (url == null) {
        this.setState({ ...map({}, null), isLoading: false })
        return false
      }

      // if url is not empty, start loading
      this.setState({ isLoading: true, firstLoadDone: true })

      return fetch(url)
      .then(r => {
        return r.json()
      })
      .then(data => {
        this.setState({ ...map(data), isLoading: false })
        return data
      })
      .catch(er => {
        this.setState({ ...map(null, er), isLoading: false })
        return er
      })
    }

    render () {
      return <Component {...this.props} {...this.state} />
    }
  }
}
