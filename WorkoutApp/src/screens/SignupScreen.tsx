import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';

export default function SignupScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signup = useAuthStore(state => state.signup);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    const error = await signup(name.trim(), email.trim(), password);
    if (error) Alert.alert('Signup Failed', error);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor="#94A3B8"
        style={styles.input}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94A3B8"
        style={styles.input}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#94A3B8"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 24,
    justifyContent: 'center'
  },
  title: {
    fontSize: 26,
    color: '#E5E7EB',
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 12,
    color: '#E5E7EB',
    marginBottom: 12
  },
  button: {
    backgroundColor: '#22C55E',
    padding: 14,
    borderRadius: 12,
    marginTop: 10
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000'
  },
  link: {
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 16
  }
});
