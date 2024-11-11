import React, { useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import { Header } from './Header';
import {
  DefaultContentColor,
  DefaultFootInsetColor,
  DefaultHeaderHeight,
  DefaultNoneScrollMargin,
} from './DefalutValue';

type Props = {
  children?: React.ReactNode;
  footInsetColor?: string;
  headerColor?: string;
  contentColor?: string;
  headerHeight?: number;
  headerTitle?: string;
  showBackButton?: boolean;
  onClickBackButton?: () => void;
  content?: () => React.ReactNode;
};

const HeaderView = ({
  headerHeight = DefaultHeaderHeight,
  children,
  footInsetColor = 'white',
  headerColor = 'white',
  contentColor,
  headerTitle,
  onClickBackButton = () => {},
  content,
  showBackButton = false,
}: Props) => {
  let beforeScrollY = 0;

  const [isShowHeader, setIsShowHeader] = useState(true);
  let isShow = false;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (currentScrollY < headerHeight + DefaultNoneScrollMargin) {
      setIsShowHeader(true);
      isShow = true;
      return;
    }

    if (currentScrollY - 10 > beforeScrollY) {
      if (isShow) {
        isShow = false;
        setIsShowHeader(false);
      }
    }
    if (currentScrollY + 10 < beforeScrollY) {
      if (!isShow) {
        isShow = true;
        setIsShowHeader(true);
      }
    }
    beforeScrollY = currentScrollY;
  };

  return (
    <>
      <Header
        height={headerHeight}
        isShow={isShowHeader}
        title={headerTitle}
        backgroundColor={headerColor}
        onClickBackButton={onClickBackButton}
        showBackButton={showBackButton}
        content={content}
      />
      <SafeAreaView
        style={[
          styles.safeArea,
          { backgroundColor: footInsetColor || DefaultFootInsetColor },
        ]}
      >
        <ScrollView
          style={[
            styles.scrollView,
            {
              paddingTop: headerHeight,
              backgroundColor: contentColor || DefaultContentColor,
            },
          ]}
          onScroll={handleScroll}
          scrollEventThrottle={160}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export default HeaderView;
