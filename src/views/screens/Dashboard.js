import { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  TextInput,
  FlatList,
  Pressable,
  Alert,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import Loader from "../components/Loader";

import { backend_url } from "./profile";
import { socket_url } from "./profile";

import socketIoClient from "socket.io-client";

const socket = socketIoClient(socket_url, {
  autoConnect: false,
});

function Dashboard({ route, navigation }) {
  const { itemId } = route.params;
  const { phone } = route.params;

  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [address, setAddress] = useState("");
  const [showSuggestionPickup, ChangeSuggestionPickup] = useState(true);

  const [loading, setLoading] = useState(false);

  const [pickupLocationError, setPickupLocationErorr] = useState("");
  const [destinationError, setDestinationErorr] = useState("");

  const [vehicleType, setVehicleType] = useState("");

  const [showSuggestionDestination, ChangeSuggestionDestination] =
    useState(true);

  const [busBackgroundColor, setBusBackgroundColor] = useState("white");
  const [vipBackgroundColor, setVipBackgroundColor] = useState("white");

  const [busColor, setBusColor] = useState("black");
  const [vipColor, setVipColor] = useState("black");

  useEffect(() => {
    socket.on("message", (msg) => {
      console.log(msg);
    });

    socket.connect();
  }, []);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!pickupLocation) {
      setPickupLocationErorr("Please input pickup location");

      isValid = false;
    } else if (!destination) {
      setDestinationErorr("Please input destination");
      isValid = false;
    }

    if (isValid) {
      OrderButtonHandler();
    }
  };

  const OrderButtonHandler = () => {
    // setVehicleType(vehicleType + ", " + pickupLocation + ", " + destination);

    const bodys = {
      pickupLocation: pickupLocation,
      destination: destination,
      vehicleType: vehicleType,
      phoneNumber: phone,
    };

    let headers = new Headers();
    let rs = "";
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Basic ");
    setLoading(true);

    fetch(`${backend_url}/api/rides`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(bodys),
    })
      .then((res) => res.json())
      .then((res) => socket.emit("passengerBooked", res.history))
      .catch((err) => console.log(err));
    console.log(rs);
    setTimeout(() => {
      try {
        setLoading(false);

        navigation.navigate("HomeScreen", {
          itemId: 86,
          phoneNumber: phone,
          pickupLocation: pickupLocation,
          destination: destination,
        });
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }, 3000);
  };

  const clearPickupLocation = () => {
    setPickupLocation("");
  };
  const clearDestination = () => {
    setDestination("");
  };

  const changeVehicleType = (type) => {
    setVehicleType(type);
    if (type === "bus") {
      setBusBackgroundColor("#111");
      setVipBackgroundColor("transparent");

      setVipColor("black");
      setBusColor("white");
    } else if (type === "vip") {
      setBusBackgroundColor("transparent");
      setVipBackgroundColor("#222");

      setVipColor("white");
      setBusColor("black");
    }
  };
  const getItemText = (item) => {
    let mainText = item.address.name;
    let place_name = item.display_place;
    let state_name = item.state;
    let country_name = item.country;
    if (item.type === "city" && item.address.state)
      mainText += ", " + item.address.state;
    let newText =
      item.address.name +
      ", " +
      item.address.state +
      ", " +
      item.address.country;
    return (
      <View style={styles.itemTextConatiner}>
        <MaterialIcons
          name={item.type === "city" ? "location-city" : "location-on"}
          color={"black"}
          size={30}
        />
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            {item.address.name}, {item.address.state}, {item.address.country}
          </Text>
        </View>
      </View>
    );
  };

  const getItemTextDestination = (item) => {
    let mainText = item.address.name;
    let place_name = item.display_place;
    let state_name = item.state;
    let country_name = item.country;
    if (item.type === "city" && item.address.state)
      mainText += ", " + item.address.state;
    let newText =
      item.address.name +
      ", " +
      item.address.state +
      ", " +
      item.address.country;
    return (
      <View style={styles.itemTextConatiner}>
        <MaterialIcons
          name={item.type === "city" ? "location-city" : "location-on"}
          color={"black"}
          size={30}
        />
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            {item.address.name}, {item.address.state}, {item.address.country}
          </Text>
        </View>
      </View>
    );
  };

  const onChangeText = async (text) => {
    ChangeSuggestionPickup(true);
    setPickupLocation(text);
    if (text.length === 0) return setData([]);
    if (text.length > 2) {
      const res = await fetch(
        `https://api.locationiq.com/v1/autocomplete.php?key=pk.289ae4bca17e0652428d2f37c71b1d10&q=${text}`
      );

      // const res = await fetch(endpoint);
      if (res) {
        const data = await res.json();
        if (data.length > 0) setData(data);
      }
    }
  };

  const onChangeTextDestination = async (text) => {
    ChangeSuggestionDestination(true);
    setDestination(text);
    if (text.length === 0) return setData2([]);
    if (text.length > 2) {
      const res = await fetch(
        `https://api.locationiq.com/v1/autocomplete.php?key=pk.289ae4bca17e0652428d2f37c71b1d10&q=${text}`
      );

      // const res = await fetch(endpoint);
      if (res) {
        const data = await res.json();
        if (data.length > 0) setData2(data);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View>
            <Image
              source={require("../../../assets/taxi/grad2.jpg")}
              style={{
                width: 320,
                height: 200,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
              }}
            />
            <View
              style={{
                position: "absolute",
                color: "white",
                left: 30,
                top: 40,
              }}
            >
              <Text style={{ color: "#eab402", fontSize: 20 }}>Order</Text>
              <Text style={{ color: "white", fontSize: 25 }}>Where do you</Text>
              <Text style={{ color: "white", fontSize: 25 }}>want to go?</Text>
              <Text style={{ color: "white", fontSize: 12 }}>
                Please enter your initial location
              </Text>
              <Text style={{ color: "white", fontSize: 12 }}>
                and destination.
              </Text>
            </View>
          </View>
          {/* <Text style={{ fontSize: 20 }}>Passengers Booking Page</Text> */}
          {/* <Text>{vehicleType}</Text> */}
        </View>
        <View
          style={{
            padding: 20,
            borderStyle: "solid",
            marginTop: -10,
          }}
        >
          <Text style={styles.inputLabel}>Where to?</Text>
          <TextInput
            placeholder="Pickup Location"
            value={pickupLocation}
            onChangeText={onChangeText}
            style={styles.input}
            error={pickupLocationError}
          />
          <Text onPress={clearPickupLocation} style={styles.clear}>
            X
          </Text>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                onPress={() => {
                  // alert("navigate passing" + JSON.stringify(item));
                  setPickupLocation(
                    item.address.name +
                      ", " +
                      item.address.state +
                      ", " +
                      item.address.country
                  );
                  ChangeSuggestionPickup(false);
                }}
              >
                {showSuggestionPickup && getItemText(item)}
              </Pressable>
            )}
            keyExtractor={(item, index) => item.osm_id + index}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={{ marginTop: -20, padding: 20 }}>
          {/* <Text style={styles.inputLabelDestination}>Destination</Text> */}
          <TextInput
            placeholder="Destination"
            value={destination}
            onChangeText={onChangeTextDestination}
            style={styles.input}
            error={destinationError}
          />
          <Text onPress={clearDestination} style={styles.clearDestination}>
            X
          </Text>
          <FlatList
            data={data2}
            renderItem={({ item, index }) => (
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                onPress={() => {
                  // alert("navigate passing" + JSON.stringify(item));
                  setDestination(
                    item.address.name +
                      ", " +
                      item.address.state +
                      ", " +
                      item.address.country
                  );
                  ChangeSuggestionDestination(false);
                }}
              >
                {showSuggestionDestination && getItemTextDestination(item)}
              </Pressable>
            )}
            keyExtractor={(item, index) => item.osm_id + index}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View
          style={{
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            marginTop: -10,
            flexDirection: "column",
          }}
        >
          <Text style={{ fontSize: 14, marginLeft: 20, color: "#333" }}>
            Vehicle Type
          </Text>
          <View
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                marginTop: 20,
                marginRight: 40,
                marginLeft: 60,
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                paddingLeft: 18,
                paddingRight: 18,
                color: vipColor,
                backgroundColor: vipBackgroundColor,
              }}
            >
              <Icon
                name="taxi"
                size={20}
                style={{ color: vipColor }}
                onPress={() => changeVehicleType("vip")}
              />
              <Text
                style={{ color: vipColor, marginLeft: 4 }}
                onPress={() => changeVehicleType("vip")}
              >
                VIP
              </Text>
            </View>
            <View
              style={{
                marginTop: 20,
                marginRight: 70,
                borderRadius: 5,
                borderColor: "#ccc",
                borderWidth: 1,
                padding: 5,
                paddingTop: 10,
                paddingBottom: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: busBackgroundColor,
              }}
            >
              <Icon
                name="bus"
                size={20}
                color="#333"
                style={{ marginLeft: 20, color: busColor }}
                onPress={() => changeVehicleType("bus")}
              />
              <Text
                onPress={() => changeVehicleType("bus")}
                style={{
                  color: busColor,
                }}
              >
                Mini Bus
              </Text>
            </View>
          </View>
        </View>
        <Button title="Order" style={{ width: 10 }} onPress={validate} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 20 },
  inputLabel: {
    color: "#333",
    borderRadius: 10,
    marginBottom: 10,
  },
  inputLabelDestination: { marginLeft: 12, fontSize: 12 },

  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#f3f1f1",
  },
  clear: {
    position: "absolute",
    top: 55,
    right: 25,
    color: "#333",
    padding: 7,
    opacity: 0.5,
  },
  clearDestination: {
    position: "absolute",
    top: 25,
    right: 25,
    color: "#333",
    padding: 7,
    opacity: 0.5,
  },

  itemTextConatiner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  textContainer: { marginLeft: 10, flexShrink: 1 },
  mainText: { fontWeight: "700" },
  country: { fontSize: "12px" },
});

export default Dashboard;
