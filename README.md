# react-native-header-arupaka-r

`react-native-header-arupaka-r`は、React Nativeアプリで使用できるカスタムヘッダービューコンポーネントです。このコンポーネントでは、画面の上スクロールでヘッダーが表示され、下スクロールでヘッダーが隠れるというスクロールに応じた動作も可能です。


https://github.com/user-attachments/assets/818975d4-7b42-4ca6-9dbf-3df5b66e7671


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
import { Text, View } from 'react-native';
import { ArupakaHeaderView } from 'react-native-header-arupaka-r';

const App = () => {
  return (
    <ArupakaHeaderView headerTitle='ヘッダー' showBackButton={false} onClickBackButton={()=>console.log("バックボタンが押された")}>
      <View>
        {Array.from({ length: 100 }, (_, i) => (
          <Text key={i}>{i}</Text>
        ))}
      </View>
    </ArupakaHeaderView>
  );
};

export default App;
```

## Props

| Property     | Type            | Default | Description                          |
|--------------|-----------------|---------|--------------------------------------|
| headerTitle  | string          | ""      | ヘッダーの中央に表示する文字         |
| showBackButton | boolean       | false   | 戻るボタンの表示の有無|
| onClickBackButton | function   | null    | 戻るボタンを押した時に呼ばれる関数
| headerColor  | string          | white   | ヘッダーの色|
| headerHeight | number          | 60      | ヘッダーの高さ| 
| content      | React.ReactNode | null    | ヘッダー内に表示するReactコンポーネント |
| contentColor | string          | white |scrollviewの色|
| footInsetColor | string        | white | footerの下のInset部分の色

