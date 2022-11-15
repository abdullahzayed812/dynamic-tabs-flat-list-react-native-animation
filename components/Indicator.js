import React from "react";
import { StyleSheet, Animated } from "react-native";

export function Indicator({ measures, scrollX, data, width }) {
  const inputRange = data.map((_, index) => index * width);
  const outputWidthRange = measures.map((measure) => measure.width);
  const outputTranslateRange = measures.map((measure) => measure.x);

  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: outputWidthRange,
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: outputTranslateRange,
  });

  return (
    <Animated.View
      style={[
        styles.indicator,
        {
          width: indicatorWidth,
          transform: [{ translateX }],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: "absolute",
    left: 0,
    bottom: -10,
    height: 4,
    borderRadius: 1,
    backgroundColor: "white",
  },
});
