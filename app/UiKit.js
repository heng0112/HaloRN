import React, { Component } from 'react';

import { View, Text, TouchableNativeFeedback, Image, StyleSheet, LayoutAnimation, UIManager, Platform, ActivityIndicator } from 'react-native';



export default class UiKit extends Component {

    state = {

        menulist: [
    {
        "Id": 1,
        "Title": "Chome",
        "Icon": "http://192.168.1.109:8066/content/icon/mobile-english_03@3x.png?b985c3ef-f35b-4339-9211-f2640b68b794",
        "Tips": 0
    },
    {
        "Id": 2,
        "Title": "My Photos",
        "Icon": "http://192.168.1.109:8066/content/icon/mobile-english_05@3x.png?9458f9b0-6058-4133-8320-d816fc1dc446",
        "Tips": 0
    },
    {
        "Id": 3,
        "Title": "My Files",
        "Icon": "http://192.168.1.109:8066/content/icon/mobile-english_07@3x.png?c2f4554b-69e5-42f2-9c46-b7345e666ff5",
        "Tips": 0
    },
    {
        "Id": 4,
        "Title": "Instagram",
        "Icon": "http://192.168.1.109:8066/content/icon/mobile-english_27@3x.png?83bf31a4-052e-497b-a27f-8b1ec2b1766f",
        "Tips": 0
    },
    {
        "Id": 5,
        "Title": "Settings",
        "Icon": "http://192.168.1.109:8066/content/icon/mobile-english_29@3x.png?7c5474c6-edfe-42b7-b0e9-515d3f14fe8b",
        "Tips": 0
    },
    {
        "Id": 6,
        "Title": "Help area",
        "Icon": "http://192.168.1.109:8066/content/icon/mobile-english_32@3x.png?55b0a168-8dd3-4b4f-b395-572b75f8cada",
        "Tips": 0
    },
    {
        "Id": 7,
        "Title": "Be Smile !",
        "Icon": "http://192.168.1.109:8066/content/icon/mobile-english_42@3x.png?ecd66c96-5647-4302-8d82-ba4d3d04431b",
        "Tips": 6
    },
    {
        "Id": 8,
        "Title": "Celender",
        "Icon": "http://192.168.1.109:8066/content/icon/mobile-english_38@3x.png?2a304207-99dd-4f13-b9cb-3c67e0473916",
        "Tips": 0
    },
    {
        "Id": 9,
        "Title": "Twitter",
        "Icon": "http://192.168.1.109:8066/content/icon/mobile-english_40@3x.png?929671bf-e6ce-4269-b41d-08f40f8517e6",
        "Tips": 0
    }
]
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