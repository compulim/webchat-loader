import { take as reduxSagaTake } from 'redux-saga/effects';

import type { Action } from '../../reducer';
import type { ActionPattern, TakeEffect } from 'redux-saga/effects';

export default function take(pattern?: ActionPattern<Action>): TakeEffect {
  return reduxSagaTake<Action>(pattern) as TakeEffect;
}
