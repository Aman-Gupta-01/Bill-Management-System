import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";

const TheBill = ({ billData }) => {
  return (
    <Document>
      <Page size="A4">
        <View>
          <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 10, color: 'blue' }}>
            Invoice to: {billData.customerName}
          </Text>
        </View>

        <View>
          <Text style={{ fontWeight: 'bold', color: 'blue' }}>Customer Details</Text>
          <Text>Customer Name: {billData.customerName}</Text>
          <Text>Mobile Number: {billData.mobileNumber}</Text>
          <Text>Address: {billData.address}</Text>
          <Text>Billing Date: {billData.billingDate}</Text>
        </View>

        <View>
          <Text style={{ marginTop: 20, fontWeight: 'bold', color: 'blue' }}>Products:</Text>
          {billData.products.map((product, index) => (
            <View key={index}>
              <Text>Product Name: {product.productName}</Text>
              <Text>Quantity: {product.productQuantity}</Text>
              <Text>Price: Rs. {product.productPrice}</Text>
              <Text style={{ marginBottom: 8 }}>Total: Rs. {product.totalPrice}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold', color: 'blue' }}>Final</Text>
          <Text>Total Products: {billData.totalProducts}</Text>
          <Text>Grand Total: Rs. {billData.grandTotal}</Text>
          <Text>Adjustment: Rs. {billData.adjustment}</Text>
        </View>
        <Text style={{ marginTop: 10, textAlign: 'center', fontWeight: 'bold', color: 'blue', fontSize: 30 }}>
          Total Amount To Pay: Rs. {billData.grandTotal}
        </Text>
      </Page>
    </Document>
  );
};

export default TheBill;
