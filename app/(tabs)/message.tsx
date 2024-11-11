import Colors from "@/constants/Colors";
import FontSize from "@/constants/FontSize";
import Spacing from "@/constants/Spacing";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Cart from "./cart";

const layout = Dimensions.get("window");

const categories = [
  { key: "first", title: "Category 1" },
  { key: "second", title: "Category 2" },
  { key: "third", title: "Category 3" },
  { key: "fourth", title: "Category 4" },
];

const FirstRoute = () => <Cart />;
const SecondRoute = () => <Cart />;
const ThirdRoute = () => <Cart />;
const FourthRoute = () => <Cart />;

export default function CategoryTabView() {
  const [index, setIndex] = useState(0);
  const [routes] = useState(categories);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

  const renderCategory = ({ item, idx }) => {
    return (
      <TouchableOpacity
        style={[styles.categoryItem, index === idx && styles.activeCategory]}
        onPress={() => setIndex(idx)}
      >
        <Text style={[styles.categoryText, index === idx && styles.activeText]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <FlatList
            horizontal
            data={categories}
            renderItem={({ item, index }) =>
              renderCategory({ item, idx: index })
            }
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />
        </View>

        <View style={{ height: layout.height * 0.9 }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={(props) => null}
            lazy
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  categoryList: {
    minHeight: layout.height * 0.05,
    paddingVertical: Spacing,
    paddingHorizontal: Spacing,
  },
  categoryItem: {
    paddingHorizontal: Spacing,
    paddingVertical: Spacing * 0.6,
    marginRight: Spacing,
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.gray,
  },
  activeCategory: {
    backgroundColor: "#FF6347",
    color: Colors.light,
  },
  categoryText: {
    fontSize: FontSize.medium,
  },
  activeText: {
    color: Colors.light,
  },
});
