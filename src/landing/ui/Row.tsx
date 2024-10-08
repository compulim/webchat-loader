import './Row.css';

import classNames from 'classnames';
import { memo, type PropsWithChildren } from 'react';

type Props = PropsWithChildren<
  Readonly<{
    className?: string;
    header: string;
    rowLabel?: boolean;
  }>
>;

const Row = memo(({ children, className, header, rowLabel = true }: Props) => (
  <section className="row">
    {rowLabel ? (
      <label className="row__label">
        <header className="row__title">{header}</header>
        <div className={classNames('row__body', className)}>{children}</div>
      </label>
    ) : (
      <div className="row__label">
        <header className="row__title">{header}</header>
        <div className={classNames('row__body', className)}>{children}</div>
      </div>
    )}
  </section>
));

Row.displayName = 'Row';

export default Row;
