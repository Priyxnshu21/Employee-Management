import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";

const user = () => {
  const params = useLocalSearchParams();
  const [attendanceStatus, setAttendanceStatus] = useState("Present");
  const [currentDate, setCurrentDate] = useState(moment());
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
    console.log("Going to next day:", nextDate.format('MMMM D,YYYY'));
  };

  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
    console.log("Going to previous day:", prevDate.format('MMMM D,YYYY'));
  };

  const formatDate = (date) => {
    return date.format("MMMM D,YYYY");
  };

  const submitAttendance = async () => {
    try {
      const attendanceData = {
        employeeId: params?.id,
        employeeName: params?.name,
        date: currentDate.format("MMMM D,YYYY"),
        status: attendanceStatus,
      };
      const response = await axios.post(
        "http://10.0.2.2:8000/attendance",
        attendanceData
      );

      if (response.status === 200) {
        setAlertMessage(`Attendance submitted successfully for ${params?.name}`);
        setAlertType("success");
        setShowAlert(true);
      }
    } catch (error) {
      console.log("Error submitting attendance:", error);
      if (error.response) {
        console.log("Error Response Data:", error.response.data);
        console.log("Error Response Status:", error.response.status);
        console.log("Error Response Headers:", error.response.headers);
        setAlertMessage(`Failed to submit attendance: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        console.log("Error Request:", error.request);
        setAlertMessage("Failed to submit attendance: No response from server.");
      } else {
        console.log("Error Message:", error.message);
        setAlertMessage("Failed to submit attendance: Network error or request setup issue.");
      }
      setAlertType("error");
      setShowAlert(true);
    } finally {
      setTimeout(() => {
        setShowAlert(false);
        setAlertMessage("");
      }, 3000);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.dateNavigationContainer}>
          <Pressable onPress={goToPrevDay} style={styles.navButton}>
            <AntDesign name="left" size={24} color="black" />
          </Pressable>
          <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
          <Pressable onPress={goToNextDay} style={styles.navButton}>
            <AntDesign name="right" size={24} color="black" />
          </Pressable>
        </View>

        <Pressable style={styles.employeeInfoCard}>
          <View style={styles.employeeAvatar}>
            <Text style={styles.employeeAvatarText}>
              {params?.name ? params.name.charAt(0) : ''}
            </Text>
          </View>
          <View>
            <Text style={styles.employeeNameText}>
              {params?.name}
            </Text>
            <Text style={styles.employeeDetailsText}>
              {params?.designation} ({params?.id})
            </Text>
          </View>
        </Pressable>

        <Text style={styles.basicPayText}>
          Basic Pay : {params?.salary}
        </Text>

        <View style={styles.attendanceSection}>
          <Text style={styles.attendanceHeader}>
            ATTENDANCE
          </Text>
          <View style={styles.attendanceOptionsContainer}>
            <Pressable
              onPress={() => setAttendanceStatus("Present")}
              style={[
                styles.attendanceOptionButton,
                attendanceStatus === "Present" && styles.selectedAttendanceOption,
              ]}
            >
              {attendanceStatus === "Present" ? (
                <FontAwesome5 name="dot-circle" size={24} color="black" />
              ) : (
                <Entypo name="circle" size={24} color="black" />
              )}
              <Text>Present</Text>
            </Pressable>

            <Pressable
              onPress={() => setAttendanceStatus("Absent")}
              style={[
                styles.attendanceOptionButton,
                attendanceStatus === "Absent" && styles.selectedAttendanceOption,
              ]}
            >
              {attendanceStatus === "Absent" ? (
                <FontAwesome5 name="dot-circle" size={24} color="black" />
              ) : (
                <Entypo name="circle" size={24} color="black" />
              )}
              <Text>Absent</Text>
            </Pressable>
          </View>

          <View style={styles.attendanceOptionsContainer}>
            <Pressable
              onPress={() => setAttendanceStatus("Half Day")}
              style={[
                styles.attendanceOptionButton,
                attendanceStatus === "Half Day" && styles.selectedAttendanceOption,
              ]}
            >
              {attendanceStatus === "Half Day" ? (
                <FontAwesome5 name="dot-circle" size={24} color="black" />
              ) : (
                <Entypo name="circle" size={24} color="black" />
              )}
              <Text>Half Day</Text>
            </Pressable>

            <Pressable
              onPress={() => setAttendanceStatus("Holiday")}
              style={[
                styles.attendanceOptionButton,
                attendanceStatus === "Holiday" && styles.selectedAttendanceOption,
              ]}
            >
              {attendanceStatus === "Holiday" ? (
                <FontAwesome5 name="dot-circle" size={24} color="black" />
              ) : (
                <Entypo name="circle" size={24} color="black" />
              )}
              <Text>Holiday</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="black"
            placeholder="Advance / Loans"
          />
          <TextInput
            style={styles.textInput}
            placeholderTextColor="black"
            placeholder="Extra Bonus"
          />
        </View>

        <Pressable
          onPress={submitAttendance}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>
            Submit Attendance
          </Text>
        </Pressable>

        {showAlert && (
          <View style={[styles.alertBox, alertType === 'success' ? styles.alertSuccess : styles.alertError]}>
            <Text style={styles.alertText}>{alertMessage}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default user;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  dateNavigationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginVertical: 20,
  },
  navButton: {
    padding: 5,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  employeeInfoCard: {
    marginVertical: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  employeeAvatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#4b6cb7",
    alignItems: "center",
    justifyContent: "center",
  },
  employeeAvatarText: {
    color: "white",
    fontSize: 16,
  },
  employeeNameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  employeeDetailsText: {
    marginTop: 5,
    color: "gray",
  },
  basicPayText: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 10,
  },
  attendanceSection: {
    marginVertical: 10,
  },
  attendanceHeader: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 3,
    marginTop: 7,
  },
  attendanceOptionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginVertical: 10,
  },
  attendanceOptionButton: {
    backgroundColor: "#C4E0E5",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  selectedAttendanceOption: {
    borderWidth: 2,
    borderColor: "#007bff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  textInput: {
    borderRadius: 6,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    padding: 10,
    flex: 1,
  },
  submitButton: {
    padding: 15,
    backgroundColor: "#00c6ff",
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "500",
  },
  alertBox: {
    position: 'absolute',
    bottom: 20,
    left: '5%',
    right: '5%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  alertSuccess: {
    backgroundColor: 'green',
  },
  alertError: {
    backgroundColor: 'red',
  },
  alertText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});