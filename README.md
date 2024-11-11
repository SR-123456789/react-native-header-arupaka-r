# react-native-header-arupaka-r

`react-native-header-arupaka-r`は、React Nativeアプリで使用できるカスタムヘッダービューコンポーネントです。このコンポーネントでは、画面の上スクロールでヘッダーが表示され、下スクロールでヘッダーが隠れるというスクロールに応じた動作も可能です。

## 特徴

- カスタマイズ可能なヘッダータイトル
- バックボタンの表示/非表示オプション
- スクロールに応じてヘッダーの表示/非表示を自動制御
- バックボタンクリック時のコールバック関数設定

## インストール

```bash
yarn add react-native-header-arupaka-r
```
または
```bash
npm install react-native-header-arupaka-r
```

## 使用方法
以下のサンプルコードは、react-native-header-arupaka-rを使用して、スクロールに応じてヘッダーが表示・非表示になる機能を有効にした例です。

```TypeScript
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ArupakaHeaderView } from 'react-native-header-arupaka-r';

const App = () => {
  const [showHeader, setShowHeader] = useState(true);
  let lastScrollY = 0;

  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    setShowHeader(currentScrollY < lastScrollY);
    lastScrollY = currentScrollY;
  };

  return (
    <View style={{ flex: 1 }}>
      {showHeader && (
        <ArupakaHeaderView
          headerTitle="ヘッダー"
          showBackButton={true}
          onClickBackButton={() => console.log("バックボタンが押された")}
        />
      )}
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        {Array.from({ length: 100 }, (_, i) => (
          <Text key={i} style={{ padding: 20 }}>{i}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default App;
```

Props
headerTitle: string
ヘッダーに表示するタイトル。例: "ヘッダー"

showBackButton: boolean
バックボタンを表示するかどうかを決定します。trueで表示、falseで非表示。デフォルトはtrue。

onClickBackButton: function
バックボタンがクリックされたときに呼び出されるコールバック関数。例: () => console.log("バックボタンが押された")

