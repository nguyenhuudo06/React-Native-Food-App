import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "@/constants/Colors";
import Spacing from "@/constants/Spacing";

// Dữ liệu mẫu
const provinces = [
  { code: "92", name: "Thành phố Cần Thơ" },
  { code: "48", name: "Thành phố Đà Nẵng" },
  { code: "01", name: "Thành phố Hà Nội" },
  { code: "31", name: "Thành phố Hải Phòng" },
  { code: "79", name: "Thành phố Hồ Chí Minh" },
];

const Test = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = (title) => {
    return <Text style={styles.label}>{title}</Text>;
  };

  return (
    <View style={styles.container}>
      {renderLabel("Country/State")}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={provinces}
        search
        maxHeight={300}
        labelField="name"
        valueField="code"
        placeholder={"Country/State"}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        disable={true}
      />
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#0000000A"
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    borderRadius: Spacing * 0.8
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
