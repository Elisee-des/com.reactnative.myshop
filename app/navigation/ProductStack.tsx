import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Products from "../screens/Products";
import ProductDetail from "../screens/ProductDetail";
import CartModal from "../screens/CartModal";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useCartStore from "../state/cartStore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ProductStackParamList = {
  Products: undefined;
  ProductDetails: { id: number };
  CartModal: undefined;
};

const ProductsStack = createNativeStackNavigator<ProductStackParamList>();
export type ProductsPageProps = NativeStackScreenProps<
  ProductStackParamList,
  "Products"
>;
export type ProductsDetailPageProps = NativeStackScreenProps<
  ProductStackParamList,
  "ProductDetails"
>;
export type StackNavigation = NavigationProp<ProductStackParamList>;

const ProductStackNav = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FF385C",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerRight: () => <CartButton />,
      }}
    >
      <ProductsStack.Screen
        name="Products"
        component={Products}
        options={{
          headerTitle: "Neon shop",
        }}
      />

      <ProductsStack.Screen
        name="ProductDetails"
        component={ProductDetail}
        options={{
          headerTitle: "",
        }}
      />

      <ProductsStack.Screen
        name="CartModal"
        component={CartModal}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </ProductsStack.Navigator>
  );
};

const CartButton = () => {
  const navigation = useNavigation<StackNavigation>();
  const { products } = useCartStore((state) => ({
    products: state.products,
  }));
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const count = products.reduce(
      (prev, products) => prev + products.quantity,
      0
    );
    setCount(count);
  }, [products]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate("CartModal")}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{count}</Text>
      </View>
      <Ionicons name="cart" size={28} color={"#fff"} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  countContainer: {
    position: "absolute",
    zIndex: 1,
    bottom: -5,
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ProductStackNav;
