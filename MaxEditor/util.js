/* @flow */

export function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export type editorWindowTypes =
  | 'output'
  | 'console'
  | 'html'
  | 'css'
  | 'javascript'
  | 'excercise'
  | 'testing';
