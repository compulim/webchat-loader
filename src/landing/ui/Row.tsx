import { css } from 'emotion';
import React from 'react';

import type { FC, PropsWithChildren } from 'react';

const ROOT_CSS = css({
  margin: '1em 0',

  '& > label, & > div': {
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

type Props = PropsWithChildren<{
  className?: string;
  header: string;
  rowLabel?: boolean;
}>;

const Row: FC<Props> = ({ children, className, header, rowLabel = true }) => (
  <section className={ROOT_CSS}>
    {rowLabel ? (
      <label>
        <header>{header}</header>
        <div className={className}>{children}</div>
      </label>
    ) : (
      <div>
        <header>{header}</header>
        <div className={className}>{children}</div>
      </div>
    )}
  </section>
);

export default Row;
