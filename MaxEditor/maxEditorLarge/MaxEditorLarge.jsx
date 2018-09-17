/* @flow */
import React from 'react';
import './MaxEditorLarge.scss';
import cx from 'classnames';

// $FlowFixMe
import { renderer as Renderer } from './../../../../lib/Knoala/app/main';
import { defaultHtml, defaultJs, defaultCss } from '../testData/mockData';
import EditorWindow from './../editorWindow/EditorWindow';
import MaxIframe from './../maxIframe/MaxIframe';
import NavBar from './../editorNavBar/EditorNavBar';
import VirtualConsole from './../virtualConsole/VirtualConsole';
import TestingWindow from './../testingWindow/TestingWindow';

// iframe style
const basicIframeStyles = `
html,
body {
  margin: 0px;
  padding: 0px;
  border: 0px;
  width: 100%;
  height: 100%;
}
`;

// editor types
type editorWindowTypes =
  | 'output'
  | 'console'
  | 'html'
  | 'css'
  | 'javascript'
  | 'excercise'
  | 'testing';

// TODOS
// 1. editor
// 2. focusing
// 3. librarys einbinden
// 4. security anschauen
// 5. Ende Juni Antrittsvortrag
// 6. Server Anbindung
// 7. Evaluation schreiben (Thesis)
// 8. Didaktik macht Sebastian
// Margins links rechts cheaten
// bootstrap ist einfach da!
// schreiben im editor# DONE
// this.onchange.bind(this, "html") an die windows runter gegben DONE
// use react state DONE

//@observer(['maxEditorStore'])
type MaxEditorLargeState = {
  html: string,
  css: string,
  javascript: string,
  autoRun: boolean,
  isVisibleHtml: boolean,
  isVisibleCss: boolean,
  isVisibleJavascript: boolean,
  isVisibleOutput: boolean,
  isVisibleConsole: boolean,
  isVisibleTesting: boolean,
  isVisibleExcercise: boolean,
  errorMessageHistory: any
};

type MaxEditorLargeProps = {
  // is this correct? best practice?
  markup?: ?string,
  windowTypes: Array<editorWindowTypes>
};

export default class MaxEditorLarge extends React.Component<
  MaxEditorLargeProps,
  MaxEditorLargeState
> {
  // initialize state
  constructor(props: any) {
    super(props);
    this.state = {
      html: defaultHtml,
      css: defaultCss,
      javascript: defaultJs,
      autoRun: true,
      isVisibleHtml: true,
      isVisibleCss: true,
      isVisibleJavascript: true,
      isVisibleOutput: true,
      isVisibleConsole: true,
      isVisibleTesting: true,
      isVisibleExcercise: true,
      errorMessageHistory: []
    };
  }

  // shouldComponentUpdate = () => {
  //   return this.state.autoRun;
  // };

  handleSave = (event: SyntheticEvent<HTMLButtonElement>) => {
    // TODO : implement functionality
    event.preventDefault();
  };

  // Manage code auto-run
  autoRun = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.setState({
      autoRun: !this.state.autoRun
    });
  };

  // Run JS and log errors to the console
  // TODO: catch console.log() in code and write to console!
  // DEBUG!!!!!!
  runJavascript = event => {
    event.preventDefault();
    const errorMessage = this.myIframe.executeJavascriptInIframeContext(
      this.state.javascript
    );
    this.myConsole.receiveDataFromParent(errorMessage[0], errorMessage[1]);
  };

  // handle code input into editor
  onEditorInput = (newValue: string, mode: string) => {
    if (this.state.autoRun) {
      this.setState({
        [mode]: newValue
      });
    } else return null;
  };

  handleConsoleIframeCommunication = input => {
    return this.myIframe.executeJavascriptInIframeContext(input);
  };

  // handle navigation bar
  handleNavigation = (
    event: SyntheticEvent<HTMLButtonElement>,
    type: string
  ) => {
    switch (type) {
      case 'javascript':
        this.setState({
          isVisibleJavascript: !this.state.isVisibleJavascript
        });
        break;
      case 'html':
        this.setState({
          isVisibleHtml: !this.state.isVisibleHtml
        });
        break;
      case 'css':
        this.setState({
          isVisibleCss: !this.state.isVisibleCss
        });
        break;
      case 'output':
        this.setState({
          isVisibleOutput: !this.state.isVisibleOutput
        });
        break;
      case 'console':
        this.setState({
          isVisibleConsole: !this.state.isVisibleConsole
        });
        break;
      case 'testing':
        this.setState({
          isVisibleTesting: !this.state.isVisibleTesting
        });
        break;
      case 'excercise':
        this.setState({
          isVisibleExcercise: !this.state.isVisibleExcercise
        });
        break;
      default:
        break;
    }
  };

  // main render method
  render() {
    const { windowTypes } = this.props;
    const htmlMarkup = new Renderer(
      ['Latex', 'Markdown', 'HighlightCode'],
      false
    ).expand(
      `### Excercise
      * 1
      `
    );
    return (
      <div className="mainWindow">
        <NavBar
          handleNavigation={this.handleNavigation}
          windowTypes={this.props.windowTypes}
        />
        <div className="windowsContainer">
          <div
            className="columnContainer"
            style={{
              display:
                this.state.isVisibleHtml && windowTypes.includes('html')
                  ? 'block'
                  : 'none'
            }}
          >
            <EditorWindow
              mode="html"
              theme="textmate"
              height="100%"
              onEditorInput={this.onEditorInput}
              aceEditorValue={this.state.html}
            />
          </div>
          <div
            className="columnContainer"
            style={{
              display:
                this.state.isVisibleCss && windowTypes.includes('css')
                  ? 'block'
                  : 'none'
            }}
          >
            <EditorWindow
              mode="css"
              theme="textmate"
              height="100%"
              aceEditorValue={this.state.css}
              onEditorInput={this.onEditorInput}
            />
          </div>
          <div
            className="columnContainer"
            style={{
              display:
                this.state.isVisibleJavascript &&
                windowTypes.includes('javascript')
                  ? 'block'
                  : 'none'
            }}
          >
            <EditorWindow
              mode="javascript"
              theme="textmate"
              onEditorInput={this.onEditorInput}
              aceEditorValue={this.state.javascript}
            />
          </div>
          <div
            className="columnContainer"
            style={{
              display:
                this.state.isVisibleConsole && windowTypes.includes('console')
                  ? 'block'
                  : 'none'
            }}
          >
            <VirtualConsole
              ref={myConsole => {
                this.myConsole = myConsole;
              }}
              receiveFromIframe={this.handleConsoleIframeCommunication}
            />
          </div>
          <div
            className="columnContainer"
            style={{
              display:
                this.state.isVisibleTesting && windowTypes.includes('testing')
                  ? 'block'
                  : 'none'
            }}
          >
            <TestingWindow />
          </div>
          <div
            className="columnContainer"
            style={{
              display:
                this.state.isVisibleExcercise &&
                windowTypes.includes('excercise')
                  ? 'block'
                  : 'none'
            }}
          >
            <span dangerouslySetInnerHTML={{ __html: htmlMarkup }} />
          </div>
          <div
            className="columnContainer"
            style={{
              display:
                this.state.isVisibleOutput && windowTypes.includes('output')
                  ? 'block'
                  : 'none'
            }}
          >
            <MaxIframe
              ref={myIframe => {
                this.myIframe = myIframe;
              }}
              autorun={this.state.autoRun}
              html={this.state.html}
              stylesheets={[this.state.css, basicIframeStyles]}
              javascriptScripts={[this.state.javascript]}
            />
          </div>
        </div>
        <div className="footer">
          <input
            className="lowerButtons"
            type="submit"
            onClick={this.runJavascript}
            value="Run Code"
          />
          <input
            className={cx({
              lowerButtons: this.state.autoRun,
              lowerButtonsInactive: !this.state.autoRun
            })}
            type="submit"
            onClick={this.autoRun}
            value="Toggle Autorun"
          />
          <input
            className="lowerButtons"
            type="submit"
            onClick={this.handleSave}
            value="Save"
          />
        </div>
      </div>
    );
  }
}
