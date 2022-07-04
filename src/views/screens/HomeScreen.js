import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Button from "../components/Button";
import Loader from "../components/Loader";
import * as Progress from "react-native-progress";
import { io } from "socket.io-client";
// import SocketIOClient from "socket.io-client/dist/socket.io.js";

import socketIoClient from "socket.io-client";

import { backend_url } from "./profile";
import { socket_url } from "./profile";

const socket = socketIoClient(socket_url, {
  autoConnect: false,
});

const HomeScree = ({ route, navigation }) => {
  const { itemId } = route.params;
  const { phoneNumber } = route.params;
  const { pickupLocation } = route.params;
  const { destination } = route.params;

  const [userDetails, setUserDetails] = useState("");
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    socket.on("latest", (data) => {
      // expect server to send us the latest messages
      console.log(data);
    });
    socket.on("message", (msg) => {
      console.log(msg);
    });
    socket.on("passengersNotification", (data) => {
      if (
        data[1].pickupLocation === pickupLocation &&
        data[1].destination === destination
      ) {
        navigation.navigate("DispatchScreen", {
          itemId: 86,
          phone: phoneNumber,
          data: data,
        });
      }
    });

    socket.connect();
  }, []);

  const getUserData = async () => {
    setUserDetails("This is the detail page");
  };

  const logout = () => {
    // navigation.navigate("LoginScreen");
    const bodys = {
      phoneNumber: phoneNumber,
    };

    let headers = new Headers();
    let response;

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Basic ");
    setLoading(true);

    fetch(`${backend_url}/api/rides`, {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify(bodys),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    // console.log(response);
    setTimeout(() => {
      try {
        setLoading(false);
        navigation.navigate("Dashboard", {
          itemId: 86,
          phone: phoneNumber,
        });
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }, 3000);
    console.log("Cancelled Ride");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 100,
        // justifyContent: "center",
        paddingHorizontal: 40,
      }}
    >
      <Loader visible={loading} />
      <View></View>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Ride Booked!</Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Waiting for Dispatch
      </Text>
      <View style={{ marginTop: 50, marginBottom: 40 }}>
        {/* <Progress.Pie progress={0.4} size={50} /> */}
        <Progress.Circle
          borderWidth={4}
          color="green"
          size={70}
          indeterminate={true}
        />
        {/* <Progress.CircleSnail color={["red", "green", "blue"]} /> */}
      </View>
      <Button title="Cancel Ride" onPress={logout} />
    </View>
  );
};

export default HomeScree;
