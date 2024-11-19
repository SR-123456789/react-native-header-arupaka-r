import React, { useEffect, useState } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { DefaultHeaderColor, DefaultHeaderHeight } from './DefalutValue';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { HeaderProps } from '../index';

export const Header: React.FC<HeaderProps> = ({
  title,
  backgroundColor,
  height,
  showBackButton = false,
  onClickBackButton = () => {},
  isShow,
  content = () => <View />,
}) => {
  const [translateY] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isShow ? 0 : -DefaultHeaderHeight + 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isShow, translateY]);

  return (
    <Animated.View
      style={[
        styles.animatedView,
        {
          height: height || DefaultHeaderHeight,
          backgroundColor: backgroundColor || DefaultHeaderColor,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.contentView}>
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
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    borderColor: 'gray',
    borderBottomWidth: 1,
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

export default Header;
