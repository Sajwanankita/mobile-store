import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from "enzyme";

describe('App', () => {

  it('should display empty message when cart have nothing', () => {
    const app = shallow(<App />);
    expect(app.find('Route')).toHaveLength(6);
  });
});