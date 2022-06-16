// import { Map, useLeaflet } from "react-leaflet";
// import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
// import { SafeAreaView } from "react-native-web";
// import { MapContainer } from "react-leaflet";
// import { TileLayer } from "react-leaflet";
// import { Marker } from "react-leaflet/";

import { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
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
function Dashboard() {
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
      pickupLocation,
      destination,
      vehicleType,
    };

    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Basic ");

    fetch("http://192.168.43.95:3000/api/rides", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(bodys),
    });

    //   .then((res) => {
    //     res.json();
    //   })
    //   .catch((err) => console.log(err));
    // setLoading(true);
    // setTimeout(() => {
    //   try {
    //     setLoading(false);
    //     navigation.navigate("HomeScreen");
    //   } catch (error) {
    //     Alert.alert("Error", "Something went wrong");
    //   }
    // }, 3000);
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
            marginTop: 20,
          }}
        >
          {/* <Text>Passengers Booking Page</Text> */}
          <Text>{vehicleType}</Text>
        </View>
        <View>
          <Text style={styles.inputLabel}>Pickup Location</Text>
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
                  alert("navigate passing" + JSON.stringify(item));
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
        {/* ////////////////////////////////////////////////////////// */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.inputLabelDestination}>Destination</Text>
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
                  alert("navigate passing" + JSON.stringify(item));
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
            marginTop: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            flexDirection: "column",
          }}
        >
          <Text style={{ fontSize: 20 }}>Vehicle Type</Text>
          <View
            style={{
              marginTop: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                marginTop: 20,
                marginRight: 70,
                marginLeft: 60,
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: 4,
                borderRadius: 5,
                padding: 10,
                color: vipColor,
                backgroundColor: vipBackgroundColor,
              }}
            >
              <Icon
                name="taxi"
                size={30}
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
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: 4,
                borderRadius: 5,
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
                size={30}
                color="#333"
                style={{ marginLeft: 10, color: busColor }}
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
        <Button title="Order" style={{ width: 20 }} onPress={validate} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 40 },
  inputLabel: { marginLeft: 12, marginVertical: 5, fontSize: 12 },
  inputLabelDestination: { marginLeft: 12, fontSize: 12 },

  input: {
    height: 40,
    marginHorizontal: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  clear: {
    position: "absolute",
    top: 30,
    right: 20,
    backgroundColor: "black",
    color: "white",
    padding: 7,
    opacity: 0.5,
  },
  clearDestination: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "black",
    color: "white",
    padding: 7,
    opacity: 0.5,
  },

  itemTextConatiner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  textContainer: { marginLeft: 10, flexShrink: 1 },
  mainText: { fontWeight: 700 },
  country: { fontSize: 12 },
});

export default Dashboard;
