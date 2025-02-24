import React from 'react';
import {View, Text, ScrollView, Linking, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../../constans/theme';
import {AnimatedLogo} from '../../components/AnimatedLogo/AnimatedLogo';
import {Header} from '../../components/Header/Header';
import {StackScreenProps} from '@react-navigation/stack';
import {SCREEN_NAV} from '../../constans/constans';
import {Footer} from '../../components/Footer/Footer';
import {
  apod,
  apodLink,
  insight,
  insightLink,
  moreInfo,
  placeAnswer,
  placeQuestion,
  solAnswer,
  solQuestion,
  welcomeInfo,
  welcomeTo,
} from '../../constans/information';

interface Props extends StackScreenProps<any, any> {}

interface LinkTextProps {
  text: string;
  url: string;
}

export const AboutUsScreen = ({navigation}: Props) => {
  const LinkText = ({text, url}: LinkTextProps) => {
    const handlePress = () => {
      Linking.openURL(url);
    };
    return (
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.linkText}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  const InformationView = ({question, answer}) => {
    return (
      <View style={styles.questionContainer}>
        <Text style={FONTS.h2}>{question}</Text>
        <Text style={FONTS.body}>{answer}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[COLORS.darkBlue, COLORS.orange]}
        start={{x: 0.5, y: 0.5}}
        style={styles.linearGradient}>
        <Header title="" onPress={() => navigation.navigate(SCREEN_NAV.home)} />
        <View style={styles.infoContainer}>
          <Text style={FONTS.h1}>{welcomeTo}</Text>
          <AnimatedLogo height={200} width={200} autoplay loop />
          <Text style={FONTS.body}>{welcomeInfo}</Text>
          <Text style={FONTS.body}>{moreInfo}</Text>
          <LinkText text={apod} url={apodLink} />
          <LinkText text={insight} url={insightLink} />
          <View style={styles.divider} />
          <InformationView question={solQuestion} answer={solAnswer} />
          <InformationView question={placeQuestion} answer={placeAnswer} />
          <View style={styles.divider} />
        </View>
        <Footer />
      </LinearGradient>
    </ScrollView>
  );
};
