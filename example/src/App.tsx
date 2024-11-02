import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { multiply } from 'react-native-header-arupaka-r';
import { ArupakaHeader } from 'react-native-header-arupaka-r';
export default function App() {
  const [result, setResult] = useState<number | undefined>();

  useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <View>
      <ArupakaHeader backgroundColor="green" title="Hello, world!s" />
      <SafeAreaView>
        <Text>Result: {result}</Text>
      </SafeAreaView>
    </View>
  );
}
