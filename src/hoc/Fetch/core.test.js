/* global describe, it, expect */
import React from 'react'
import core from './core'
import data from './data'



function makeSuccessFetch(data, ms) {
  return url => {
    return Promise.resolve({json: () => new Promise((resolve, reject) => { setTimeout(()=>resolve(data), ms) }) })
  }
}

var fetchFailNetwork = url => {
  return new Promise((resolve, reject) => {
    reject({message: 'network error'})
  })
}
var fetchFailParse = url => {
  return new Promise((resolve, reject) => {
    resolve({
      json: () => new Promise((resolve, reject) => {
        reject({message: 'parse error'})
      })
    })
  })
}


// get clean mock function
function getMock () {
  return {
    props: {},
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
}

describe("Fetch", function () {


  it('makes a call and get result', function (done) {

    var Comp = props => {
      return (<div />)
    }

    var FetchSuccess = core(makeSuccessFetch(data, 0))
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
    .catch(e => {
      console.error(e)
      done();
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

    var FetchFailNetwork = core(fetchFailNetwork)
    var FetchComp = FetchFailNetwork((props) => 'url'+props.urlId, undefined, 0)(Comp)
    
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

    var FetchFailParse = core(fetchFailParse)
    var FetchComp = FetchFailParse((props) => 'url'+props.urlId, undefined, 0)(Comp)
    
    var mock = getMock();
    
    var pr = FetchComp.prototype.call.call(mock, {}, {})
    
    pr.then((d, e) => {
      expect(mock.state.error).not.toBeNull()
      expect(mock.state.error.message).toEqual('parse error')
      done()
    })

  })

  it('makes a two calls get results of last', function (done) {

    var Comp = props => {
      return (<div />)
    }


    var FetchSlow = core(makeSuccessFetch({d:'1'}, 100))
    var FetchFast = core(makeSuccessFetch({d:'12'}, 10))

    var FetchSlowComp = FetchSlow((props) => 'url_'+props.entered, undefined, 0)(Comp)
    var FetchFastComp = FetchFast((props) => 'url_'+props.entered, undefined, 0)(Comp)

    // process
    // ======================
    // we entered '1'
    // went '1' call on 100 ms
    // we entered '12'
    // went '12' call on 10 ms
    // we received '12' call, when entered == '12'
    // we received '1' call, when entered == '12'  - should skip this

    var mock = getMock();
    
    mock.props.entered = '1'
    var p1 = FetchSlowComp.prototype.call.call(mock, {}, {entered: '1'}); // 100ms  -- this result should be skipped
    mock.props.entered = '12'
    var p2 = FetchFastComp.prototype.call.call(mock, {}, {entered: '12'}); // 10ms

    var pr = Promise.all([p1, p2])

    pr.then((d, e) => {
      // after all callbacks we got latest result
      expect(mock.state.data.d).toEqual('12');
      done()
    })
    .catch(e => {
      console.error(e)
    })

  })
})
