import { FC } from 'react';

// Header コンポーネントの型定義
export interface HeaderProps {
  backBottomColor?: string;
  headerTitleColor?: string;
  showAmount?: number;
  title?: string;
  style?: any;
  height?: number;
  backgroundColor?: string;
  isShow: boolean;
  showBackButton?: boolean;
  useProvider?: boolean;
  onClickBackButton?: () => void;
  content?: () => React.ReactNode;
  isGradientAnimated?: boolean;
}

// HeaderView コンポーネントの型定義
export interface HeaderViewProps {
  backBottomColor?: string;
  headerTitleColor?: string;
  children?: React.ReactNode;
  footInsetColor?: string;
  headerColor?: string;
  contentColor?: string;
  headerHeight?: number;
  headerTitle?: string;
  showBackButton?: boolean;
  useProvider?: boolean;
  onClickBackButton?: () => void;
  content?: () => React.ReactNode;
  isGradientAnimated?: boolean;
}

// エクスポートするコンポーネント
export const ArupakaHeader: FC<HeaderProps>;
export const ArupakaHeaderView: FC<HeaderViewProps>;
