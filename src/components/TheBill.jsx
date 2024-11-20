import React from "react";
import { Page, Text, View, Document, PDFViewer } from "@react-pdf/renderer";
import { useLocation, useNavigate } from "react-router-dom";

const TheBill = () => {
  const location = useLocation();
  console.log(location);
  
  const billData = location.state?.billData;
  console.log(billData);

  return (
    <PDFViewer style={{ height: "100vh", width: "100%" }}>
      <Document>
        <Page size="A4">
          <View>
            <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 10, color: 'blue' }}>
              Invoice to: {billData.customerName}
            </Text>
          </View>

          <View>
            <Text style={{fontWeight: 'bold', color: 'blue' }}>     Customer Details</Text>
            <Text>          Customer Name:           {billData.customerName}</Text>
            <Text>          Mobile Number:            {billData.mobileNumber}</Text>
            <Text>          Address:                       {billData.address}</Text>
            <Text>          Billing Date:                  {billData.billingDate}</Text>
          </View>

          <View>
            <Text style={{ marginTop: 20, fontWeight: 'bold', color: 'blue' }}>     Products:</Text>
            {billData.products.map((product) => (
              <View key={product.index}>
                <Text>          Product Name:              {product.productName}</Text>
                <Text>          Quantity:                       {product.productQuantity}</Text>
                <Text>          Price:                      Rs. {product.productPrice}</Text>
                <Text style={{marginBottom: '8'}}>          Total:                       Rs. {product.totalPrice}</Text>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 20}}>
            <Text style={{ fontWeight: 'bold', color: 'blue' }}>     Final</Text>
            <Text>          Total Products:             {billData.totalProducts}</Text>
            <Text>          Grand Total:           Rs.  {billData.grandTotal}</Text>
            <Text>          Adjustment:           Rs.  {billData.adjustment}</Text>
          </View>
          <Text style={{marginTop: '10', textAlign: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'blue', fontSize: '30'}}>Total Amount To Pay: Rs. {billData.grandTotal}</Text>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default TheBill;