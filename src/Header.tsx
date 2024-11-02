/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type HeaderProps = {
  title: string;
  style: any;
  backgroundColor: string;
  content?: () => JSX.Element;
};

const defaultHeight = 50;
const defaultBackgroundColor = 'white';

// HeaderContentコンポーネント（実際のヘッダー内容）
const HeaderContent: React.FC<HeaderProps> = ({
  title,
  content,
  style,
  backgroundColor,
}) => {
  const insets = useSafeAreaInsets(); // SafeAreaInsetsを取得
  console.log(insets);

  return (
    <View
      style={{
        backgroundColor: backgroundColor
          ? backgroundColor
          : defaultBackgroundColor,
        minHeight: defaultHeight,
        width: Dimensions.get('window').width,
      }}
    >
      <Text style={{ ...style }}>{title}</Text>
      {content && content()}
    </View>
  );
};

// SafeAreaProviderでラップするHeaderコンポーネント
export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <View style={{ zIndex: 1000 }}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : 'red',
          }}
        >
          <HeaderContent {...props} />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
};
