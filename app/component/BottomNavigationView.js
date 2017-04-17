
import React from 'react';
import {
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    Animated,
    StatusBar,
    Alert,
    RefreshControl
} from 'react-native';
import { TabNavigator, } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

export default class BottomNavigationView extends React.Component {
    render = () => {
        const { navigationState, position, jumpToIndex } = this.props;
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderTopWidth: 0.5, borderTopColor: '#ccc', backgroundColor: '#fff' }}>
                {
                    navigationState.routes.map((route, index) => {

                        //const focused = index === navigationState.index;
                        //const scene = { route, index, focused };

                        const inputRange = [-1, ...navigationState.routes.map((x, i) => i)];
                        const outputRange = inputRange.map((inputIndex) =>
                            (inputIndex === index ? '#008800' : '#999')
                        );
                        const color = position.interpolate({
                            inputRange,
                            outputRange,
                        });

                        const icons = ['ios-leaf-outline', 'ios-ionic-outline', 'ios-notifications-off-outline', 'ios-paper-plane-outline'];
                        const iconsActive = ['ios-leaf', 'ios-ionic', 'ios-notifications-off', 'ios-paper-plane'];
                        const activeOpacity = position.interpolate({
                            inputRange,
                            outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
                        });
                        const inactiveOpacity = position.interpolate({
                            inputRange,
                            outputRange: inputRange.map((i) => (i === index ? 0 : 1)),
                        });

                        //const justifyContent = this.props.showIcon ? 'flex-end' : 'center';
                        return (
                            <TouchableWithoutFeedback key={route.key} onPress={() => jumpToIndex(index)}>
                                <View style={{
                                    height: 55,
                                    flex: 1,
                                    alignItems: 'stretch',
                                    justifyContent: 'flex-end',
                                }}>
                                    <Animated.View style={[styles.icon, { opacity: activeOpacity }]}>
                                        <Icon name={iconsActive[index]} size={30} color='#008800' />
                                        <Animated.Text style={{ color }}> {route.key}</Animated.Text>
                                    </Animated.View>

                                    <Animated.View style={[styles.icon, { opacity: inactiveOpacity }]}>
                                        <Icon name={icons[index]} size={30} color='#999' />
                                        <Animated.Text style={{ color }}> {route.key}</Animated.Text>
                                    </Animated.View>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    })}

            </View>)


    }


}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  icon: {
    // We render the icon twice at the same position on top of each other:
    // active and inactive one, so we can fade between them:
    // Cover the whole iconContainer:
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
