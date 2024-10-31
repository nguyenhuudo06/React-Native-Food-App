import React from "react";
import { ScrollView, View, Text, StyleSheet, StatusBar, SafeAreaView } from "react-native";
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
        <View style={{ height: 1000 }} />
        <View style={{ height: 500 }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={(props) => <TabBar {...props} />}
          />
        </View>
        <View>
          <Text>Some content outside of tabs</Text>
        </View>
        <View style={{ height: 1000 }} />
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
    backgroundColor: "#ddd",
  },
});

export default MyTabView;
