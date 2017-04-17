import React, { Component } from 'react';

import { View, Text, TouchableNativeFeedback, Image, StyleSheet, LayoutAnimation, UIManager, Platform, ActivityIndicator } from 'react-native';



export default class UiKit extends Component {

    state = {

        menulist: []
    };



    _getList = () => {

        fetch('http://192.168.1.109:8066/service/geticonlist')
            .then((response) => response.json())
            .then((responseJson) => {
                    console.log(JSON.stringify(responseJson));
                this.setState({ menulist: responseJson });
            })
            .catch(e => { console.log(`error ${e}`) });


    }

    _toggleMore = (item) => {


        fetch('http://192.168.1.109:8066/service/updatetips?id=' + item.Id, { method: 'GET' })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ menulist: responseJson });
            })
            .catch(e => { console.log(e) });

        //this.setState((state) => ({ showMore: !state.showMore, showMoreSetting: false }));

    };


    componentDidMount() {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        this._getList();

    }

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    renderRowItem(rows) {

        return (
            <View style={{ paddingTop: 50, marginBottom: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>

                {rows.map((item, index) =>
               

                    <View key={item.Title} style={{ width: 100, height: 100 }}>
                        <TouchableNativeFeedback onLongPress={() => this._getList()} onPress={() => this._toggleMore(item)}>

                            <View style={styles.imagesView}>

                                <Image style={{ width: 50, height: 50 }} source={{ uri: item.Icon }}>                                  
                                </Image>

                                <Text>{item.Title}</Text>
                                {item.Tips ?
                                    <Image style={{ left: 20, width: 15, height: 15, position: 'absolute', alignItems: 'center', justifyContent: 'center' }} source={require('./assets/images/mobile-english_tips.png')}>
                                        <Text style={{ color: '#fff', fontSize: 12 }}>{item.Tips}</Text>
                                    </Image>
                                    :
                                    <View />
                                }
                            </View>

                        </TouchableNativeFeedback>

                    </View>

                )}


            </View>);



    }




    render() {


        return (

            <View style={{ flex: 1, backgroundColor: '#fff', }}>

                {
                    this.state.menulist.length > 0 ? this.renderRowItem(this.state.menulist) :
                        <View style={{ height: 150, paddingTop: 30 }}><ActivityIndicator size='small' color='#999' /></View>

                }

            </View>
        );
    }

}


const styles = StyleSheet.create({

  imagesView: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  viewContainer: {

    //flexDirection: 'row',
    //flexWrap: 'wrap',
  }


});