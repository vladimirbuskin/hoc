import React from 'react'
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme'
import {RepositoriesList} from './RepositoriesList'
import RepositoryItem from './RepositoryItem'



describe("RepositoriesList", function() {
  
  it("renders", function() {
    const wrapper = shallow(<RepositoriesList repositories={[{id:'rep1'}]} />);
    expect(wrapper.find('.repo-list')).to.have.length(1);
    expect(wrapper.find(RepositoryItem)).to.have.length(1);
  });
  
});