import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

const TabBar = ({ state, descriptors, navigation }) => {
  const primaryColor = "#F76D02";
  const grayColor = "#F76D025A";
  const focusBg = "#F76D021A";

  const icons = {
    home: (props) => (
      <>
        <Entypo name="home" size={24} color={grayColor} {...props} />
      </>
    ),
    profile: (props) => (
      <FontAwesome name="user" size={24} color={grayColor} {...props} />
    ),
    cart: (props) => (
      <Entypo name="shopping-cart" size={24} color={grayColor} {...props} />
    ),
    message: (props) => (
      <MaterialIcons name="message" size={24} color={grayColor} {...props} />
    ),
  };

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            style={{
              ...styles.tabbarItem,
              backgroundColor: isFocused ? focusBg : "transparent",
            }}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {icons[route.name]({
              color: isFocused ? primaryColor : grayColor,
            })}
            {/* <Text
              style={{
                color: isFocused ? primaryColor : grayColor,
                fontSize: 11,
              }}
            >
              {label}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 8,
    overflow: "hidden",
    borderRadius: 22,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    gap: 4,
    width: "100%",
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
    gap: 4,
    backgroundColor: "blue",
    padding: 9,
    borderRadius: 12,
  },
});

export default TabBar;
