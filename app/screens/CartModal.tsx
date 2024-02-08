import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import useCartStore from "../state/cartStore";
import { Order, createOrder } from "../api/api";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../navigation/ProductStack";
import { Ionicons } from "@expo/vector-icons";
import ConfettiCannon from "react-native-confetti-cannon";

const CartModal = () => {
  const { products, total, reduceProduct, addProduct, clearCart } =
    useCartStore((state) => ({
      products: state.products,
      total: state.total,
      reduceProduct: state.reduceProduct,
      addProduct: state.addProduct,
      clearCart: state.clearCart,
    }));

  const onSubmitOrder = async () => {
    console.log("products=>", products);
    console.log("email=>", customer_email);

    setSubmitting(true);
    Keyboard.dismiss();
    try {
      const response = await createOrder({
        customer_email,
        products: products.map((p) => ({
          product_id: p.id,
          quantity: p.quantity,
        })),
      });
      setOrder(response);
      clearCart();
    } catch (error) {
      console.log("error", error);
    } finally {
      setSubmitting(false);
    }
  };

  const [customer_email, setEmail] = useState<string>("e@gmail.com");
  const [order, setOrder] = useState<Order | null>(null);
  const navigation = useNavigation<StackNavigation>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.cartTitle}>Liste de vos produits</Text>
      {products?.length === 0 && (
        <Text style={{ textAlign: "center" }}>Votre panier est vide</Text>
      )}
      {order && (
        <ConfettiCannon
          count={500}
          origin={{ x: -10, y: 0 }}
          fallSpeed={1500}
          fadeOut={false}
          autoStart={true}
        />
      )}
      {order && (
        <View
          style={{
            marginTop: "50%",
            padding: 20,
            backgroundColor: "#000",
            borderRadius: 8,
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 26 }}>
            Commande soumis avec succès
          </Text>
          <Text style={{ color: "#fff", fontSize: 16, margin: 20 }}>
            Commande ID: {order.id}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: "#1FE687", padding: 10, borderRadius: 8 }}
          >
            <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>
              Continuer d'acheté
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {!order && (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform?.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={220}
        >
          <FlatList
            data={products}
            keyExtractor={(item) => item?.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItemContainer}>
                <Image
                  style={styles.cartItemImage}
                  source={{ uri: item?.product_image }}
                />
                <View style={styles.itemContainer}>
                  <Text style={styles.cartItemName}>{item?.product_name}</Text>
                  <Text>Price: ${item?.product_price}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => reduceProduct(item)}
                    style={{ padding: 10 }}
                  >
                    <Ionicons name="remove" size={20} color={"#000"} />
                  </TouchableOpacity>

                  <Text style={styles.cartItemQuantity}>{item?.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => addProduct(item)}
                    style={{ padding: 10 }}
                  >
                    <Ionicons name="add" size={20} color={"#000"} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>

          <TextInput
            style={styles.emailInput}
            placeholder="Entrez votre email"
            onChangeText={setEmail}
          />
          <TouchableOpacity
            style={[
              styles.submitButton,
              customer_email === "" ? styles.inactive : null,
            ]}
            onPress={onSubmitOrder}
            disabled={customer_email === "" || submitting}
          >
            <Text style={styles.submitButtonText}>
              {submitting
                ? "Soumission de la commande en cours..."
                : "Soumettre ma commande"}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FF385C",
  },
  cartItemContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItemImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 8,
    marginBottom: 10,
  },
  itemContainer: {
    flex: 1,
  },
  cartItemQuantity: {
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "#FF385C",
    padding: 5,
    width: 30,
    color: "#fff",
    textAlign: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
  emailInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  inactive: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: "#FF385C",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartModal;
