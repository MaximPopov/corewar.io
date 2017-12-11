
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import PlayPauseControl from './../../containers/simulator/playPauseControl'
import FontAwesome from 'react-fontawesome'

it('renders without crashing', () => {
  shallow(<PlayPauseControl />)
});

it('renders the play button when not running', () => {

  const props = {
    isRunning: false
  }

  const wrapper = shallow(<PlayPauseControl {...props}/>)

  expect(wrapper.find(FontAwesome).props().name).to.equal('play')
});

it('calls the playHandler when the play button is clicked', () => {

  const playHandler = sinon.spy()

  const props = {
    isRunning: false,
    handlePlay: playHandler
  }

  const wrapper = shallow(<PlayPauseControl {...props}/>)
  wrapper.find(FontAwesome).simulate('click')

  expect(playHandler.calledOnce)
});


it('renders the pause button when running', () => {

  const props = {
    isRunning: true
  }

  const wrapper = shallow(<PlayPauseControl {...props}/>)

  expect(wrapper.find(FontAwesome).props().name).to.equal('pause')
});

it('calls the pauseHandler when the pause button is clicked', () => {

  const pauseHandler = sinon.spy()

  const props = {
    isRunning: true,
    handlePause: pauseHandler
  }

  const wrapper = shallow(<PlayPauseControl {...props}/>)
  wrapper.find(FontAwesome).simulate('click')

  expect(pauseHandler.calledOnce)
});
