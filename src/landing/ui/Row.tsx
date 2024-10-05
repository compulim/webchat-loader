import './Row.css';

import classNames from 'classnames';

import React, { memo, type PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
  header: string;
  rowLabel?: boolean;
}>;

const Row = memo(({ children, className, header, rowLabel = true }: Props) => (
  <section className="row">
    {rowLabel ? (
      <label className="row__label">
        <header className="row__header">{header}</header>
        <div className={classNames('row__body', className)}>{children}</div>
      </label>
    ) : (
      <div className="row__label">
        <header className="row__header">{header}</header>
        <div className={classNames('row__body', className)}>{children}</div>
      </div>
    )}
  </section>
));

export default Row;
