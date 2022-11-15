import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const Tab = React.forwardRef(
  ({ data, item, onItemPress, index }, ref) => {
    return (
      <TouchableOpacity onPress={() => onItemPress(index)}>
        <View ref={ref}>
          <Text
            style={{
              fontSize: 84 / data.length,
              color: "white",
            }}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);
