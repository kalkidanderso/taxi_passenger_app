import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import image from "../../../assets/img/newTaxi.jpg";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Colors } from "react-native/Libraries/NewAppScreen";

// import axios from "axios";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";

import { backend_url } from "./profile";
import { socket_url } from "./profile";

var formData = new FormData();
import socketIoClient from "socket.io-client";

const socket = socketIoClient(socket_url, {
  autoConnect: true,
});

const RegistrationScreen = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef();
  const [inputs, setInputs] = React.useState({
    phone: "",
  });

  const [errors, setErrors] = useState(true);

  const [phoneError, setPhoneError] = useState(false);
  const [formatError, setFormatEror] = useState(false);

  const [loading, setLoading] = React.useState(false);

  let ps = [];

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
      handlePhoneError();
      isValid = false;
    } else if (inputs.phone.length !== 9 || !inputs.phone.startsWith("9")) {
      handleFormatError();
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const handlePhoneError = () => {
    setPhoneError(true);
    setTimeout(() => {
      setPhoneError(false);
    }, 3000);
  };
  const handleFormatError = () => {
    setFormatEror(true);
    setTimeout(() => {
      setFormatEror(false);
    }, 3000);
  };
  useEffect(() => {
    socket.on("latest", (data) => {
      // expect server to send us the latest messages
      console.log(data);
    });
    socket.on("message", (msg) => {
      console.log(msg);
    });
    socket.on("passenger", (msg) => {
      console.log(msg);
    });

    socket.connect();
  }, []);

  const register = () => {
    let phoneNumber = 0 + inputs.phone;
    const bodys = {
      phoneNumber: phoneNumber,
    };

    let headers = new Headers();
    let response;

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Basic ");
    setLoading(true);

    fetch(`${backend_url}/api/passengers`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(bodys),
    })
      .then((res) => res.json())
      .then((res) => {
        response = res.message;
      })
      .catch((err) => console.log(err));
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    navigation.navigate("Dashboard", {
      itemId: 86,
      phone: phoneNumber,
    });
  };
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <View
            style={{
              width: 160,
              height: 160,
              marginTop: 10,
            }}
          >
            <Image
              source={require("../../../assets/img/newTaxi.jpg")}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <View style={styles.welcome}>
            <Text style={{ marginLeft: 50, fontSize: 30 }}>Welcome!</Text>
            <Text style={{ fontSize: 16, color: "#777" }}>
              Taxi Dispatcher Passengers App
            </Text>
            <Text
              style={{
                color: "#ccc",
                margin: 10,
                // fontWeight: 200,
                fontSize: 12,
                marginLeft: 65,
              }}
            >
              Please register to{" "}
            </Text>
            <Text style={{ marginLeft: 65, fontSize: 20 }}>Get started</Text>
          </View>
          <PhoneInput
            defaultCode="ET"
            layout="first"
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "phone")}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="987645..."
            error={errors.phone}
            countryPickerProps={{ withAlphaFilter: true }}
            withShadow
            autoFocus
          />
          {phoneError && (
            <Text style={{ color: "red" }}>Input phone Number</Text>
          )}
          {formatError && (
            <Text style={{ color: "red" }}>Input correct phone Number</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={validate}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    marginTop: 20,
    height: 50,
    width: 260,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAB402",
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 14,
    width: 100,
    marginLeft: 40,
  },

  welcome: {
    padding: 20,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },

  status: {
    padding: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    color: "gray",
  },
});

export default RegistrationScreen;
