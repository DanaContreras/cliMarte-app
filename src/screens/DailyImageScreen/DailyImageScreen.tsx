import React, {useState} from 'react';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, SIZES} from '../../constans/theme';
import {Header} from '../../components/Header/Header';
import {ICON_NAME, SCREEN_OPTION} from '../../constans/constans';
import {StackScreenProps} from '@react-navigation/stack';
import {ActivityIndicator, Alert, FlatList, Image, Pressable, Text, View} from 'react-native';
import {CommentView} from '../../components/CommentView/CommentView';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from '@rneui/base';
import { CommentModal } from '../../components/CommentModal/CommentModal';
import { useDailyImageViewModel } from '../../viewModels/useDailyImageViewModel';
import { useCommentsViewModel } from '../../viewModels/useCommentsViewModel'

interface Props extends StackScreenProps<any, any> {}

export const DailyImageScreen = ({navigation}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { dailyImage, loading, error, warning } = useDailyImageViewModel();
  const { comments, handleAddComment } = useCommentsViewModel();

  const ImgInfoView = () => {
    return(
      <View style={styles.container}>
        <Header
          title={SCREEN_OPTION.dailyImg}
          onPress={() => navigation.goBack()}
        />
        {error?
          <View style={styles.containerErrorText}>
            <Text style={[FONTS.h3, styles.errorText]}>{error}</Text>
            <View style={styles.errorIcon}>
              <IconMC
                name={ICON_NAME.alien}
                color={COLORS.lightOrange}
                size={SIZES.bigIcon}
              />
            </View>
          </View>
          :
          <View>
            <View style={styles.containerInfo}>
              {warning &&
                <View style={styles.warningContainer}>
                  <Text style={[FONTS.h3, {color: 'white'}]}>{warning}</Text>
                </View>
              }
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
                {!warning &&
                  <Icon
                    name={ICON_NAME.add}
                    color={COLORS.lightOrange}
                    size={SIZES.icon1}
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                }
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
        ListHeaderComponent={loading? <ActivityIndicator size='large' style={styles.actIndicator} color={COLORS.white} /> : <ImgInfoView />}
        data={comments}
        renderItem={({item}) => (
          <CommentView
            name={item.userName}
            date={new Date(item.date)}
            comment={item.comment}
          />
        )}
        ListEmptyComponent={!error && <Text style={[FONTS.h3, styles.noCommentsText]}>No hay comentarios aún</Text>}
        ItemSeparatorComponent={() => <Divider style={styles.divider}/>}
      />
    </LinearGradient>
  );
};
