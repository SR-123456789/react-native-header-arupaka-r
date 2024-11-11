import { Header } from './Header';
import HeaderView from './HeaderView';

export const ArupakaHeader = Header;
export const ArupakaHeaderView = HeaderView;

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}
