import type { FC, JSX } from "react";
import { Provider } from 'react-redux';
import { store } from '../store/index.ts';

interface IProviders {
  readonly children: JSX.Element;
}

export const Providers: FC<IProviders> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
