import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import React from "react";
import Spacing from "@/constants/Spacing";
import Colors from "@/constants/Colors";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import FontSize from "@/constants/FontSize";
import { formatCurrency } from "@/utils/currency";

const { width } = Dimensions.get("window");

const colWidths = {
  1: "100%",
  2: "50%",
  3: "33.33%",
  4: "25%",
};

const useColumnSize = () => {
  const { width } = Dimensions.get("window");

  if (width <= 360) {
    return 1;
  } else if (width <= 768) {
    return 2;
  } else {
    return 4;
  }
};

const CustomLayoutContainer = ({ children, style }) => {
  return (
    <View style={[styles["custom-layout-container"], style]}>{children}</View>
  );
};

const CustomLayoutRow = ({ children, style }) => {
  return <View style={[styles["custom-layout-row"], style]}>{children}</View>;
};

const CustomLayoutCol = ({ children, size, style }) => {
  return (
    <View
      style={[
        styles["custom-layout-col"],
        {
          flexBasis: colWidths[size] || colWidths[1],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const Cart = () => {
  const columnSize = useColumnSize();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ padding: Spacing }}>
          <CustomLayoutContainer>
            <CustomLayoutRow style={{ marginBottom: Spacing }}>
              {[...Array(12)].map((_, idx) => (
                <CustomLayoutCol key={idx} size={columnSize}>
                  <TouchableOpacity style={styles.item}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: Spacing * 0.4,
                        marginBottom: Spacing * 0.8,
                      }}
                    >
                      <Entypo
                        name="star"
                        size={FontSize.medium}
                        color="orange"
                      />
                      <Text
                        style={{
                          fontSize: FontSize.xsmall,
                          lineHeight: FontSize.xsmall * 1.2,
                          fontFamily: "outfit-bold",
                        }}
                      >
                        3.8
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        overflow: "hidden",
                        borderRadius: Spacing,
                      }}
                    >
                      <Image
                        source={require("../../assets/images/pngegg.png")}
                        resizeMode="contain"
                        style={{ width: "100%", height: 80 }}
                      />
                    </View>
                    <View style={{}}>
                      <Text
                        numberOfLines={2}
                        style={{
                          fontFamily: "outfit-medium",
                          fontSize: FontSize.medium,
                          lineHeight: FontSize.medium * 1.2,
                          minHeight: 2 * (FontSize.medium * 1.2),
                        }}
                      >
                        Chicken burger
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={{
                          fontFamily: "outfit-bold",
                          color: Colors.description,
                          opacity: 0.5,
                          fontSize: FontSize.xsmall,
                          lineHeight: FontSize.xsmall * 1.2,
                          minHeight: 2 * (FontSize.xsmall * 1.2),
                        }}
                      >
                        100 gr chicken + tomato + cheese
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            width: "100%",
                            fontFamily: "outfit-bold",
                            color: Colors.orange,
                            fontSize: FontSize.small,
                            paddingVertical: Spacing,
                          }}
                        >
                          VND {formatCurrency(100000.99)}
                        </Text>
                        <TouchableOpacity>
                          <AntDesign
                            name="pluscircle"
                            size={FontSize.xLarge}
                            color={Colors.orange}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                </CustomLayoutCol>
              ))}
            </CustomLayoutRow>
          </CustomLayoutContainer>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: "white",
  },
  "custom-layout-container": {
    width: "100%",
  },
  "custom-layout-row": {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginHorizontal: -(Spacing / 2),
  },
  "custom-layout-col": {
    paddingHorizontal: Spacing / 2,
    marginBottom: Spacing,
  },
  item: {
    paddingHorizontal: Spacing * 1.2,
    paddingVertical: Spacing * 0.8,
    borderRadius: Spacing,
    backgroundColor: Colors.white,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  text: {
    color: Colors.text,
  },
});

export default Cart;
