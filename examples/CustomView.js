'use strict';

var React = require('react-native');

var {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlight
} = React;

var _ = require('lodash');
var Dimensions = require('Dimensions');
var screen = Dimensions.get('window');

var Lightbox = require('../components/Lightbox');
var Icon = require('react-native-vector-icons/FontAwesome');

var BannerImages = React.createClass({
  render: function() {
    var images = [
      'Assets/images/sample_01.jpg',
      'Assets/images/sample_02.jpg',
      'Assets/images/sample_03.jpg'
    ];

    var that = this;
    var caroselImages = [];
    _.each(images, function(item, i) {
      caroselImages.push(
        <View style={{width: screen.width, height: 240}} key={'image' + i}>
          <Lightbox navigator={that.props.navigator}>
            <Image source={{uri: item}} style={styles.image} />
          </Lightbox>
        </View>
      )
    });

    return (
      <ScrollView
        alwaysBounceHorizontal={true}
        alwaysBounceVertical={false}
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled={true}
        scrollsToTop={false}
        bounces={false}
        contentOffset={{x: 0, y: 0}}
        contentContainerStyle={[styles.carosel, {width: caroselImages.length * screen.width}]}>
        {caroselImages}
      </ScrollView>
    )
  }
});

var LikeButton = React.createClass({
  getInitialState: function() {
    return {
      save: false
    }
  },
  componentDidMount: function() {
    this.STORAGEKEY = '@custom-view-1';

    AsyncStorage.getItem(this.STORAGEKEY)
    .then((value) => {
      if (value != null) {
        var v = JSON.parse(value);
        this.setState({save: v.saved});
      }
    })
    .catch((error) => console.error('AsyncStorage error: ', error.message))
    .done();
  },
  handlePress: function() {
    if (this.state.save) {
      this.setState({save: false});

      AsyncStorage.removeItem(this.STORAGEKEY)
      .then(() => console.log('house saved: ', this.STORAGEKEY))
      .catch((error) => console.error('AsyncStorage error: ', error.message))
      .done();
    } else {
      this.setState({save: true});
      var data = {saved: true}

      AsyncStorage.setItem(this.STORAGEKEY, JSON.stringify(data))
      .then(() => console.log('house saved: ', this.STORAGEKEY))
      .catch((error) => console.error('AsyncStorage error: ', error.message))
      .done();
    }
  },
  render: function() {
    var likeStateColor = this.state.save ? '#E55451' : 'white';

    return (
      <View style={styles.likeContainer}>
        <TouchableOpacity onPress={this.handlePress}>
          <Icon name="heart" size={30} style={[styles.like, {color: likeStateColor}]} />
        </TouchableOpacity>
      </View>
    )
  }
});

var PriceTag = React.createClass({
  render: function() {
    return (
      <View style={styles.priceTagContainer}>
        <Text style={styles.priceTagText}>&#3647;3,000,000</Text>
      </View>
    )
  }
});

var Address = React.createClass({
  render: function() {
    return (
      <View style={styles.addressContainer}>
        <Icon name="map" size={15} style={styles.mapIcon} />
        <Text style={styles.addressText}>770/44 Pattanakard rd. Suanluang Bangkok 10250</Text>
      </View>
    )
  }
});

var SpecIconBox = React.createClass({
  render: function() {
    return (
      <View style={[styles.specIconBoxContainer, {borderWidth:0, width: screen.width / 3}]}>
        <Icon name={this.props.name} size={34} style={styles.specIcon} />
        <Text style={styles.specValue}>{this.props.value}</Text>
        <Text style={styles.specLabel}>{this.props.label}</Text>
      </View>
    )
  }
});

exports.title = "<Custom View>";
exports.component = React.createClass({
  render: function() {
    return (
      <ScrollView
        style={[styles.scene]}
        scrollsToTop={true}
      >
        <BannerImages />
        <LikeButton />
        <PriceTag />
        <Address />
        <View style={styles.iconContainer}>
          <SpecIconBox name="bed" value="2" label="Bedrooms" />
          <SpecIconBox name="male" value="2" label="Bathrooms" />
          <SpecIconBox name="cube" value="34.7" label="SQM" />
        </View>
        <View style={styles.iconContainer}>
          <SpecIconBox name="building" value="2014" label="Year Built" />
          <SpecIconBox name="taxi" value="Yes" label="Taxi" />
          <SpecIconBox name="train" value="Yes" label="BTS/MRT" />
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.descLabel}>REMARKS:</Text>

          <Text style={styles.descText}>
            Lorem Ipsum คือ เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์ มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่ 16 เมื่อเครื่องพิมพ์โนเนมเครื่องหนึ่งนำรางตัวพิมพ์มาสลับสับตำแหน่งตัวอักษรเพื่อทำหนังสือตัวอย่าง Lorem Ipsum อยู่ยงคงกระพันมาไม่ใช่แค่เพียงห้าศตวรรษ แต่อยู่มาจนถึงยุคที่พลิกโฉมเข้าสู่งานเรียงพิมพ์ด้วยวิธีทางอิเล็กทรอนิกส์ และยังคงสภาพเดิมไว้อย่างไม่มีการเปลี่ยนแปลง มันได้รับความนิยมมากขึ้นในยุค ค.ศ. 1960 เมื่อแผ่น Letraset วางจำหน่ายโดยมีข้อความบนนั้นเป็น Lorem Ipsum และล่าสุดกว่านั้น คือเมื่อซอฟท์แวร์การทำสื่อสิ่งพิมพ์ (Desktop Publishing) อย่าง Aldus PageMaker ได้รวมเอา Lorem Ipsum เวอร์ชั่นต่างๆ เข้าไว้ในซอฟท์แวร์ด้วย
          </Text>
        </View>
      </ScrollView>
    )
  }
});

var styles = StyleSheet.create({
  scene: {
    flex: 1,
    //top: 45,
    backgroundColor: '#EAEAEA',
  },
  carosel: {
    width: screen.width,
    height: 245,
    //backgroundColor: 'white'
  },
  image: {
    height: 240,
    resizeMode: Image.resizeMode.cover,
  },
  likeContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  like: {
    color: 'white',
  },
  priceTagContainer: {
    position: 'absolute',
    top: 190,
    left: 0,
    backgroundColor: '#19CAB6',
    padding: 5,
    shadowColor: 'black',
    shadowOffset: {height: 2, width: 1  },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  priceTagText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },
  addressContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {height: 2, width: 1  },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  addressText: {
    color: '#666'
  },
  mapIcon: {
    marginRight: 5,
    color: '#666'
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  specIconBoxContainer: {
    padding: 20,
    justifyContent: 'center',
  },
  specIcon: {
    color: '#666',
    flex: 1,
    alignSelf: 'center',
  },
  specValue: {
    color: '#666',
    textAlign: 'center',
    fontSize: 19,
  },
  specLabel: {
    color: '#666',
    textAlign: 'center',
    fontSize: 12
  },
  descContainer: {
    padding: 20,
    marginBottom: 50
  },
  descLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666'
  },
  descText: {
    color: '#666',
    //fontFamily: 'BangnaNew',
    fontWeight: '200',
    fontSize: 12
  }
});
