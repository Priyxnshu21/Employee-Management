import { StyleSheet, Text, View, ScrollView, TextInput, SafeAreaView, Platform, StatusBar, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AddDetailsScreen = () => {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [designation, setDesignation] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [salary, setSalary] = useState("");
    const [address, setAddress] = useState("");
    const [isActiveEmployee, setIsActiveEmployee] = useState(true);

    const handleRegister = () => {
        const employeeData = {
            employeeName: name,
            employeeId: employeeId,
            designation: designation,
            phoneNumber: mobileNumber,
            dateOfBirth: dateOfBirth,
            joiningDate: joiningDate,
            salary: salary,
            address: address,
            activeEmployee: isActiveEmployee,
        };
        console.log("Employee Data sent:", employeeData);

        axios.post("http://10.0.2.2:8000/addEmployee", employeeData)
            .then((response) => {
                Alert.alert("Success", "Employee Added Successfully!");
                setName("");
                setEmployeeId("");
                setDesignation("");
                setMobileNumber("");
                setDateOfBirth("");
                setJoiningDate("");
                setSalary("");
                setAddress("");
                setIsActiveEmployee(true);
            }).catch((error) => {
                console.error("Error adding employee:", error.response?.data || error.message);
                Alert.alert("Error", `Failed to add employee: ${error.response?.data?.message || error.message}`);
            });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
                        Add a new Employee
                    </Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            Full Name (First and Last Name)
                        </Text>
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={styles.textInput}
                            placeholder='Enter Full Name'
                            placeholderTextColor={"gray"}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            Employee Id
                        </Text>
                        <TextInput
                            value={employeeId}
                            onChangeText={(text) => setEmployeeId(text)}
                            style={styles.textInput}
                            placeholder='Enter Employee Id'
                            placeholderTextColor={"gray"}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            Designation
                        </Text>
                        <TextInput
                            value={designation}
                            onChangeText={(text) => setDesignation(text)}
                            style={styles.textInput}
                            placeholder='Enter Designation'
                            placeholderTextColor={"gray"}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            Mobile Number
                        </Text>
                        <TextInput
                            value={mobileNumber}
                            onChangeText={(text) => setMobileNumber(text)}
                            style={styles.textInput}
                            placeholder='Enter Mobile Number'
                            placeholderTextColor={"gray"}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            Date of Birth
                        </Text>
                        <TextInput
                            value={dateOfBirth}
                            onChangeText={(text) => setDateOfBirth(text)}
                            style={styles.textInput}
                            placeholder='YYYY-MM-DD'
                            placeholderTextColor={"gray"}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            Joining Date
                        </Text>
                        <TextInput
                            value={joiningDate}
                            onChangeText={(text) => setJoiningDate(text)}
                            style={styles.textInput}
                            placeholder='YYYY-MM-DD'
                            placeholderTextColor={"gray"}
                        />
                    </View>

                    <View style={styles.toggleContainer}>
                        <Text style={styles.inputLabel}>Active Employee</Text>
                        <Text style={styles.toggleText}>{isActiveEmployee ? "True" : "False"}</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            Salary
                        </Text>
                        <TextInput
                            value={salary}
                            onChangeText={(text) => setSalary(text)}
                            style={styles.textInput}
                            placeholder='Enter Salary'
                            placeholderTextColor={"gray"}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            Address
                        </Text>
                        <TextInput
                            value={address}
                            onChangeText={(text) => setAddress(text)}
                            style={styles.textInput}
                            placeholder='Enter Address'
                            placeholderTextColor={"gray"}
                            multiline={true}
                            numberOfLines={3}
                        />
                    </View>

                    <Pressable
                        onPress={handleRegister}
                        style={styles.addButton}
                    >
                        <Text style={styles.addButtonText}>Add Employee</Text>
                    </Pressable>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddDetailsScreen;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 10,
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    textInput: {
        padding: 12,
        borderColor: "#D0D0D0",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 5,
        fontSize: 16,
        color: '#333',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    toggleText: {
        fontSize: 16,
        color: '#555',
        fontWeight: '600',
    },
    addButton: {
        backgroundColor: '#6A5ACD',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    addButtonText: {
        fontWeight: "bold",
        color: "white",
        fontSize: 18,
    },
});