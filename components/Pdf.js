import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { htmlStyles } from "./Pdfcss";

export default function Pdf() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const html = `<html>
  
  <head>
	  <meta charset="utf-8">
	  <title>Invoice</title>
	  
	  <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
	  <style>
              ${htmlStyles}
            </style>
	 
  </head>
  <body>
	  <header>
		  <h1>Invoice</h1>
		  <address contenteditable>
			  <p>Jonathan Neal</p>
			  <p>101 E. Chapman Ave<br>Orange, CA 92866</p>
			  <p>(800) 555-1234</p>
		  </address>
		  <span><img alt="" src="http://www.jonathantneal.com/examples/invoice/logo.png"><input type="file" accept="image/*"></span>
	  </header>
	  <article>
		  <h1>Recipient</h1>
		  <address contenteditable>
			  <p>${name} Company
		  </address>
		  <table class="meta">
			  <tr>
				  <th><span contenteditable>Invoice #</span></th>
				  <td><span contenteditable>101138</span></td>
			  </tr>
			  <tr>
				  <th><span contenteditable>Date</span></th>
				  <td><span contenteditable></span></td>
			  </tr>
			  <tr>
				  <th><span contenteditable>Amount Due</span></th>
				  <td><span id="prefix" contenteditable>€</span><span></span></td>
			  </tr>
		  </table>
		  <table class="inventory">
			  <thead>
				  <tr>
					  <th><span contenteditable>Service</span></th>
					  <th><span contenteditable>Description</span></th>
					  <th><span contenteditable>Quantity</span></th>
					  <th><span contenteditable>Price</span></th>
				  </tr>
			  </thead>
			  <tbody>
				  <tr>
					  <td><a class="cut"></a><span contenteditable>${service}</span></td>
					  <td><span contenteditable>${description}</span></td>
					  <td><span contenteditable>${quantity}</span></td>
					  <td><span data-prefix>€</span><span>${price}</span></td>
				  </tr>
			  </tbody>
		  </table>
		  <table class="balance">
			  <tr>
				  <th><span contenteditable>Total</span></th>
				  <td><span data-prefix>€</span><span>${price * quantity}</span></td>
			  </tr>
			  <tr>
				  <th><span contenteditable>Amount Paid</span></th>
				  <td><span data-prefix>€</span><span contenteditable>0.00</span></td>
			  </tr>
			  <tr>
				  <th><span contenteditable>Balance Due</span></th>
				  <td><span data-prefix>€</span><span></span></td>
			  </tr>
		  </table>
	  </article>
	  <aside>
		  <h1><span contenteditable>Additional Notes</span></h1>
		  <div contenteditable>
			  <p>A finance charge of 1.5% will be made on unpaid balances after 30 days.</p>
		  </div>
	  </aside>
  </body>
  
</html>
  
  `;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  };
  return (
    <View style={styles.container}>
      <Text>Company Name</Text>
      <TextInput
        placeholder="Company Name"
        style={styles.input}
        onChangeText={(value) => setName(value)}
      />
      <Text>Service</Text>
      <TextInput
        placeholder="Service Name"
        style={styles.input}
        onChangeText={(value) => setService(value)}
      />
      <Text>Description</Text>
      <TextInput
        placeholder="Description"
        style={styles.input}
        onChangeText={(value) => setDescription(value)}
      />

      <Text>Price</Text>
      <TextInput
        placeholder="Price"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={(value) => setPrice(value)}
      />
      <Text>Quantity</Text>
      <TextInput
        placeholder="Quantity"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={(value) => setQuantity(value)}
      />

      <Button
        style={styles.buttonStyle}
        title="Generate PDF"
        onPress={generatePdf}
      />

      {/* <Text style={styles.result}>
        Service Name: {name}, Amount: {amount} {currency}
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
  },
  currency: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 100,
    justifyContent: "",
  },
});
