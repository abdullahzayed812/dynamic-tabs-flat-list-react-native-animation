import React from "react";
import { StyleSheet, View, Image, Dimensions, Animated } from "react-native";
import { Tabs } from "./components/Tabs";

const images = {
  man: "https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  women:
    "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  kids: "https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  skullcandy:
    "https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  help: "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
};

const DATA = Object.keys(images).map((item) => ({
  key: item,
  title: item,
  image: images[item],
  ref: React.createRef(),
}));

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  const { width, height } = Dimensions.get("screen");

  const onItemPress = React.useCallback((itemIndex) => {
    ref?.current?.scrollToOffset({
      offSet: itemIndex * width,
      animated: true,
    });
  });

  const renderItem = React.useCallback(
    ({ item }) => (
      <>
        <Image
          source={{ uri: item.image }}
          style={{ width, height }}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
      </>
    ),
    [DATA]
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={ref}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        bounces={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            },
          ],
          { useNativeDriver: false }
        )}
      />
      <Tabs
        data={DATA}
        scrollX={scrollX}
        width={width}
        onItemPress={onItemPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});
