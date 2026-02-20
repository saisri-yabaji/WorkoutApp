import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useState } from 'react';
import { COLORS } from '../theme/colors';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: 'Train Smarter',
    description: 'Personalized workouts designed for your fitness level.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'
  },
  {
    title: 'Build Consistency',
    description: 'Track workouts and maintain your daily streak.',
    image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74'
  },
  {
    title: 'See Real Progress',
    description: 'Stay motivated with clear progress tracking.',
    image: 'https://png.pngtree.com/thumb_back/fh260/background/20241224/pngtree-a-fully-equipped-gym-with-dumbbells-weight-machines-and-cardio-equipment-image_16843660.jpg'
  }
];

export default function OnboardingScreen({ navigation }: any) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: slides[index].image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{slides[index].title}</Text>
        <Text style={styles.desc}>{slides[index].description}</Text>

        {/* Pagination dots */}
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === index && styles.activeDot
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={next}>
          <Text style={styles.buttonText}>
            {index === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>

        {index === slides.length - 1 && (
          <TouchableOpacity onPress={() => navigation.replace('Signup')}>
            <Text style={styles.link}>Create new account</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

/* ✅ STYLES MUST BE DEFINED */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg
  },
  image: {
    width: width,
    height: '55%'
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 10
  },
  desc: {
    fontSize: 16,
    color: COLORS.muted,
    marginBottom: 30
  },
  dots: {
    flexDirection: 'row',
    marginBottom: 30
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#334155',
    marginRight: 6
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 16
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 14
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  link: {
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 16
  }
});
