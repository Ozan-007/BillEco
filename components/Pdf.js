import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { htmlStyles } from "./Pdf-css";

export default function Pdf() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [apt, setApt] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
			  <p>${name}</p>
			  <p>${street}<br>${country} , ${city}, ${province}, ${postCode}</p>
			  <p>${phoneNumber}</p>
		  </address>
		 
	  </header>
	  <article>
		  <h1>Recipient</h1>
		  <address contenteditable>
			  <p>${name}</p>
		  </address>
		  <table class="meta">
			  <tr>
				  <th><span contenteditable>Invoice #</span></th>
				  <td><span contenteditable>101138</span></td>
			  </tr>
			  <tr>
				  <th><span contenteditable>Date</span></th>
				  <td><span contenteditable>January 1, 2012</span></td>
			  </tr>
			  <tr>
				  <th><span contenteditable>Amount Due</span></th>
				  <td><span id="prefix" contenteditable>$</span><span></span></td>
			  </tr>
		  </table>
		  <table class="inventory">
			  <thead>
				  <tr>
					  <th><span contenteditable>Item</span></th>
					  <th><span contenteditable>Description</span></th>
					  <th><span contenteditable>Rate</span></th>
					  <th><span contenteditable>Quantity</span></th>
					  <th><span contenteditable>Price</span></th>
				  </tr>
			  </thead>
			  <tbody>
				  <tr>
					  <td><a class="cut">-</a><span contenteditable>Front End Consultation</span></td>
					  <td><span contenteditable>Experience Review</span></td>
					  <td><span data-prefix>$</span><span contenteditable>150.00</span></td>
					  <td><span contenteditable>4</span></td>
					  <td><span data-prefix>$</span><span></span></td>
				  </tr>
			  </tbody>
		  </table>
		  <a class="add">+</a>
		  <table class="balance">
			  <tr>
				  <th><span contenteditable>Total</span></th>
				  <td><span data-prefix>$</span><span></span></td>
			  </tr>
			  <tr>
				  <th><span contenteditable>Amount Paid</span></th>
				  <td><span data-prefix>$</span><span contenteditable>0.00</span></td>
			  </tr>
			  <tr>
				  <th><span contenteditable>Balance Due</span></th>
				  <td><span data-prefix>$</span><span></span></td>
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
      <Text>Company Name:</Text>
      <TextInput
        placeholder="Company Name"
        style={styles.input}
        onChangeText={(value) => setName(value)}
      />

      <Text>Country:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setCountry(value)}
      />
      <Text>Street:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setStreet(value)}
      />
      <Text>Apt, Suite:</Text>
      <TextInput style={styles.input} onChangeText={(value) => setApt(value)} />
      <Text>Postal Code:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setPostCode(value)}
      />
      <Text>City:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setCity(value)}
      />
      <Text>Province/State:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setProvince(value)}
      />
      <Text>Phone Number:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setPhoneNumber(value)}
      />

      <Button title="Generate PDF" onPress={generatePdf} />
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
});

