/* @flow */
import React from 'react';
import './MaxEditorCompact.scss';

import { defaultHtml, defaultJs, defaultCss } from '../testData/mockData';
import EditorWindow from './../editorWindow/EditorWindow';
import MaxIframe from './../maxIframe/MaxIframe';

type MaxEditorCompactState = {
  html: string,
  css: string,
  javascript: string,
  handleRerender: boolean,
  tabMode: string
};

type MaxEditorCompactProps = {
  markdown?: ?string,
  windowTypes?: ?Array<string>
};

const TabModeEnum = {
  JS: 'javascript',
  HTML: 'html',
  CSS: 'css',
  OUTPUT: 'output'
};

export default class MaxEditorCompact extends React.Component<
  MaxEditorCompactProps,
  MaxEditorCompactState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      html: defaultHtml,
      css: defaultCss,
      javascript: defaultJs,
      handleRerender: true,
      tabMode: TabModeEnum.JS
    };
  }

  shouldComponentUpdate = () => {
    return this.state.handleRerender;
  };

  handleSave = (event: SyntheticEvent<HTMLButtonElement>) => {
    // TODO : implement functionality
    event.preventDefault();
    console.log('save button press!');
  };

  handleRerender = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.setState({
      handleRerender: !this.state.handleRerender
    });
  };

  // forceUpdate = (event: SyntheticEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   this.forceUpdate();
  // };

  onEditorInput = (newValue: string, editorMode: string) => {
    //console.log(this.state);
    //console.log('mode: ', mode);
    this.setState({
      [editorMode]: newValue
    });
  };

  handleChangeTab = (
    event: SyntheticEvent<HTMLButtonElement>,
    tabMode: string
  ) => {
    event.preventDefault();
    this.setState({ tabMode: tabMode });
  };

  renderTab = (tabMode: string) => {
    switch (tabMode) {
      case 'javascript':
        return (
          <EditorWindow
            mode="javascript"
            theme="TextMate"
            height="100%"
            onEditorInput={this.onEditorInput}
            aceEditorValue={this.state.javascript}
          />
        );
      case 'html':
        return (
          <EditorWindow
            mode="html"
            theme="TextMate"
            height="100%"
            onEditorInput={this.onEditorInput}
            aceEditorValue={this.state.html}
          />
        );
      case 'css':
        return (
          <EditorWindow
            mode="css"
            theme="TextMate"
            height="100%"
            aceEditorValue={this.state.css}
            onEditorInput={this.onEditorInput}
          />
        );
      case 'output':
        return (
          <MaxIframe
            html={this.state.html}
            stylesheets={[this.state.css]}
            javascriptScripts={[this.state.javascript]}
          />
        );
      default:
        return (
          <EditorWindow
            mode="javascript"
            theme="TextMate"
            height="100%"
            onEditorInput={this.onEditorInput}
            aceEditorValue={this.state.javascript}
          />
        );
    }
  };

  render() {
    return (
      <div className="editorContainer">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              onClick={event => {
                this.handleChangeTab(event, TabModeEnum.JS);
              }}
              className={
                this.state.tabMode === TabModeEnum.JS
                  ? 'active nav-link'
                  : 'nav-link disabled'
              }
              href="#"
            >
              JavaScript
            </a>
          </li>
          <li className="nav-item">
            <a
              className={
                this.state.tabMode === TabModeEnum.HTML
                  ? 'active nav-link'
                  : 'nav-link disabled'
              }
              href="#"
              onClick={event => {
                this.handleChangeTab(event, TabModeEnum.HTML);
              }}
            >
              Html
            </a>
          </li>
          <li className="nav-item">
            <a
              className={
                this.state.tabMode === TabModeEnum.CSS
                  ? 'active nav-link'
                  : 'nav-link disabled'
              }
              href="#"
              onClick={event => {
                this.handleChangeTab(event, TabModeEnum.CSS);
              }}
            >
              Css
            </a>
          </li>
          <li className="nav-item">
            <a
              className={
                this.state.tabMode === TabModeEnum.OUTPUT
                  ? 'active nav-link'
                  : 'nav-link disabled'
              }
              href="#"
              onClick={event => {
                this.handleChangeTab(event, TabModeEnum.OUTPUT);
              }}
            >
              Output
            </a>
          </li>
        </ul>
        <div className="tabContainer">{this.renderTab(this.state.tabMode)}</div>
      </div>
    );
  }
}
