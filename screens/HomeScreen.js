import { useState, useRef } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import { State } from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import GestureWrapper from '../components/Gestures/GestureWrapper';
import AnimatedClicker from '../components/Clicker/AnimatedClicker';
import { tasks as initTasks } from '../data/tasks';

const HomeScreen = ({ navigation }) => {
  const [score, setScore] = useState(0);
  const [tasks, setTasks] = useState(initTasks);
  const scale = useSharedValue(1);
  const position = useSharedValue({ x: 0, y: 0 });

  const updateTask = (type, value = 1) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.type === type && !task.completed) {
          const newCurrent = task.current + value;
          return {
            ...task,
            current: newCurrent,
            completed: newCurrent >= task.required,
          };
        }
        return task;
      })
    );
  };

  const onSingleTap = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      setScore((prev) => prev + 1);
      scale.value = 0.9;
      setTimeout(() => {
        scale.value = 1;
      }, 50);
      updateTask('tap');
      updateTask('score');
    }
  };

  const onDoubleTap = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      setScore((prev) => prev + 2);
      scale.value = 1.1;
      setTimeout(() => {
        scale.value = 1;
      }, 50);
      updateTask('double');
      updateTask('score', 2);
    }
  };

  const onLongPress = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      scale.value = 1.1;
      setTimeout(() => {
        scale.value = 1;
      }, 100);
      updateTask('hold');
    }
  };

  const onPan = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = 1.1;
    },
    onActive: (event) => {
      position.value = {
        x: event.translationX,
        y: event.translationY,
      };
    },
    onEnd: () => {
      position.value = withSpring({ x: 0, y: 0 });
      scale.value = withSpring(1);
      runOnJS(updateTask)('drag');
    },
  });

  const onFlingLeft = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      position.value = withSpring(
        { x: -50, y: 0 },
        { damping: 10 },
        () => {
          position.value = withSpring({ x: 0, y: 0 });
        }
      );
      updateTask('swipeLeft');
    }
  };

  const onFlingRight = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      position.value = withSpring(
        { x: 50, y: 0 },
        { damping: 10 },
        () => {
          position.value = withSpring({ x: 0, y: 0 });
        }
      );
      updateTask('swipeRight');
    }
  };

  const onPinch = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale;
    },
    onEnd: () => {
      if (Math.abs(scale.value - 1) > 0.2) {
        runOnJS(updateTask)('resize');
      }
      scale.value = withSpring(1);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateX: position.value.x },
        { translateY: position.value.y },
      ],
    };
  });

  return (
    <Container>
      <ScoreText>Score: {score}</ScoreText>

      <ObjectContainer>
        <GestureWrapper
          onSingleTap={onSingleTap}
          onDoubleTap={onDoubleTap}
          onLongPress={onLongPress}
          onPan={onPan}
          onFlingLeft={onFlingLeft}
          onFlingRight={onFlingRight}
          onPinch={onPinch}
        >
          <AnimatedClicker animatedStyle={animatedStyle} />
        </GestureWrapper>
      </ObjectContainer>

      <Button
        title="View Tasks"
        onPress={() => navigation.navigate('Tasks', { score, tasks })}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding: 20px;
`;

const ScoreText = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ObjectContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default HomeScreen;
