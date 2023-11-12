import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const supportedURL = 'https://www.aberdeenceramicsstudio.com/';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1 }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to booking"
          onPress={() => navigation.navigate('Booking')}
        />
        <Button
          title="Go to health and safety screen"
          onPress={() => navigation.navigate('Health')}
        />
        <Button
          title="Go to the blog post page"
          onPress={() => navigation.navigate('Blog')}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 30 }}>
          Welcome to Aberdeen ceramic and our{' '}
          <OpenURLButton url={supportedURL}>Website</OpenURLButton>
        </Text>
      </View>
    </View>
  );
}

function BookingScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hours, setHours] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = useCallback(() => {
    setShowDatePicker(true);
  }, []);

  const handleBooking = useCallback(() => {
    if (!hours) {
      Alert.alert('Please enter the number of hours.');
      return;
    }

    const parsedHours = parseFloat(hours);

    if (isNaN(parsedHours) || parsedHours <= 0 || parsedHours > 4) {
      Alert.alert('Please enter a valid number of hours (1 to 4).');
      return;
    }

    // Log selected date and hours to the console
    console.log('Selected Date:', selectedDate.toDateString());
    console.log('Selected Hours:', parsedHours);

    // For actual implementation, replace the console.log with your booking logic
    // ...

    // Clear input fields
    setSelectedDate(new Date());
    setHours('');
  }, [hours, selectedDate]);

  const handleDatePickerChange = useCallback((date) => {
    setShowDatePicker(false);
    setSelectedDate(date);
  }, []);

  const handleDatePickerCancel = useCallback(() => {
    setShowDatePicker(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Booking Screen</Text>
        <TouchableOpacity onPress={handleDateChange}>
          <Text style={styles.datePickerText}>
            {selectedDate.toDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DatePicker
            date={selectedDate}
            mode="date"
            onDateChange={handleDatePickerChange}
            onCancel={handleDatePickerCancel}
          />
        )}
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 20,
            width: 200,
            textAlign: 'center',
          }}
          placeholder="Enter hours"
          keyboardType="numeric"
          value={hours}
          onChangeText={(text) => setHours(text)}
        />
        <Button title="Book Now" onPress={handleBooking} />
        <Button
          title="Go to health and safety screen"
          onPress={() => navigation.navigate('Health')}
        />
        <Button
          title="Go to the blog post page"
          onPress={() => navigation.navigate('Blog')}
        />
      </View>
    </View>
  );
}

function HealthScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Go to booking"
        onPress={() => navigation.navigate('Booking')}
      />
      <Button
        title="Go to the blog post page"
        onPress={() => navigation.navigate('Blog')}
      />
    </View>
  );
}

function BlogScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Go to booking"
        onPress={() => navigation.navigate('Booking')}
      />
      <Button
        title="Go to health and safety screen"
        onPress={() => navigation.navigate('Health')}
      />
    </View>
  );
}

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Check if the device supports opening the URL
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Open the URL if supported
      await Linking.openURL(url);
    } else {
      // Show an alert if the URL cannot be opened
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text
        style={{
          color: 'blue',
          textDecorationLine: 'underline',
          fontWeight: 'bold',
          fontSize: 30,
        }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="Health" component={HealthScreen} />
        <Stack.Screen name="Blog" component={BlogScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#999ea2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePickerText: {
    fontSize: 20,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});
