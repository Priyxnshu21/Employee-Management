import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

const SearchResults = ({ data, input, setInput }) => {
  return (
    <View style={{padding:10}}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={({item}) => {
          const safeInput = input ? input.toLowerCase() : '';
          const employeeNameLower = item?.employeeName ? item.employeeName.toLowerCase() : '';
          const employeeIdString = item?.employeeId ? item.employeeId.toString() : '';

          if(employeeNameLower.includes(safeInput) || employeeIdString.includes(safeInput)) {
            return (
              <View style={{flexDirection:'row',alignItems:'center',gap:10,marginVertical:10}}>
                <View style={{width:50,height:50,borderRadius:8,padding:10, alignItems:'center', backgroundColor:'#4b6cb7',justifyContent:'center'}}>
                  <Text style={{color:"white",fontSize:16}}>{item?.employeeName?.charAt(0)}</Text>
                </View>
                <View>
                  <Text style={{fontSize:16,fontWeight:"bold"}}>{item?.employeeName}</Text>
                  <Text style={{marginTop:5,color:"gray"}}>{item?.designation} ({item?.employeeId})</Text>
                </View>
              </View>
            )
          }
          return null;
        }}
      />
    </View>
  )
}

export default SearchResults

const styles = StyleSheet.create({})