import React, { useEffect, useState } from 'react';
import {
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import { DefaultHeaderHeight, DefaultHeaderColor } from './DefalutValue';
import Ionicons from '@expo/vector-icons/Ionicons';

type HeaderViewHeaderContentProps = {
  title?: string;
  style?: any;
  height?: number;
  backgroundColor: string;
  isShow: boolean;
  insetHeight: number;
  showBackButton?: boolean;
  content: () => React.ReactNode;
  onClickBackButton?: () => void;
};

const HeaderViewHeaderContent: React.FC<
  HeaderViewHeaderContentProps & { translateY: Animated.Value }
> = ({
  title,
  style,
  height,
  insetHeight,
  backgroundColor,
  isShow,
  showBackButton = false,
  content = () => <View />,
  onClickBackButton = () => {},
}) => {
  const [translateY] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isShow ? 0 : -DefaultHeaderHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isShow, translateY]);

  return (
    <Animated.View
      style={[
        styles.animatedView,
        {
          transform: [{ translateY }],
          top: insetHeight,
          backgroundColor: backgroundColor || DefaultHeaderColor,
          height: height || DefaultHeaderHeight,
          width: Dimensions.get('window').width,
          ...style,
        },
      ]}
    >
      {showBackButton && (
        <TouchableOpacity
          onPress={() => onClickBackButton()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
      )}
      <View style={styles.contentView}>
        <Text style={styles.text}>{title}</Text>
        {content()}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    position: 'absolute',
    zIndex: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  backButton: {
    zIndex: 1,
    position: 'absolute',
  },
  contentView: {
    justifyContent: 'center',
    height: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default HeaderViewHeaderContent;
