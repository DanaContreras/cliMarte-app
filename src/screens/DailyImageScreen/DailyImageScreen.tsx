import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, SIZES} from '../../constans/theme';
import {Header} from '../../components/Header/Header';
import {ICON_NAME, SCREEN_NAV, SCREEN_OPTION} from '../../constans/constans';
import {StackScreenProps} from '@react-navigation/stack';
import {Alert, FlatList, Image, Pressable, Text, View} from 'react-native';
import {CommentView} from '../../components/CommentView/CommentView';
import Icon from 'react-native-vector-icons/Ionicons';
import {Modal} from 'react-native';
import { Divider } from '@rneui/base';
import { CommentModal } from '../../components/CommentModal/CommentModal';

interface Props extends StackScreenProps<any, any> {}

const data = {
  id: 1,
  title: 'Moon Pi and Mountain Shadow, the man in the moon',
  info: "What phase of the Moon is 3.14 radians from the Sun? The Full Moon, of course. Even though the Moon might look full for several days, the Moon is truly at its full phase when it is Pi radians (aka 180 degrees) from the Sun in ecliptic longitude. That's opposite the Sun in planet Earth's sky. Rising as the Sun set on March 9, 2020, only an hour or so after the moment of its full phase, this orange tinted and slightly flattened Moon still looked full. It was photographed opposite the setting Sun from Teide National Park on the Canary Island of Tenerife.",
  img: require('../../assets/images/imagenMarte1.jpg'),
};

const comment = [
  {
    id: 1,
    name: 'Dana Contreras',
    mail: 'example@gmail.com',
    comment: 'This image is amazing!!! I want to see the next one.',
    date: '13/03/2024',
  },
  {
    id: 2,
    name: 'Dana Contreras',
    mail: 'example@gmail.com',
    comment: 'This image is amazing!!! I want to see the next one.',
    date: '13/03/2024',
  },
  {
    id: 3,
    name: 'Dana Contreras',
    mail: 'example@gmail.com',
    comment: 'This image is amazing!!! I want to see the next one.',
    date: '13/03/2024',
  },
  {
    id: 4,
    name: 'Dana Contreras',
    mail: 'example@gmail.com',
    comment: 'This image is amazing!!! I want to see the next one.',
    date: '13/03/2024',
  },
];

export const DailyImageScreen = ({navigation}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const ImgInfoView = () => {
    return(
      <View style={styles.container}>
        <Header
          title={SCREEN_OPTION.dailyImg}
          onPress={() => navigation.navigate(SCREEN_NAV.home)}
        />
        <View style={styles.containerInfo}>
          <Text style={[FONTS.h2, styles.titleText]}>"{data.title}"</Text>
          <View style={styles.containerImg}>
            <Image
              source={require('../../assets/images/imagenMarte1.jpg')}
              style={styles.img}
            />
          </View>
          <View style={styles.containerInfoText}>
            <Text style={[FONTS.body, styles.infoText]}>{data.info}</Text>
          </View>
        </View>
        <View style={styles.containerComment}>
          <View style={styles.comment}>
            <Text style={FONTS.h2}>{comment.length} Comentarios</Text>
            <Icon
              name={ICON_NAME.add}
              color={COLORS.lightOrange}
              size={SIZES.icon1}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </View>
    )
  };

  return (
    <LinearGradient
      colors={[COLORS.darkBlue, COLORS.orange]}
      start={{x: 0.5, y: 0.5}}
      style={styles.linearGradient}
    >
      <CommentModal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      />
      <FlatList
        ListHeaderComponent={<ImgInfoView />}
        data={comment}
        renderItem={({item}) => (
          <CommentView
            name={item.name}
            date={item.date}
            comment={item.comment}
          />
        )}
        ListEmptyComponent={<Text style={[FONTS.h3, styles.noCommentsText]}>No hay comentarios aún</Text>}
        ItemSeparatorComponent={() => <Divider style={styles.divider}/>}
      />
    </LinearGradient>
  );
};
