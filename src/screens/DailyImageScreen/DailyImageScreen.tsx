import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, SIZES} from '../../constans/theme';
import {Header} from '../../components/Header/Header';
import {ICON_NAME, SCREEN_NAV, SCREEN_OPTION} from '../../constans/constans';
import {StackScreenProps} from '@react-navigation/stack';
import {ActivityIndicator, Alert, FlatList, Image, Pressable, Text, View} from 'react-native';
import {CommentView} from '../../components/CommentView/CommentView';
import Icon from 'react-native-vector-icons/Ionicons';
import {Modal} from 'react-native';
import { Divider } from '@rneui/base';
import { CommentModal } from '../../components/CommentModal/CommentModal';
import { useDailyImageViewModel } from '../../viewModels/useDailyImageViewModel';
import { useCommentsViewModel } from '../../viewModels/useCommentsViewModel'

interface Props extends StackScreenProps<any, any> {}

export const DailyImageScreen = ({navigation}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { dailyImage, loading, error } = useDailyImageViewModel();
  const { comments, handleAddComment } = useCommentsViewModel();

  if (error) {
      return <Text>Error: {error}</Text>;
  }

  if (!dailyImage) {
    return <Text>No hay datos disponibles.</Text>; // O puedes mostrar un mensaje diferente
  }

  const getTimeAgo = (commentDate: Date): string => {
    const now = new Date();
    const elapsed = now.getTime() - commentDate.getTime();
    const minutes = Math.floor(elapsed / (1000 * 60));
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(elapsed / (1000 * 60 * 60 * 24 * 7));
    const months = Math.floor(elapsed / (1000 * 60 * 60 * 24 * 30.44));
    const years = Math.floor(elapsed / (1000 * 60 * 60 * 24 * 365.25));

    if (minutes < 1) {
        return 'Hace unos segundos';
    } else if (minutes < 60) {
        return 'Hace unos minutos';
    } else if (hours < 24) {
        return 'Hace unas horas';
    } else if (days < 7) {
        return days === 1 ? 'Hace un día' : 'Hace unos días';
    } else if (weeks < 4) {
        return weeks === 1 ? 'Hace una semana' : 'Hace unas semanas';
    } else if (months < 12) {
        return months === 1 ? 'Hace un mes' : 'Hace unos meses';
    } else {
        return years === 1 ? 'Hace un año' : 'Hace mucho tiempo';
    }
};

  const ImgInfoView = () => {
    return(
      <View style={styles.container}>
        <Header
          title={SCREEN_OPTION.dailyImg}
          onPress={() => navigation.goBack()}
        />
        {loading?
          <ActivityIndicator size="large" color={COLORS.white} />
          :
          <View>
            <View style={styles.containerInfo}>
              <Text style={[FONTS.h2, styles.titleText]}>"{dailyImage.title}"</Text>
              <View style={styles.containerImg}>
                {dailyImage.mediaType == 'image'?
                  <Image
                  source={require('../../assets/images/imagenMarte1.jpg')}
                  style={styles.img}
                  /> :
                  <Image
                  source={{ uri: dailyImage.url }}
                  style={styles.img}
                  />
                }
              </View>
              <View style={styles.containerInfoText}>
                <Text style={[FONTS.body, styles.infoText]}>{dailyImage.explanation}</Text>
              </View>
            </View>
            <View style={styles.containerComment}>
              <View style={styles.comment}>
                <Text style={FONTS.h2}>{comments.length} Comentarios</Text>
                <Icon
                  name={ICON_NAME.add}
                  color={COLORS.lightOrange}
                  size={SIZES.icon1}
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </View>
            </View>
          </View>
        }
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
        onAddComment={handleAddComment}
      />
      <FlatList
        ListHeaderComponent={loading? <ActivityIndicator size="large" color={COLORS.white} /> : <ImgInfoView />}
        data={comments}
        renderItem={({item}) => (
          <CommentView
            name={item.userName}
            date={getTimeAgo(new Date(item.date))}
            comment={item.comment}
          />
        )}
        ListEmptyComponent={<Text style={[FONTS.h3, styles.noCommentsText]}>No hay comentarios aún</Text>}
        ItemSeparatorComponent={() => <Divider style={styles.divider}/>}
      />
    </LinearGradient>
  );
};
