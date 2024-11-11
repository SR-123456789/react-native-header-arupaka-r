import { View } from 'react-native';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  onChangeHeight: (v: number) => void;
};
const GetInsetValue = ({ onChangeHeight }: Props) => {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    onChangeHeight(insets.top);
  }, [insets.top, onChangeHeight]);
  return <View />;
};

export default GetInsetValue;
