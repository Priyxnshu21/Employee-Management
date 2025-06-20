import {
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Markattendance = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(moment());
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };

  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };

  const formatDate = (date) => {
    return date.format("MMMM D,YYYY");
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:8000/Employees");
        setEmployees(response.data);
      } catch (error) {
        console.log("error fetching employee data", error);
        if (error.response) {
            console.log("Employees Error Response Data:", error.response.data);
            console.log("Employees Error Response Status:", error.response.status);
        }
      }
    };
    fetchEmployeeData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:8000/attendance`, {
        params: {
          date: currentDate.format("MMMM D,YYYY"),
        },
      });
      setAttendance(response.data);
    } catch (error) {
      console.log("error fetching attendance data", error);
        if (error.response) {
            console.log("Attendance Error Response Data:", error.response.data);
            console.log("Attendance Error Response Status:", error.response.status);
        }
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [currentDate]);

  const employeeWithAttendance = employees.map((employee) => {
    const attendanceRecord = attendance.find(
      (record) => record.employeeId === employee.employeeId
    );
    return {
      ...employee,
      status: attendanceRecord ? attendanceRecord.status : "Not Marked",
    };
  });

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

        <View style={styles.employeeListContainer}>
          {employeeWithAttendance.map((item) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/[user]",
                  params: {
                    name: item.employeeName,
                    id: item.employeeId,
                    salary: item?.salary,
                    designation: item?.designation,
                  },
                })
              }
              key={item.employeeId}
              style={styles.employeeItemCard}
            >
              <View style={styles.employeeAvatar}>
                <Text style={styles.employeeAvatarText}>
                  {item?.employeeName?.charAt(0)}
                </Text>
              </View>

              <View style={styles.employeeDetails}>
                <Text style={styles.employeeNameText}>
                  {item?.employeeName}
                </Text>
                <Text style={styles.employeeDesignationIdText}>
                  {item?.designation} ({item?.employeeId})
                </Text>
              </View>

              {item?.status && item.status !== "Not Marked" && (
                <View style={[
                    styles.attendanceStatusCircle,
                    item.status.toLowerCase() === "present" && styles.statusPresent,
                    item.status.toLowerCase() === "absent" && styles.statusAbsent,
                    item.status.toLowerCase() === "half day" && styles.statusHalfDay,
                    item.status.toLowerCase() === "holiday" && styles.statusHoliday,
                ]}>
                  <Text style={styles.attendanceStatusText}>
                    {item.status.charAt(0)}
                  </Text>
                </View>
              )}
                {item.status === "Not Marked" && (
                    <View style={styles.attendanceStatusCircleNotMarked}>
                        <Text style={styles.attendanceStatusTextNotMarked}>?</Text>
                    </View>
                )}
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Markattendance;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
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
    padding: 8,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  employeeListContainer: {

  },
  employeeItemCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 8,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
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
    fontSize: 18,
    fontWeight: "bold",
  },
  employeeDetails: {
    flex: 1,
  },
  employeeNameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  employeeDesignationIdText: {
    marginTop: 5,
    color: "gray",
    fontSize: 14,
  },
  attendanceStatusCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  attendanceStatusText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  statusPresent: {
    backgroundColor: "green",
  },
  statusAbsent: {
    backgroundColor: "red",
  },
  statusHalfDay: {
    backgroundColor: "orange",
  },
  statusHoliday: {
    backgroundColor: "purple",
  },
  attendanceStatusCircleNotMarked: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    backgroundColor: "#ccc",
  },
  attendanceStatusTextNotMarked: {
    color: "#555",
    fontSize: 16,
    fontWeight: "bold",
  }
});