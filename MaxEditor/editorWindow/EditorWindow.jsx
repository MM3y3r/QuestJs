/* @flow */
import React from 'react';
import AceEditor from 'react-ace';

// Import a Mode (language)
import 'brace/mode/java';

// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/github';

type EditorWindowProps = {
  mode: string,
  theme: string,
  height?: ?string,
  width?: ?string,
  onEditorInput: (newValue: string, mode: string) => void,
  aceEditorValue: string,
  maxEditorStore?: any
};

export default class EditorWindow extends React.Component<
  EditorWindowProps,
  any
> {
  static defaultProps = {
    height: '100%',
    width: '100%'
  };
  onInputChange = (newValue: string) => {
    return this.props.onEditorInput(newValue, this.props.mode);
  };

  render() {
    const { mode, theme, aceEditorValue, height, width, ...props } = this.props;

    return (
      <AceEditor
        value={aceEditorValue}
        mode={mode}
        width={width}
        height={height}
        theme={theme}
        onChange={this.onInputChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{
          $blockScrolling: true
        }}
        {...props}
      />
    );
  }
}
