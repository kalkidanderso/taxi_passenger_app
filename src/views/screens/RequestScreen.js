import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Button from "../components/Button";

import * as Progress from "react-native-progress";
import { io } from "socket.io-client";
// import SocketIOClient from "socket.io-client/dist/socket.io.js";

import socketIoClient from "socket.io-client";

const socket = socketIoClient("http://192.168.8.103:3001", {
  autoConnect: true,
});

const RequestScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState("");
  //   useEffect(() => {
  //     socket.on("latest", (data) => {
  //       // expect server to send us the latest messages
  //       console.log(data);
  //     });
  //     socket.on("message", (msg) => {
  //       console.log(msg);
  //     });

  //     socket.connect();
  //   }, []);

  const getUserData = async () => {
    setUserDetails("This is the detail page");
  };

  const logout = () => {
    // navigation.navigate("LoginScreen");
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
      <View></View>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Ride Booked!</Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Incoming Request</Text>
      <View style={{ marginTop: 50, marginBottom: 40 }}>
        {/* <Progress.Pie progress={0.4} size={50} /> */}
        {/* <Progress.Circle
          borderWidth={4}
          color="green"
          size={70}
          indeterminate={true}
        /> */}
        <Button title="You Have Been Redirected" />
        {/* <Progress.CircleSnail color={["red", "green", "blue"]} /> */}
      </View>
      {/* <Button title="Can" onPress={logout} /> */}
    </View>
  );
};

export default RequestScreen;
