import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore(state => state.login);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const error = await login(email.trim(), password);
    if (error) Alert.alert('Login Failed', error);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Create new account</Text>
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
