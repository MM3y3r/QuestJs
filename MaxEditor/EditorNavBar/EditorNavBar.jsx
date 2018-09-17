//@flow

import cx from 'classnames';
import React from 'react';
import './EditorNavBar.scss';

type editorWindowTypes =
  | 'output'
  | 'console'
  | 'html'
  | 'css'
  | 'javascript'
  | 'excercise'
  | 'testing';

type MaxNavProps = {
  handleNavigation: (
    event: SyntheticEvent<HTMLButtonElement>,
    type: string
  ) => void,
  windowTypes: Array<editorWindowTypes>
};

type MaxNavState = {
  isVisibleHtml: boolean,
  isVisibleCss: boolean,
  isVisibleJavascript: boolean,
  isVisibleOutput: boolean,
  isVisibleConsole: boolean,
  isVisibleTesting: boolean,
  isVisibleExcercise: boolean,
  isActiveHtml: boolean,
  isActiveCss: boolean,
  isActiveJavascript: boolean,
  isActiveOutput: boolean,
  isActiveConsole: boolean,
  isActiveTesting: boolean,
  isActiveExcercise: boolean
};

// Navbar Component
export default class NavBar extends React.Component<MaxNavProps, MaxNavState> {
  constructor(props: MaxNavProps) {
    super(props);

    this.state = {
      isVisibleHtml: false,
      isVisibleCss: false,
      isVisibleJavascript: false,
      isVisibleOutput: false,
      isVisibleConsole: false,
      isVisibleTesting: false,
      isVisibleExcercise: false,
      isActiveHtml: true,
      isActiveCss: true,
      isActiveJavascript: true,
      isActiveOutput: true,
      isActiveConsole: true,
      isActiveTesting: true,
      isActiveExcercise: true
    };
    // console.log(this.state);
  }

  componentWillMount = () => {
    // console.log('nav bar props will mount');
    // console.log(this.props.windowTypes);
    this.props.windowTypes.map(type => {
      switch (type) {
        case 'html':
          this.setState({
            isVisibleHtml: true
          });
          break;
        case 'css':
          this.setState({
            isVisibleCss: true
          });
          break;
        case 'javascript':
          this.setState({
            isVisibleJavascript: true
          });
          break;
        case 'output':
          this.setState({
            isVisibleOutput: true
          });
          break;
        case 'console':
          this.setState({
            isVisibleConsole: true
          });
          break;
        case 'testing':
          this.setState({
            isVisibleTesting: true
          });
          break;
        case 'excercise':
          this.setState({
            isVisibleExcercise: true
          });
          break;

        default:
          break;
      }
    });
  };

  render() {
    return (
      <nav className="navbarContainer">
        <ul className="navBar">
          <li
            onClick={event => {
              this.props.handleNavigation(event, 'html');
              this.setState({ isActiveHtml: !this.state.isActiveHtml });
            }}
            style={{
              display: this.state.isVisibleHtml ? 'flex' : 'none'
            }}
            className={cx({
              tabStyleActive: this.state.isActiveHtml,
              tabStyleInactive: !this.state.isActiveHtml
            })}
          >
            <span>HTML</span>
          </li>
          <li
            onClick={event => {
              this.props.handleNavigation(event, 'css');
              this.setState({ isActiveCss: !this.state.isActiveCss });
            }}
            style={{
              display: this.state.isVisibleCss ? 'flex' : 'none'
            }}
            className={cx({
              tabStyleActive: this.state.isActiveCss,
              tabStyleInactive: !this.state.isActiveCss
            })}
          >
            <span>CSS</span>
          </li>
          <li
            onClick={event => {
              this.props.handleNavigation(event, 'javascript');
              this.setState({
                isActiveJavascript: !this.state.isActiveJavascript
              });
            }}
            style={{
              display: this.state.isVisibleJavascript ? 'flex' : 'none'
            }}
            className={cx({
              tabStyleActive: this.state.isActiveJavascript,
              tabStyleInactive: !this.state.isActiveJavascript
            })}
          >
            <span>JavaScript</span>
          </li>
          <li
            onClick={event => {
              this.props.handleNavigation(event, 'console');
              this.setState({
                isActiveConsole: !this.state.isActiveConsole
              });
            }}
            style={{
              display: this.state.isVisibleConsole ? 'flex' : 'none'
            }}
            className={cx({
              tabStyleActive: this.state.isActiveConsole,
              tabStyleInactive: !this.state.isActiveConsole
            })}
          >
            <span>Console</span>
          </li>
          <li
            onClick={event => {
              this.props.handleNavigation(event, 'testing');
              this.setState({
                isActiveTesting: !this.state.isActiveTesting
              });
            }}
            style={{
              display: this.state.isVisibleTesting ? 'flex' : 'none'
            }}
            className={cx({
              tabStyleActive: this.state.isActiveTesting,
              tabStyleInactive: !this.state.isActiveTesting
            })}
          >
            <span>Testing</span>
          </li>
          <li
            onClick={event => {
              this.props.handleNavigation(event, 'excercise');
              this.setState({
                isActiveExcercise: !this.state.isActiveExcercise
              });
            }}
            style={{
              display: this.state.isVisibleExcercise ? 'flex' : 'none'
            }}
            className={cx({
              tabStyleActive: this.state.isActiveExcercise,
              tabStyleInactive: !this.state.isActiveExcercise
            })}
          >
            <span>Aufgabenstellung</span>
          </li>
          <li
            onClick={event => {
              this.props.handleNavigation(event, 'output');
              this.setState({
                isActiveOutput: !this.state.isActiveOutput
              });
            }}
            style={{
              display: this.state.isVisibleOutput ? 'flex' : 'none'
            }}
            className={cx({
              tabStyleActive: this.state.isActiveOutput,
              tabStyleInactive: !this.state.isActiveOutput
            })}
          >
            <span>Ouput</span>
          </li>
        </ul>
      </nav>
    );
  }
}
