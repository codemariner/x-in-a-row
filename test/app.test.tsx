import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import App from '../src/app';
import Form from '../src/components/form'

import configureStore from '../src/store'
import { Store } from 'redux';

describe('App', () => {
	let store:Store

	beforeEach(() => {
		store = configureStore()
	})

    it('renders the create new game form by default', () => {
        const wrapper = mount(
		    <Provider store={store}>
		        <App />
			</Provider>
		)
		expect(wrapper.find(Form)).toHaveLength(1)
    });
});
