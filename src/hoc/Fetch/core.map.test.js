import React from 'react'

import { defaultMap } from './core'


describe("Fetch", function () {


  it('defaultMap', function () {

    var o = defaultMap('data', 'error')
    expect(o.data).toEqual('data')
    expect(o.error).toEqual('error')
  })

})
