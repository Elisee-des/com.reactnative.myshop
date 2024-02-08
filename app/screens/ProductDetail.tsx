import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ProductsDetailPageProps } from "@/navigation/ProductStack";
import { Product, fetchProductDetail } from "../api/api";

const ProductDetail = ({ route }: ProductsDetailPageProps) => {
  const { id } = route.params;
  const [product, setproduct] = useState<Product>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductDetail(id);
        setproduct(productData);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {product && (
        <>
          <Image
            style={styles.productImage}
            source={{ uri: product.product_image }}
          />
          <Text style={styles.productName}>{product?.product_name}</Text>
          <Text style={styles.productCategory}>
            {product?.product_category}
          </Text>
          <Text style={styles.productDescription}>
            {product?.product_description}
          </Text>
          <Text style={styles.productPrice}>${product?.product_price}</Text>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 8,
  },
  productName: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  productCategory: {
    marginTop: 5,
    fontSize: 16,
    color: "#666",
  },
  productDescription: {
    marginTop: 10,
    fontSize: 16,
  },
  productPrice: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 1,
    borderColor: "#1FE687",
    borderWidth: 2,
  },
  quantity: {
    fontSize: 20,
    width: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProductDetail;
