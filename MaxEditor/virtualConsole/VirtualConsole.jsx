/* @flow */
import React from 'react';
import './VirtualConsole.scss';
import $ from 'jquery';
// eslint-disable-line no-unused-vars
import jqconsole from 'jq-console-altgr';

type VirtualConsoleProps = { receiveFromIframe: Function };

export default class VirtualConsole extends React.Component<void, void> {
  myConsole: Object;
  constructor(props: VirtualConsoleProps) {
    super(props);
    this.myConsole = {};
  }

  componentDidMount = () => {
    // Execute after fully loaded
    this.myConsole = $('#console').jqconsole('Welcome to the console!\n', '> ');

    $(window).bind('load', () => {
      // register some workarounds
      this.myConsole.RegisterMatching('{', '}', 'brace');
      this.myConsole.RegisterMatching('(', ')', 'paran');
      this.myConsole.RegisterMatching('[', ']', 'bracket');

      const startPrompt = () => {
        // scroll to bottom -- NOT WORKING YET
        $('#console').scrollTop($('#console')[0].scrollHeight);
        // Start the prompt with history enabled.
        this.myConsole.Prompt(true, input => {
          // Manage Output
          try {
            // SEND INPUT TO IFRAME AND RECEIVE OUTPUT:
            const data = this.props.receiveFromIframe(input);
            this.writeToConsole(data[0], data[1]);

            // Restart the input prompt.
            startPrompt();
          } catch (error) {
            console.log(error);
            // this.writeToConsole('error', error);
            // Restart the input prompt.
            startPrompt();
          }
        });
      };
      // Restart the input prompt.
      startPrompt();
    });
  };

  // Manage Output
  writeToConsole = (type, message) => {
    console.log('writing to console @ console');
    if (type === 'error') {
      this.myConsole.Write(message + '\n', 'jqconsole-output-error');
    } else if (type === 'message') {
      this.myConsole.Write(message + '\n', 'jqconsole-output');
    } else if (type === 'object') {
      this.myConsole.Write(JSON.stringify(message) + '\n', 'jqconsole-output');
    } else {
      console.log('error @ writeToConsole');
      return null;
    }
  };

  // TODO: reafactor types to enum
  receiveDataFromParent = (type: string, data: string) => {
    this.writeToConsole(type, data);
  };

  render() {
    return <div id="console" />;
  }
}
