import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";

const Summary = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextMonth = () => {
    const nextMonth = moment(currentDate).add(1, "months");
    setCurrentDate(nextMonth);
  };

  const goToPrevMonth = () => {
    const prevMonth = moment(currentDate).subtract(1, "months");
    setCurrentDate(prevMonth);
  };

  const formatDate = (date) => {
    return date.format("MMMM,YYYY");
  };

  const fetchAttendanceReport = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/attendace-report-all-employees`,
        {
          params: {
            month: currentDate.month() + 1,
            year: currentDate.year(),
          },
        }
      );
      setAttendanceData(response.data);
    } catch (error) {
      console.log("Error fetching attendance report:", error);
      if (error.response) {
          console.log("Report Error Response Data:", error.response.data);
          console.log("Report Error Response Status:", error.response.status);
      } else if (error.request) {
          console.log("Report Error Request:", error.request);
      } else {
          console.log("Report Error Message:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchAttendanceReport();
  }, [currentDate]);

  console.log("Attendance Data for Display:", attendanceData);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View
          style={styles.monthNavigationContainer}
        >
          <AntDesign
            onPress={goToPrevMonth}
            name="left"
            size={24}
            color="black"
          />
          <Text style={styles.monthText}>{formatDate(currentDate)}</Text>
          <AntDesign
            onPress={goToNextMonth}
            name="right"
            size={24}
            color="black"
          />
        </View>

        <View style={styles.tableContainer}>
          {attendanceData?.map((item) => (
            <View key={item.employeeId} style={styles.employeeCard}>
              <View style={styles.employeeHeader}>
                <View
                  style={styles.employeeAvatar}
                >
                  <Text style={styles.employeeAvatarText}>
                    {item?.employeeName?.charAt(0)}
                  </Text>
                </View>
                <View style={styles.employeeDetails}>
                  <Text style={styles.employeeNameText}>
                    {item?.employeeName}
                  </Text>
                  <Text style={styles.employeeDesignationText}>
                    Employee ID: {item?.employeeId}
                  </Text>
                </View>
              </View>

              <View style={styles.dataTableWrapper}>
                <DataTable>
                  <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title textStyle={styles.tableHeaderText}>P</DataTable.Title>
                    <DataTable.Title textStyle={styles.tableHeaderText}>A</DataTable.Title>
                    <DataTable.Title textStyle={styles.tableHeaderText}>HD</DataTable.Title>
                    <DataTable.Title textStyle={styles.tableHeaderText}>H</DataTable.Title>
                  </DataTable.Header>
                  <DataTable.Row style={styles.tableRow}>
                    <DataTable.Cell textStyle={styles.tableCellText}>{item?.present || 0}</DataTable.Cell>
                    <DataTable.Cell textStyle={styles.tableCellText}>{item?.absent || 0}</DataTable.Cell>
                    <DataTable.Cell textStyle={styles.tableCellText}>{item?.halfday || 0}</DataTable.Cell>
                    <DataTable.Cell textStyle={styles.tableCellText}>{item?.holidays || 0}</DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </View>
            </View>
          ))}
          {attendanceData?.length === 0 && (
            <Text style={styles.noDataText}>No attendance data for this month.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Summary;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  monthNavigationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginVertical: 20,
    paddingHorizontal: 12,
  },
  navButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tableContainer: {
    marginHorizontal: 12,
  },
  employeeCard: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  employeeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  employeeAvatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
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
  employeeDesignationText: {
    marginTop: 2,
    color: "gray",
    fontSize: 14,
  },
  dataTableWrapper: {
    marginTop: 10,
    backgroundColor: "#A1FFCE",
    borderRadius: 5,
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#82E0AA",
    height: 45,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#333',
  },
  tableRow: {
    height: 40,
  },
  tableCellText: {
    fontSize: 14,
    color: '#333',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'gray',
  },
});