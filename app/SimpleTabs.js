/**
 * @flow
 */

import React from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet, View, Text, Image, TouchableWithoutFeedback, Animated, StatusBar, Alert, RefreshControl, ToastAndroid, TouchableHighlight, TouchableOpacity
} from 'react-native';
import {
  TabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import SampleText from './SampleText';
import UiKit from './UiKit';
import BottomNavigationView from './component/BottomNavigationView'
import Swipeable from './component/Swipeable'

class MyHomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSwiping: false,
      refreshing: false,
      todos: [{ name: 'leecade/react-native-swiper', done: false },
      { name: 'fixt/react-native-page-swiper', done: false },
      { name: 'FuYaoDe/react-native-app-intro', done: false }]
    };

  }

  /*static navigationOptions = {
    tabBarLabel: '首页',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./assets/NavLogo.png')}
        style={{ width: 50, height: 50 }}
      />
    ),
  };*/

  _onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 2000);
  }

  handleScroll = (event) => {

    ToastAndroid.show(event.nativeEvent.contentOffset.y + ``, 1000);
  }

  render() {


    const leftContent = <View style={[styles.leftSwipeItem, { backgroundColor: 'lightskyblue' }]}>
      <Text>Pull action</Text>
    </View>;

    const rightButtons = [
      <TouchableOpacity style={[styles.rightSwipeItem, { backgroundColor: 'lightseagreen' }]}>
        <Text>1</Text>
      </TouchableOpacity>,
      <TouchableOpacity style={[styles.rightSwipeItem, { backgroundColor: 'orchid' }]}>
        <Text>2</Text>
      </TouchableOpacity>
    ];


    return (

      <View style={{ flex: 1, backgroundColor: '#fff' }}>

        <StatusBar
          backgroundColor="#fff"
          barStyle="light-content"
        />

        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />}

          style={styles.container} onScroll={this.handleScroll}>


          <View style={{ flex: 1 }}>

            {this.state.todos.map((item, i) =>


              <Swipeable key={i}

                leftContent={leftContent}
                rightButtons={rightButtons}>
                <View style={[styles.listItem, { backgroundColor: 'salmon' }]}>
                  <Text>{item.name}</Text>
                </View>
              </Swipeable>

            )}


          </View>



          <UiKit navigation={this.props.navigation} />


        </ScrollView>

      </View>
    );
  }
}



const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView style={styles.container}>
    <SampleText>{banner}</SampleText>
    <Button
      onPress={() => navigation.navigate('Home')}
      title="Go to home tab"
    />
    <Button
      onPress={() => navigation.navigate('Settings')}
      title="Go to settings tab"
    />
    <Button
      onPress={() => navigation.goBack(null)}
      title="Go back"
    />
  </ScrollView>
);



const MyPeopleScreen = ({ navigation }) => (
  <MyNavScreen
    banner="People Tab"
    navigation={navigation}
  />
);

MyPeopleScreen.navigationOptions = {
  tabBarLabel: 'People',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-people' : 'ios-people-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

const MyChatScreen = ({ navigation }) => (
  <MyNavScreen
    banner="Chat Tab"
    navigation={navigation}
  />
);

MyChatScreen.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-chatboxes' : 'ios-chatboxes-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen
    banner="Settings Tab"
    navigation={navigation}
  />
);

MySettingsScreen.navigationOptions = {
  tabBarLabel: '设置-',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-settings' : 'ios-settings-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

const SimpleTabs = TabNavigator({
  Home: {
    screen: MyHomeScreen,
    path: '',
  },
  People: {
    screen: MyPeopleScreen,
    path: 'cart',
  },
  Chat: {
    screen: MyChatScreen,
    path: 'chat',
  },
  Setting: {
    screen: MySettingsScreen,
    path: 'settings',
  },

}, {
    tabBarComponent: BottomNavigationView,
    tabBarPosition: 'bottom',

    // tabBarOptions: {
    //   showIcon: true,
    //   activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
    //   style: { backgroundColor: '#999', }
    // },
  });

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

  listItem: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },


});

export default SimpleTabs;
