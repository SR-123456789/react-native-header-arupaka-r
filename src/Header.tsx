import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { HeaderProps } from '..';
import { DefaultHeaderColor, DefaultHeaderHeight } from './DefalutValue';

export const Header: React.FC<HeaderProps> = ({
  backBottomColor = 'black',
  headerTitleColor = 'black',
  showAmount = DefaultHeaderHeight,
  title,
  backgroundColor,
  height = DefaultHeaderHeight,
  showBackButton = false,
  onClickBackButton = () => {},
  content = () => <View />,
}) => {
  const [translateY] = useState(new Animated.Value(0)); // 初期値は隠れた状態

  // showAmountに応じたアニメーション
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: Math.max(-height + 1, -(height - showAmount)), // showAmount分だけヘッダーを動かす
      duration: 200, // アニメーションの時間
      useNativeDriver: true,
    }).start();
  }, [showAmount, translateY, height]); // showAmountが変更されたときに実行

  return (
    <Animated.View
      style={[
        styles.animatedView,
        {
          height: height || DefaultHeaderHeight,
          backgroundColor: backgroundColor || DefaultHeaderColor,
          transform: [{ translateY }], // translateYを反映
        },
      ]}
    >
      <View style={styles.contentView}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => onClickBackButton()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={30} color={backBottomColor} />
          </TouchableOpacity>
        )}
        <View style={styles.contentView}>
          <Text style={[{ color: headerTitleColor }, styles.text]}>
            {title}
          </Text>
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
