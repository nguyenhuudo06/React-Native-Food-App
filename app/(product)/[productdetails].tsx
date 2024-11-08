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
import { TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import Carousel from "pinar";
import Spacing from "@/constants/Spacing";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import FontSize from "@/constants/FontSize";
import { router } from "expo-router";

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
  const [selectedSize, setSelectedSize] = useState(null);
  const [additional, setAdditional] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: Spacing,
            marginVertical: Spacing * 1.4,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              padding: 10,
              borderRadius: Spacing * 0.6,
            }}
            onPress={() => router.back()}
          >
            <AntDesign
              name="arrowleft"
              size={Spacing * 2}
              color={Colors.white}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: FontSize.large,
            }}
          >
            
          </Text>
        </View>
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
        <View style={{ padding: Spacing }}>
          <View style={styles.productInfor}>
            <Text style={styles.title}>Goi tron 2</Text>

            <View style={styles.row}>
              <Text style={styles.price}>88 VNĐ</Text>
              <Text style={styles.oldPrice}>7 VNĐ</Text>
            </View>

            <Text style={styles.description}>mo ta</Text>

            <Text style={styles.sectionTitle}>Select Size</Text>
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Normal + 99 VNĐ</Text>
            </View>
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Small + 99 VNĐ</Text>
            </View>

            <Text style={styles.sectionTitle}>
              Select Additional (Optional)
            </Text>
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Them Rau Thom + 99 VNĐ</Text>
            </View>

            <Text style={styles.sectionTitle}>
              Select Quantity (Available : 14)
            </Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decreaseQuantity}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={increaseQuantity}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.totalPrice}>88 VNĐ</Text>
          </View>
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
    overflow: "hidden",
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
    backgroundColor: "white",
  },

  productInfor: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop: Spacing,
    borderRadius: 20,
  },
  title: { fontSize: 24, fontWeight: "bold" },
  row: { flexDirection: "row", alignItems: "center", marginVertical: 8 },
  price: { fontSize: 18, fontWeight: "bold", color: "black" },
  oldPrice: {
    fontSize: 16,
    color: "green",
    textDecorationLine: "line-through",
    marginLeft: 10,
  },
  description: { marginVertical: 8, color: "gray" },
  sectionTitle: { fontWeight: "bold", fontSize: 16, marginVertical: 8 },
  optionRow: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  optionText: { marginLeft: 8 },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  quantityButton: { padding: 10, backgroundColor: "#ff0000", borderRadius: 5 },
  quantityButtonText: { color: "#fff", fontWeight: "bold" },
  quantityText: { paddingHorizontal: 20, fontSize: 16 },
  totalPrice: { fontSize: 20, fontWeight: "bold", marginTop: 16 },
});
