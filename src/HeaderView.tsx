import { useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import { Header } from './Header';
import {
  DefaultContentColor,
  DefaultFootInsetColor,
  DefaultHeaderHeight,
  DefaultNoneScrollMargin,
} from './DefalutValue';
import type { HeaderViewProps } from '../index';

const HeaderView = ({
  headerHeight = DefaultHeaderHeight,
  children,
  footInsetColor = 'white',
  headerColor,
  contentColor,
  headerTitle,
  onClickBackButton = () => {},
  content,
  showBackButton = false,
}: HeaderViewProps) => {
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
      <SafeAreaView
        style={[
          styles.safeAreaHeader,
          { backgroundColor: headerColor || DefaultFootInsetColor },
        ]}
      >
        <View style={styles.contentView}>
          <Header
            isShow={isShowHeader}
            height={headerHeight}
            title={headerTitle}
            backgroundColor={headerColor}
            onClickBackButton={onClickBackButton}
            showBackButton={showBackButton}
            content={content}
          />
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
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={[{ backgroundColor: footInsetColor || DefaultFootInsetColor }]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaHeader: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flex: 1,
  },
  contentView: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default HeaderView;
