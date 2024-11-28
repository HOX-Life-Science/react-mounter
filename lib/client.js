/* global document*/

import React from 'react';
import domready from 'domready';
import { buildRootNode } from './utils';
import {createRoot} from 'react-dom/client';

export let _isDomReady = false;
export function _ready(cb) {
  if (_isDomReady) {
    return cb();
  }

  domready(() => {
    _isDomReady = true;
    setTimeout(cb, 10);
  });
}

// use this to store all the roots created
const roots = {};



export function _getRootNode(rootId, rootProps) {
  const rootNode = document.getElementById(rootId);

  if (rootNode) {
    return rootNode;
  }

  const rootNodeHtml = buildRootNode(rootId, rootProps);
  const body = document.getElementsByTagName('body')[0];
  body.insertAdjacentHTML('beforeend', rootNodeHtml);

  return document.getElementById(rootId);
}

export function mounter(layoutClass, regions, options) {
  _ready(() => {
    const {rootId, rootProps} = options;
    const rootNode = _getRootNode(rootId, rootProps);

    const el = React.createElement(layoutClass, regions);


    if (!roots[rootId]) {
      //  create root and store for later reuse
      roots[rootId] = createRoot(rootNode);
      roots[rootId].render(el);

    } else {
      roots[rootId].render(el);

    }

  });
}
