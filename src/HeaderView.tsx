import { useRef, useState } from 'react';
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
  headerTitleColor = 'black',
  children,
  footInsetColor = 'white',
  headerColor,
  contentColor,
  headerTitle,
  onClickBackButton = () => {},
  content,
  showBackButton = false,
}: HeaderViewProps) => {
  const beforeScrollY = useRef(0);

  const [isShowHeader, setIsShowHeader] = useState(true);
  const [, reRenderling] = useState({});
  const headerHideAmount = useRef(headerHeight);

  console.log(headerHideAmount.current);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (currentScrollY < headerHeight + DefaultNoneScrollMargin) {
      setIsShowHeader(true);
      return;
    }

    if (currentScrollY > beforeScrollY.current) {
      headerHideAmount.current = Math.max(
        0,
        headerHideAmount.current - (currentScrollY - beforeScrollY.current)
      );
      reRenderling({});
      setIsShowHeader(false);
    }
    if (currentScrollY < beforeScrollY.current) {
      headerHideAmount.current = Math.min(
        headerHeight,
        headerHideAmount.current + (beforeScrollY.current - currentScrollY)
      );
      reRenderling({});
      setIsShowHeader(true);
    }
    beforeScrollY.current = currentScrollY;
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
            headerTitleColor={headerTitleColor}
            showAmount={headerHideAmount.current}
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
            scrollEventThrottle={100}
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
