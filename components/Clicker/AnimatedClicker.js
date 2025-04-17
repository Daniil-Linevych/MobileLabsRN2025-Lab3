import Animated from 'react-native-reanimated';
import Clicker from './Clicker';

const AnimatedClicker = ({ animatedStyle }) => {
  return (
    <Animated.View style={animatedStyle}>
      <Clicker size={100} />
    </Animated.View>
  );
};

export default AnimatedClicker;