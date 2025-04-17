import {useRef} from 'react';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  Directions
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const GestureWrapper = ({
  children,
  onSingleTap,
  onDoubleTap,
  onLongPress,
  onPan,
  onFlingLeft,
  onFlingRight,
  onPinch,
}) => {
  const doubleTapRef = useRef();
  const longPressRef = useRef();
  const panRef = useRef();
  const flingRef = useRef();
  const pinchRef = useRef();

  return (
    <PinchGestureHandler ref={pinchRef} onGestureEvent={onPinch}>
      <Animated.View>
        <PanGestureHandler ref={panRef} onGestureEvent={onPan} minDist={10}>
          <Animated.View>
            <FlingGestureHandler
              ref={flingRef}
              direction={Directions.RIGHT}
              onHandlerStateChange={onFlingRight}>
              <FlingGestureHandler
                ref={flingRef}
                direction={Directions.LEFT}
                onHandlerStateChange={onFlingLeft}>
                <Animated.View>
                  <LongPressGestureHandler
                    ref={longPressRef}
                    onHandlerStateChange={onLongPress}
                    minDurationMs={3000}>
                    <TapGestureHandler
                      ref={doubleTapRef}
                      onHandlerStateChange={onDoubleTap}
                      numberOfTaps={2}>
                      <TapGestureHandler
                        onHandlerStateChange={onSingleTap}
                        waitFor={[
                          doubleTapRef,
                          longPressRef,
                          panRef,
                          flingRef,
                          pinchRef,
                        ]}>
                        <Animated.View>{children}</Animated.View>
                      </TapGestureHandler>
                    </TapGestureHandler>
                  </LongPressGestureHandler>
                </Animated.View>
              </FlingGestureHandler>
            </FlingGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default GestureWrapper;