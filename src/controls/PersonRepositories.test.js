import React from 'react'
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme'
import PersonRepositories from './PersonRepositories'
import RepositoriesList from './RepositoriesList'

var reps = [{id:'rep1'}]

describe("RepositoryItem", function() {
  
  it("renders", function() {
    const wrapper = shallow(<PersonRepositories onTexting={()=>{}} />);
    expect(wrapper.find('.person-repositories')).to.have.length(1);
    expect(wrapper.find('input')).to.have.length(1);
  });

  it("renders list hidden when not entered", function() {
    const wrapper = shallow(<PersonRepositories repositories={reps} onTexting={()=>{}} />);
    expect(wrapper.find(RepositoriesList)).to.have.length(0);
  });

  it("renders list when entered", function() {
    const wrapper = shallow(<PersonRepositories repositories={reps} onTexting={()=>{}} entered='v' />);
    expect(wrapper.find(RepositoriesList)).to.have.length(1);
  });


});