import { css } from 'glamor';
import React, { useMemo } from 'react';

const ROOT_CSS = css({
  margin: '1em 0',

  '& > label': {
    alignItems: 'flex-start',
    display: 'flex',

    '& > header': {
      display: 'inline-block',
      width: 100
    },

    '& > div': {
      flex: 1
    }
  }
});

const Row = ({ children, header }) => (
  <section className={ ROOT_CSS }>
    <label>
      <header>{ header }</header>
      <div>{ children }</div>
    </label>
  </section>
);

export default Row
