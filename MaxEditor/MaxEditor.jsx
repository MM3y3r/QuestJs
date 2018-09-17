/* @flow */
import React from 'react';
import './MaxEditor.scss';

import MaxEditorLarge from './maxEditorLarge/MaxEditorLarge';
import MaxEditorCompact from './maxEditorCompact/MaxEditorCompact';
import { defaultMarkup } from './testData/mockData';

type editorWindowTypes =
  | 'output'
  | 'console'
  | 'html'
  | 'css'
  | 'javascript'
  | 'excercise'
  | 'testing';

type editorSize = 'compact' | 'large';

type MaxEditorState = {
  html: string,
  css: string,
  javascript: string,
  handleRerender: boolean
};

type MaxEditorProps = {
  size?: ?editorSize,
  markup?: ?string,
  windowTypes?: ?Array<editorWindowTypes>
};

// TODO markup prop (Aufggabenstellung<)
// see Markup.jsx

export default class MaxEditor extends React.Component<
  MaxEditorProps,
  MaxEditorState
> {
  constructor(props: MaxEditorProps) {
    super(props);
  }
  render() {
    //console.log('editor parent props');
    //console.log(this.props);

    const { size, markup, windowTypes, ...props } = this.props;

    switch (size) {
      case 'compact':
        return (
          <MaxEditorCompact
            markup={markup}
            windowTypes={windowTypes}
            {...props}
          />
        );

      case 'large':
        return (
          <MaxEditorLarge
            markup={markup}
            windowTypes={windowTypes}
            {...props}
          />
        );

      default:
        return (
          <MaxEditorLarge
            markup={markup}
            windowTypes={windowTypes}
            {...props}
          />
        );
    }
  }
}

// example props as default
MaxEditor.defaultProps = {
  windowTypes: [
    'html',
    'css',
    'javascript',
    'output',
    'console',
    'excercise',
    'testing'
  ],
  markup: defaultMarkup
};
