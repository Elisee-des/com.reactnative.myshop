import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Products from "../screens/Products";
import ProductDetail from "../screens/ProductDetail";

type ProductStackParamList = {
  Products: undefined;
  ProductDetails: { id: number };
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

const ProductStackNav = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FF385C",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
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
    </ProductsStack.Navigator>
  );
};

export default ProductStackNav;
