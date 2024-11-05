/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type HeaderProps = {
  title?: string;
  style?: any;
  height?: number;
  backgroundColor: string;
  scrollRef?: React.RefObject<any>;
  content?: () => JSX.Element;
};

const defaultHeight = 50;
const defaultBackgroundColor = 'red';

// HeaderContentコンポーネント（実際のヘッダー内容）
const HeaderContent: React.FC<HeaderProps> = ({
  title,
  content,
  style,
  backgroundColor,
  height,
}) => {
  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : defaultBackgroundColor,
          height: height ? height : defaultHeight,
          width: Dimensions.get('window').width,
        },
      ]}
    >
      <Text style={[styles.text, style]}>{title}</Text>
      {content && content()}
    </View>
  );
};

// SafeAreaProviderでラップするHeaderコンポーネント
export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <View
      style={{
        zIndex: 0,
        minHeight: props.height ? props.height : defaultHeight,
      }}
    >
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : defaultBackgroundColor,
          }}
        >
          <HeaderContent {...props} />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
};

// スタイルシートの定義
const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
});
