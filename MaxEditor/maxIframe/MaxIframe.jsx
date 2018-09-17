/* @flow */
import React from 'react';
import './MaxIframe.scss';

type MaxIframeProps = {
  javascriptScripts: Array<any>,
  html: string,
  stylesheets: Array<any>,
  errorListener: Function,
  autorun: Boolean
};

export default class MaxIframe extends React.Component<MaxIframeProps, any> {
  iframe: Object;
  constructor(props: any) {
    super(props);
    this.iframe = this.refs.iframe;
  }

  // Called after mounting the component. Triggers initial update of the iframe
  componentDidMount() {
    this.updateIframe();
  }

  //Called each time the props changes. Triggers an update of the iframe to
  //pass the new content
  componentDidUpdate() {
    this.updateIframe();
  }

  //Execute code in the Iframe context
  executeJavascriptInIframeContext = jscode => {
    let transformedString;
    try {
      transformedString = this.refs.iframe.contentWindow.eval(jscode);
      if (typeof transformedString === 'object') {
        return ['object', transformedString];
      } else {
        return ['message', transformedString];
      }
    } catch (error) {
      return ['error', error.message];
    }
  };

  //Updates the iframes content and inserts stylesheets/JS
  updateIframe() {
    try {
      const iframe = this.refs.iframe;
      const document = iframe.contentDocument;
      const head = document.getElementsByTagName('head')[0];
      document.body.innerHTML = this.props.html;

      if (this.props.stylesheets !== null) {
        // create or update stylesheet
        if (document.getElementById('maxEditor-style') !== null) {
          const oldRef = document.getElementById('maxEditor-style');
          oldRef.parentNode.removeChild(oldRef);
        }
        const newRef = document.createElement('style');
        const basicStyles = document.createElement('style');
        basicStyles.innerHTML = this.props.stylesheets[1];
        newRef.id = 'maxEditor-style';
        newRef.innerHTML = this.props.stylesheets[0];
        head.appendChild(basicStyles);
        head.appendChild(newRef);
      }

      if (this.props.javascriptScripts !== null) {
        // create or update Javascript code
        if (document.getElementById('maxEditor-js') !== null) {
          const oldRef = document.getElementById('maxEditor-js');
          oldRef.parentNode.removeChild(oldRef);
        }
        const newRef = document.createElement('script');
        newRef.id = 'maxEditor-js';
        newRef.innerHTML = this.props.javascriptScripts[0];
        head.appendChild(newRef);
      }
    } catch (error) {
      console.log('There seems to be an Iframe Error!');
      console.log(error);
    }
  }
  render() {
    return <iframe className="iframe" ref="iframe" id="iframeWindow" />;
  }
}
