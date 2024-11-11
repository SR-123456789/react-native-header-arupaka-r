import React, { useEffect, useState } from 'react';
import { View, Dimensions, Animated, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GetInsetValue from './GetInsetValue';
import HeaderViewHeaderContent from './HeaderViewHeaderContent';
import { DefaultHeaderColor, DefaultHeaderHeight } from './DefalutValue';

type HeaderProps = {
  title?: string;
  style?: any;
  height?: number;
  backgroundColor: string;
  isShow: boolean;
  showBackButton?: boolean;
  onClickBackButton?: () => void;
  content: () => React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  style,
  backgroundColor,
  height,
  showBackButton = false,
  onClickBackButton = () => {},
  isShow,
  content,
}) => {
  const [translateY] = useState(new Animated.Value(0));
  const [insetHeight, setInsetHeight] = useState<number>(0);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isShow ? 0 : -DefaultHeaderHeight,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isShow, translateY]);

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <GetInsetValue onChangeHeight={(v: number) => setInsetHeight(v)} />
      </SafeAreaProvider>
      <View
        style={[
          styles.insetBackground,
          {
            height: insetHeight,
            backgroundColor: backgroundColor || DefaultHeaderColor,
          },
        ]}
      />
      <HeaderViewHeaderContent
        showBackButton={showBackButton}
        onClickBackButton={onClickBackButton}
        insetHeight={insetHeight}
        isShow={isShow}
        title={title}
        style={style}
        backgroundColor={backgroundColor}
        height={height}
        translateY={translateY}
        content={content}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    borderColor: 'gray',
    borderBottomWidth: 1,
    zIndex: 1,
  },
  insetBackground: {
    zIndex: 1000,
  },
});

export default Header;
