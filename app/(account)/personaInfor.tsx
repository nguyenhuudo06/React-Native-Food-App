import Colors from "@/constants/Colors";
import FontSize from "@/constants/FontSize";
import Spacing from "@/constants/Spacing";
import { Entypo, Feather } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const FirstRoute = () => (
  <View style={{ flex: 1, padding: 16 }}>
    <Text>This is the first tab!</Text>
  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1, padding: 16 }}>
    <Text>This is the second tab!</Text>
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const MyTabView = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Tab 1" },
    { key: "second", title: "Tab 2" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ padding: Spacing }}>
          <View>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: FontSize.large,
                marginBottom: Spacing,
              }}
            >
              Your profile
            </Text>
          </View>
          <View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "start",
                gap: Spacing * 3,
                alignItems: "center",
                padding: Spacing * 2,
                marginBottom: Spacing,
                borderRadius: Spacing,
                backgroundColor: "#faf6f3fa",
              }}
            >
              <View>
                <Entypo
                  name="shopping-cart"
                  size={Spacing * 2.4}
                  color="#FFA500"
                />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: FontSize.medium,
                    color: "#FFA500",
                  }}
                >
                  Total Order
                </Text>
                <Text
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: FontSize.medium,
                  }}
                >
                  (100)
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "start",
                gap: Spacing * 3,
                alignItems: "center",
                padding: Spacing * 2,
                marginBottom: Spacing,
                borderRadius: Spacing,
                backgroundColor: "#faf6f3fa",
              }}
            >
              <View>
                <Entypo
                  name="shopping-cart"
                  size={Spacing * 2.4}
                  color="#FFA500"
                />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: FontSize.medium,
                    color: "#FFA500",
                  }}
                >
                  Total Order
                </Text>
                <Text
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: FontSize.medium,
                  }}
                >
                  (100)
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "start",
                gap: Spacing * 3,
                alignItems: "center",
                padding: Spacing * 2,
                marginBottom: Spacing,
                borderRadius: Spacing,
                backgroundColor: "#faf6f3fa",
              }}
            >
              <View>
                <Entypo
                  name="shopping-cart"
                  size={Spacing * 2.4}
                  color="#FFA500"
                />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: FontSize.medium,
                    color: "#FFA500",
                  }}
                >
                  Total Order
                </Text>
                <Text
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: FontSize.medium,
                  }}
                >
                  (100)
                </Text>
              </View>
            </View>
          </View>
          <View style={{ padding: Spacing }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: FontSize.medium,
                    marginBottom: Spacing,
                  }}
                >
                  Personal Information
                </Text>
              </View>
              <View style={{ backgroundColor: "#66BB6A", padding: Spacing * 0.6, borderRadius: Spacing * 0.6 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    gap: Spacing,
                    alignItems: "center",
                  }}
                  onPress={() => {
                    console.log("eidt")
                  }}
                >
                  <Feather name="edit" size={Spacing * 2} color="white" />
                  <Text style={{ color: "white" }}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View></View>
          </View>
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
    backgroundColor: "#fff",
  },
});

export default MyTabView;
