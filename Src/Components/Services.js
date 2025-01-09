import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import { axios } from './axios';

const Services = () => {
      const [selected, setSelected] = React.useState('');
        const data = [
          {key: '1', value: 'Mobiles', },
          {key: '2', value: 'Appliances'},
          {key: '3', value: 'Cameras'},
          {key: '4', value: 'Computers',},
          {key: '5', value: 'Vegetables'},
          {key: '6', value: 'Diary Products'},
          {key: '7', value: 'Drinks'},
        ];

      
  return (
    <View>
      <MultipleSelectList
        setSelected={val => setSelected(val)}
        data={data}
        save="value"
        label="Categories"
      />
    </View>
  );
}

export default Services

const styles = StyleSheet.create({})