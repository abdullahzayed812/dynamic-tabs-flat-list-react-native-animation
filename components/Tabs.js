import React from "react";
import { StyleSheet, View } from "react-native";
import { Tab } from "./Tab";
import { Indicator } from "./Indicator";

export function Tabs({ data, scrollX, width, onItemPress }) {
  const [measures, setMeasures] = React.useState([]);
  const tabsRef = React.useRef();

  React.useEffect(() => {
    let m = [];
    for (let i = 0; i < data.length; i += 1) {
      data[i].ref.current.measureLayout(
        tabsRef.current,
        (x, y, width, height) => {
          m.push({ x, y, width, height });
          if (m.length === data.length) {
            setMeasures(m);
          }
        }
      );
    }
  }, []);

  return (
    <View style={styles.tabs} ref={tabsRef}>
      {data.map((item, index) => (
        <Tab
          data={data}
          item={item}
          ref={item.ref}
          key={item.key}
          onItemPress={onItemPress}
          index={index}
        />
      ))}
      {measures.length > 0 ? (
        <Indicator
          measures={measures}
          scrollX={scrollX}
          data={data}
          width={width}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    position: "absolute",
    top: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
