import { Pressable, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import { useRouter } from 'expo-router';

const EmployeesScreen = () => {
  const [employees, setEmployees] = useState([]);
  const [input, setInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchEmployeesData = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8000/Employees');
        setEmployees(response.data);
      } catch (error) {
        console.log('Error fetching employees:', error);
      }
    };
    fetchEmployeesData();
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.employeeName?.toLowerCase().includes(input.toLowerCase())
  );

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </Pressable>

      <View style={styles.searchBarWrapper}>
        <AntDesign name="search1" size={20} color="black" />
        <TextInput
          value={input}
          onChangeText={(text => setInput(text))}
          style={styles.searchInput}
          placeholder="search"
        />
        {employees.length > 0 && (
          <Pressable onPress={() => router.push('/(home)/adddetails')}>
            <AntDesign name="pluscircle" size={24} color="black" />
          </Pressable>
        )}
      </View>
    </View>
  );

  const NoDataComponent = () => (
    <View style={styles.noDataContainer}>
      <Text>No Data</Text>
      <Text>Press on the plus button and add your Employee</Text>
      <Pressable onPress={() => router.push('/(home)/adddetails')}>
        <AntDesign style={{ marginTop: 30 }} name="pluscircle" size={24} color="black" />
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {employees.length > 0 || input.length > 0 ? (
        <FlatList
          data={filteredEmployees}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Pressable style={styles.employeeItemContainer}>
              <View style={styles.employeeItemAvatar}>
                <Text style={styles.employeeItemAvatarText}>
                  {item.employeeName?.charAt(0) ?? ''}
                </Text>
              </View>
              <View>
                <Text style={styles.employeeItemName}>
                  {item.employeeName ?? ''}
                </Text>
                <Text style={styles.employeeItemDetails}>
                  {item.designation ?? ''} ({item.employeeId ?? ''})
                </Text>
              </View>
            </Pressable>
          )}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={NoDataComponent}
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <View style={styles.fullScreenNoData}>
          <ListHeader />
          <NoDataComponent />
        </View>
      )}
    </SafeAreaView>
  );
};

export default EmployeesScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatListContent: {},
  fullScreenNoData: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  backButton: {
    marginLeft: 10,
    paddingRight: 10,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    flex: 1,
    backgroundColor: '#f0f0f0',
    gap: 10,
    borderRadius: 4,
    marginHorizontal: 7,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  employeeItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  employeeItemAvatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#4B0082",
    alignItems: "center",
    justifyContent: "center"
  },
  employeeItemAvatarText: {
    color: "white",
    fontSize: 16
  },
  employeeItemName: {
    fontSize: 16,
    fontWeight: "bold"
  },
  employeeItemDetails: {
    marginTop: 4,
    color: "gray"
  }
});
