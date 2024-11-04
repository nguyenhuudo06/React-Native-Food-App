import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import React from "react";
import Carousel from "pinar";
import Spacing from "@/constants/Spacing";

const images = [
  {
    name: "image 1",
    url: "https://www.abilities.ca/wp-content/uploads/2022/04/Food.jpg",
  },
  {
    name: "image 2",
    url: "https://images.ctfassets.net/mmptj4yas0t3/7hy6BRZTRBpGIDLNe82Sq8/4f0e5ccb2eb84e2d9a4f29b081a2dd5e/cc-health-trends.jpg?w=750&h=423&fl=progressive&q=50&fm=jpg",
  },
  {
    name: "image 3",
    url: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?resize=768,574",
  },
];

const height = Dimensions.get("window").height;

const ProductDetails = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.carouselContainer}>
          <Carousel
            style={styles.carousel}
            showsControls={false}
            dotStyle={styles.dotStyle}
            activeDotStyle={[styles.dotStyle, styles.activeDotStyle]}
          >
            {images.map((img) => (
              <Image
                style={styles.image}
                source={{ uri: img.url }}
                key={img.name}
              />
            ))}
          </Carousel>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  scrollView: {
    flexGrow: 1,
  },
  carousel: {
    width: "100%",
    height: "100%",
  },
  carouselContainer: {
    height: (height - 20) / 2,
    marginHorizontal: Spacing,
    marginTop: Spacing,
    borderRadius: 20,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  dotStyle: {
    width: 30,
    height: 3,
    backgroundColor: "silver",
    marginHorizontal: 3,
    borderRadius: 3,
  },
  activeDotStyle: {
    backgroundColor: "white"
  }
});
