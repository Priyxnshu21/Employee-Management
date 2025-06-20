import { StyleSheet, Text, View, ScrollView, Pressable, SafeAreaView, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <LinearGradient
          colors={["#7F7FD5", "#E9E4F0"]}
          style={styles.gradientBackground}
        >
          <View style={styles.mainContentWrapper}>
            <View style={styles.headerContainer}>
              <Feather name="bar-chart" size={24} color="black" />
              <Text style={styles.headerTitle}>
                Employee Management System
              </Text>
              <Entypo name="lock" size={24} color="black" />
            </View>

            <View style={styles.boxesContainer}>
              <Pressable
                onPress={() => router.push("/(home)/employees")}
                style={styles.box}
              >
                <View style={styles.iconBackground}>
                  <Ionicons name="people-sharp" size={30} color="black" />
                </View>
                <Text style={styles.boxText}>Employee List</Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/(home)/markattendance")}
                style={styles.box}
              >
                <View style={styles.iconBackground}>
                  <Ionicons name="people-sharp" size={30} color="black" />
                </View>
                <Text style={styles.boxText}>Mark Attendance</Text>
              </Pressable>
            </View>

            <View style={styles.reportBlock}>
              <Pressable style={styles.reportPressable} onPress={() => {}}>
                <View style={styles.reportIconBackground}>
                  <Ionicons name="newspaper-outline" size={24} color="black" />
                </View>
                <Text style={styles.reportText}>Attendance Report</Text>
                <View style={styles.chevronIconBackground}>
                  <Entypo name="chevron-right" size={24} color="black" />
                </View>
              </Pressable>
              <Pressable
                onPress={() => router.push("/(home)/summary")}
                style={styles.reportPressable}>
                <View style={styles.reportIconBackground}>
                  <Octicons name="repo-pull" size={24} color="black" />
                </View>
                <Text style={styles.reportText}>Summary Report</Text>
                <View style={styles.chevronIconBackground}>
                  <Entypo name="chevron-right" size={24} color="black" />
                </View>
              </Pressable>
              <Pressable style={styles.reportPressable}>
                <View style={styles.reportIconBackground}>
                  <Octicons name="report" size={22} color="black" />
                </View>
                <Text style={styles.reportText}>All Generate Report</Text>
                <View style={styles.chevronIconBackground}>
                  <Entypo name="chevron-right" size={24} color="black" />
                </View>
              </Pressable>
              <Pressable style={styles.reportPressable}>
                <View style={styles.reportIconBackground}>
                  <MaterialIcons name="people-alt" size={24} color="black" />
                </View>
                <Text style={styles.reportText}>Overtime Employees</Text>
                <View style={styles.chevronIconBackground}>
                  <Entypo name="chevron-right" size={24} color="black" />
                </View>
              </Pressable>
            </View>

            <View style={styles.bottomBoxesRow}>
              <View style={[styles.bottomBox, { backgroundColor: "#869ef8" }]}>
                <View style={styles.bottomBoxIconBackground}>
                  <MaterialCommunityIcons name="guy-fawkes-mask" size={24} color="black" />
                </View>
                <Text style={styles.bottomBoxText}>
                  Attendance Criteria
                </Text>
              </View>
              <View style={[styles.bottomBox, { backgroundColor: "#ABCABA" }]}>
                <View style={styles.bottomBoxIconBackground}>
                  <MaterialIcons name="bar-chart" size={24} color="black" />
                </View>
                <Text style={styles.bottomBoxText}>
                  Increased Overflow
                </Text>
              </View>
            </View>

            <View style={styles.bottomBoxesRow}>
              <View style={[styles.bottomBox, { backgroundColor: "#D3CCE3" }]}>
                <View style={styles.bottomBoxIconBackground}>
                  <MaterialIcons name="attach-money" size={24} color="black" />
                </View>
                <Text style={styles.bottomBoxText}>
                  Cost Savings
                </Text>
              </View>
              <View style={[styles.bottomBox, { backgroundColor: "#bdc3c7" }]}>
                <View style={styles.bottomBoxIconBackground}>
                  <AntDesign name="areachart" size={24} color="black" />
                </View>
                <Text style={styles.bottomBoxText}>
                  Employee Performance
                </Text>
              </View>
            </View>

          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  gradientBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mainContentWrapper: {
    paddingHorizontal: 12,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
    textAlign: 'center',
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  box: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '46%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '2%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconBackground: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  boxText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  reportBlock: {
    marginTop: 8,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 7,
    width: '95%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  reportPressable: {
    backgroundColor: "#BE93C5",
    borderRadius: 6,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reportIconBackground: {
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  reportText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  chevronIconBackground: {
    width: 35,
    height: 35,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBoxesRow: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 12,
    alignItems: "center",
    Jotent: "center",
    width: '100%',
  },
  bottomBox: {
    borderRadius: 6,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  bottomBoxIconBackground: {
    padding: 0,
    width: 35,
    height: 35,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
  },
  bottomBoxText: {
    marginTop: 7,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  }
});