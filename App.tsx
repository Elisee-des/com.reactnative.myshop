import { NavigationContainer } from "@react-navigation/native";
import ProductStackNav from "./app/navigation/ProductStack";

export default function App() {
  return (
    <NavigationContainer>
      <ProductStackNav />
    </NavigationContainer>
  );
}
