import React from 'react'
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme'
import RepositoryItem from './RepositoryItem'
import Fork from './icons/Fork'
import Star from './icons/Star'


describe("RepositoryItem", function() {
  
  it("renders", function() {
    const wrapper = shallow(<RepositoryItem repository={{id:'rep1'}} />);
    expect(wrapper.find('.repo-item')).to.have.length(1);
    expect(wrapper.find(Fork)).to.have.length(1);
    expect(wrapper.find(Star)).to.have.length(1);
  });
  
});