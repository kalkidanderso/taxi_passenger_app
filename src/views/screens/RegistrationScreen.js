import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
// import axios from "axios";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";

var formData = new FormData();

const RegistrationScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    phone: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [passengers, setPassengers] = useState([
    { phoneNumber: "0912121212" },
    { phoneNumber: "0989898989" },
  ]);
  let ps = [];

  // fetch("http://192.168.8.106:3000/api/passengers")
  //   .then((res) => res.json())
  //   .then((res) => {
  //     setPassengers(res.passenger);
  //     res.passenger.map((pass) => {
  //       ps.push(pass);
  //     });
  //   });
  // if (ps.length !== 0) {
  // setPassengers(passengers);
  // }

  const getData = (phoneNumber) => {
    let condition = false;
    passengers.map((ps) => {
      if (ps.phoneNumber === phoneNumber) {
        condition = true;
      }
    });
    return condition;
  };
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      isValid = false;
    } else if (inputs.phone.length !== 10 || !inputs.phone.startsWith("09")) {
      handleError("Please input the correct phone number", "phone");
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    const bodys = {
      phoneNumber: inputs.phone,
    };

    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Basic ");

    fetch("http://192.168.43.95:3000/api/passengers", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(bodys),
    })
      .then((res) => {
        res.json();
      })
      .catch((err) => console.log(err));
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        navigation.navigate("Dashboard");
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }, 3000);
  };
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
          marginTop: 150,
          marginLeft: 30,
        }}
      >
        <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
          Taxi Dispatcher Passenger's App
        </Text>
        {/* <LocalTaxiIcon /> */}
        {/* <Image source={require("../../../assets/taxi/taxi.png")} /> */}
        <View style={{ marginVertical: 20 }}>
          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "phone")}
            onFocus={() => handleError(null, "phone")}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="0987645..."
            error={errors.phone}
          />

          <Button title="Get Started" onPress={validate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

// import { Map, useLeaflet } from "react-leaflet";
// import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
// import { SafeAreaView } from "react-native-web";
// import { MapContainer } from "react-leaflet";
// import { TileLayer } from "react-leaflet";
// import { Marker } from "react-leaflet";

// // make new leaflet element
// const Search = (props) => {
//   const { map } = useLeaflet(); // access to leaflet map
//   const { provider } = props;

//   useEffect(() => {
//     const searchControl = new GeoSearchControl({
//       provider,
//     });

//     map.addControl(searchControl); // this is how you add a control in vanilla leaflet
//     return () => map.removeControl(searchControl);
//   }, [props]);

//   return null; // don't want anything to show up from this comp
// };

// export default function Dashboard() {
//   const position = [51.505, -0.09];

//   return (
//     <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={position}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// }

// import { Map, useLeaflet } from "react-leaflet";
// import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
// import { SafeAreaView } from "react-native-web";
// import { MapContainer } from "react-leaflet";
// import { TileLayer } from "react-leaflet";
// import { Marker } from "react-leaflet/";

// import { useEffect, useState } from "react";
// import {
//   Text,
//   View,
//   SafeAreaView,
//   StyleSheet,
//   TouchableWithoutFeedback,
//   Keyboard,
//   TextInput,
//   FlatList,
//   Pressable,
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import Button from "../components/Button";

// export default function Dashboard() {
//   const [pickupLocation, setPickupLocation] = useState("");
//   const [destintaion, setDestination] = useState("");
//   const [data, setData] = useState();
//   const [data2, setData2] = useState();
//   const [address, setAddress] = useState("");
//   const [showSuggestionPickup, ChangeSuggestionPickup] = useState(true);

//   const clearPickupLocation = () => {
//     setPickupLocation("");
//   };

//   const getItemText = (item) => {
//     let mainText = item.address.name;
//     let place_name = item.display_place;
//     let state_name = item.state;
//     let country_name = item.country;
//     if (item.type === "city" && item.address.state)
//       mainText += ", " + item.address.state;
//     let newText =
//       item.address.name +
//       ", " +
//       item.address.state +
//       ", " +
//       item.address.country;
//     return (
//       <View style={styles.itemTextConatiner}>
//         <MaterialIcons
//           name={item.type === "city" ? "location-city" : "location-on"}
//           color={"black"}
//           size={30}
//         />
//         <View style={styles.textContainer}>
//           <Text style={styles.mainText}>
//             {item.address.name}, {item.address.state}, {item.address.country}
//           </Text>
//         </View>
//       </View>
//     );
//   };

//   const onChangeText = async (text) => {
//     ChangeSuggestion(true);
//     setPickupLocation(text);
//     if (text.length === 0) return setData([]);
//     if (text.length > 2) {
//       const res = await fetch(
//         `https://api.locationiq.com/v1/autocomplete.php?key=pk.289ae4bca17e0652428d2f37c71b1d10&q=${text}`
//       );

//       // const res = await fetch(endpoint);
//       if (res) {
//         const data = await res.json();
//         if (data.length > 0) setData(data);
//       }
//     }
//   };

//   return (
//     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.inputLabel}>Pickup Location</Text>
//         <TextInput
//           placeholder="Pickup Location"
//           value={pickupLocation}
//           onChangeText={onChangeText}
//           style={styles.input}
//         />
//         <Text onPress={clearPickupLocation} style={styles.clear}>
//           X
//         </Text>
//         <FlatList
//           data={data}
//           renderItem={({ item, index }) => (
//             <Pressable
//               style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
//               onPress={() => {
//                 alert("navigate passing" + JSON.stringify(item));
//                 setPickupLocation(
//                   item.address.name +
//                     ", " +
//                     item.address.state +
//                     ", " +
//                     item.address.country
//                 );
//                 ChangeSuggestion(false);
//               }}
//             >
//               {showSuggestion && getItemText(item)}
//             </Pressable>
//           )}
//           keyExtractor={(item, index) => item.osm_id + index}
//           showsVerticalScrollIndicator={false}
//         />
//         {/* ////////////////////////////////////////////////////////// */}
//         <Text style={styles.inputLabel}>Destination</Text>
//         <TextInput
//           placeholder="Destination"
//           value={destination}
//           onChangeText={onChangeText}
//           style={styles.input}
//         />
//         <Text onPress={clearPickupLocation} style={styles.clear}>
//           X
//         </Text>
//         <FlatList
//           data={data}
//           renderItem={({ item, index }) => (
//             <Pressable
//               style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
//               onPress={() => {
//                 alert("navigate passing" + JSON.stringify(item));
//                 setPickupLocation(
//                   item.address.name +
//                     ", " +
//                     item.address.state +
//                     ", " +
//                     item.address.country
//                 );
//                 ChangeSuggestion(false);
//               }}
//             >
//               {showSuggestion && getItemText(item)}
//             </Pressable>
//           )}
//           keyExtractor={(item, index) => item.osm_id + index}
//           showsVerticalScrollIndicator={false}
//         />
//       </SafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, marginTop: 40 },
//   inputLabel: { marginLeft: 12, marginVertical: 5, fontSize: 12 },
//   input: {
//     height: 40,
//     marginHorizontal: 12,
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   clear: {
//     position: "absolute",
//     top: 30,
//     right: 20,
//     backgroundColor: "black",
//     color: "white",
//     padding: 7,
//   },

//   itemTextConatiner: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//   },
//   textContainer: { marginLeft: 10, flexShrink: 1 },
//   mainText: { fontWeight: "700" },
//   country: { fontSize: 12 },
// });
