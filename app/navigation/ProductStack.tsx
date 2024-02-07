import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../screens/Products";

type ProductStackParamList = {
  Products: undefined;
  ProductDetails: { id: number };
};

const ProductsStack = createNativeStackNavigator<ProductStackParamList>();

const ProductStackNav = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FF385C",
        },
        headerTintColor: "#fff",
      }}
    >
      <ProductsStack.Screen
        name="Products"
        component={Products}
        options={{
          headerTitle: "Neon shop",
        }}
      />
    </ProductsStack.Navigator>
  );
};

export default ProductStackNav;
