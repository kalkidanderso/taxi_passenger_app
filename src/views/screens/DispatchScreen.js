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
  autoConnect: true,
});

const DispatchScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  const { phoneNumber } = route.params;
  const { data } = route.params;

  const [userDetails, setUserDetails] = useState("");
  const [loading, setLoading] = React.useState(false);
  console.log("ooooooooooooooooooo");
  console.log(data[0]);

  useEffect(() => {
    socket.on("latest", (data) => {});
    socket.on("message", (msg) => {
      console.log(msg);
    });
    socket.on("driverPickedPassengers", () => {
      navigation.navigate("Dashboard", {
        itemId: 86,
        phone: phoneNumber,
      });
    });

    socket.connect();
  }, []);

  const getUserData = async () => {
    setUserDetails("This is the detail page");
  };

  // console.log(data);

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
      {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>Ride Booked!</Text> */}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Driver Is On His Way!
      </Text>
      <View
        style={{
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          width: "100%",
          color: "white",
          padding: 10,
          borderStyle: "solid",
          borderColor: "white",
          borderWidth: 6,
          borderRadius: 10,
          boxShadow:
            "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ fontSize: 18 }}>Driver Name: </Text>
          <Text style={{ fontSize: 20 }}>{data[0].name}</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ fontSize: 18 }}>Phone Number: </Text>
          <Text style={{ fontSize: 18 }}>{data[0].phoneNumber}</Text>
        </View>
      </View>

      <View style={{ marginTop: 50, marginBottom: 40 }}>
        {/* <Progress.Pie progress={0.4} size={50} /> */}
        <Progress.Circle
          borderWidth={10}
          color="green"
          size={80}
          indeterminate={true}
        />
        {/* <Progress.CircleSnail color={["red", "green", "blue"]} /> */}
      </View>
    </View>
  );
};

export default DispatchScreen;
