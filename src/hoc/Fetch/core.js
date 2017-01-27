import React from 'react'
import {debounce} from 'lodash'

export function defaultMap(data,error) {
  // maps to object with data, error, names
  return { data, error }
}

const EMPTY = {}

// dependencies
export default (fetch) =>

// Higher order component which helps to load data
function Fetch (urlFunc, map = defaultMap, debouncePeriod = 200) {

  return Component => class FetchComponent extends React.Component {

    constructor (props) {
      super(props)
      this.state = {
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
      this.call(EMPTY, EMPTY)
    }

    componentWillUpdate (props) {
      this.call(this.props, props)
    }

    call (prevProps, props) {
      var url = urlFunc(props)
      var oldUrl = urlFunc(prevProps)

      // if url didn't change prevent call
      if (this.firstLoadDone && url === oldUrl) return false

      // if url null, set state to empty
      if (url == null) {
        this.setState({ ...map(EMPTY, null), isLoading: false })
        return false
      }

      // if url is not empty, start loading
      this.firstLoadDone = true
      this.setState({ isLoading: true })

      return fetch(url)
      .then(r => {
        return r.json()
      })
      .then(data => {
        // if we got result for the last request, otherwise we don't need it
        // console.info('received',urlFunc(this.props), url);
        if (urlFunc(this.props) == url)
        {
          this.setState({ ...map(data), isLoading: false })
        }
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
