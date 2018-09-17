/* @flow */
import React from 'react';
import './testingWindow.scss';
import checked from './checked-1.svg';
import minus from './minus-1.svg';

// const puppeteer
const testData = {};
type TestingWindowProps = {};
export default class TestingWindow extends React.Component {
  mapDataToTestCoverage = data => {};
  render() {
    return (
      <div className="sectionContainer">
        <div className="sectionHeader">
          <span className="child">24% succesful</span>
        </div>
        <div className="sectionHeader">
          <img className="icon" src={minus} />
          <span className="child">collect 20 wood</span>
        </div>
        <div className="sectionHeader">
          <img className="icon" src={checked} />
          <span className="child">do stuff...</span>
        </div>
      </div>
    );
  }
}
