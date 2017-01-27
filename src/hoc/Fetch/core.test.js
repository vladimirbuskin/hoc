/* global describe, it, expect */
import React from 'react'
import core from './core'
import data from './data'


var fetchSuccess = url => {
  return new Promise((resolve, reject) => {
    resolve({
      json: () => new Promise((resolve, reject) => {
        resolve(data)
      })
    })
  })
}
var fetchFail = url => {
  return new Promise((resolve, reject) => {
    reject({message: 'network error'})
  })
}
var fetchFail2 = url => {
  return new Promise((resolve, reject) => {
    resolve({
      json: () => new Promise((resolve, reject) => {
        reject({message: 'parse error'})
      })
    })
  })
}

var FetchSuccess = core(fetchSuccess)
var FetchFail = core(fetchFail)
var FetchFail2 = core(fetchFail2)

// get clean mock function
var getMock = () => (
  {
    state: {
      firstLoadDone: false,
      data: null,
      error: null,
      isLoading: false
    },
    setState (st) {
      Object.assign(this.state, st)
    }
  }
)

describe("Fetch", function () {


  it('makes a call and get result', function (done) {

    var Comp = props => {
      return (<div />)
    }

    var FetchComp = FetchSuccess((props) => 'url'+props.urlId, undefined, 0)(Comp)
  
    var mock = getMock();

    var pr = FetchComp.prototype.call.call(mock, {}, {})

    // it stamps isLoading state property to true
    expect(mock.state.isLoading).toEqual(true)
    
    pr.then(d => {
      expect(Array.isArray(d)).toEqual(true)
      // data is stamped into state data
      expect(Array.isArray(mock.state.data)).toEqual(true)
      // isLoading false, afterload
      expect(Array.isArray(mock.state.isLoading)).toEqual(false)
      // done
      done()
    })

    // second call should return false, we already started with current url
    pr = FetchComp.prototype.call.call(mock, {}, {})
    expect(pr).toEqual(false)

    // we've changed URL prop, that should cause new request
    // so we should get new promise
    pr = FetchComp.prototype.call.call(mock, {}, {urlId:5})    
    expect(pr != null && pr.then != null).toEqual(true)
  })

  it('makes a call and get error', function (done) {

    var Comp = props => {
      return (<div />)
    }

    var FetchComp = FetchFail((props) => 'url'+props.urlId, undefined, 0)(Comp)
    
    var mock = getMock();

    
    var pr = FetchComp.prototype.call.call(mock, {}, {})
    
    pr.then((d, e) => {
      expect(mock.state.error).not.toBeNull()
      expect(mock.state.error.message).toEqual('network error')
      done()
    })

  })

  it('makes a call and get error when parse json', function (done) {

    var Comp = props => {
      return (<div />)
    }

    var FetchComp = FetchFail2((props) => 'url'+props.urlId, undefined, 0)(Comp)
    
    var mock = getMock();
    
    var pr = FetchComp.prototype.call.call(mock, {}, {})
    
    pr.then((d, e) => {
      expect(mock.state.error).not.toBeNull()
      expect(mock.state.error.message).toEqual('parse error')
      done()
    })

  })
})
