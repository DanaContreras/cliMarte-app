import React, {useState} from 'react';
import {Alert, Modal, Pressable, TextInput, View} from 'react-native';
import {styles} from './styles';
import {Text} from 'react-native';
import {
  BUTTON_OPTION,
  COMMENT_OPTION,
  ICON_NAME,
  SCREEN_OPTION,
} from '../../constans/constans';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, SIZES} from '../../constans/theme';
import CustomButton from '../CustomButton/CustomButton';
import {CustomInput} from '../CustomInput/CustomInput';
import {Field, Formik, FormikValues} from 'formik';
import * as yup from 'yup';

interface Props {
  visible: boolean;
  onRequestClose: () => void;
}

// Interfaz para manejar los datos del formulario.
interface FormData {
  name: string;
  email: string;
  comment: string;
}

export const CommentModal = ({visible, onRequestClose}: Props) => {

  // Verificacion de cada input dentro del formulario
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .required('Campo requerido'),
    email: yup
      .string()
      .email('Ingrese un email válido')
      .required('Campo requerido'),
    comment: yup
      .string()
      .min(20, 'El comentario debe tener al menos 20 caracteres')
      .required('Campo requerido'),
  });

  const handleSubmit = (values: FormikValues) => {
    // TODO: Agregar la logica del POST
    onRequestClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
      style={styles.modal}>
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <View style={styles.iconContainer}>
              <Icon
                name={ICON_NAME.close}
                color={COLORS.white}
                size={SIZES.icon1}
                onPress={onRequestClose}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={[FONTS.h1]}>{SCREEN_OPTION.comment}</Text>
            </View>
          </View>

          <Formik
            initialValues={{
              name: '',
              email: '',
              comment: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({handleSubmit, isValid}) => (
              <View style={styles.inputContainer}>
                <Field
                  component={CustomInput}
                  name="name"
                  inputProps={{
                    placeholder: COMMENT_OPTION.name,
                    placeholderTextColor: COLORS.black,
                    maxLength: 15,
                  }}
                />
                <Field
                  component={CustomInput}
                  name="email"
                  inputProps={{
                    placeholder: COMMENT_OPTION.mail,
                    placeholderTextColor: COLORS.black,
                    keyboardType: 'email-address',
                  }}
                />
                <Field
                  component={CustomInput}
                  name="comment"
                  inputProps={{
                    placeholder: COMMENT_OPTION.comment,
                    placeholderTextColor: COLORS.black,
                    maxLength: 625,
                    multiline: true,
                  }}
                  comment
                />

                <View style={styles.buttonContainer}>
                  <CustomButton
                    text={BUTTON_OPTION.publish}
                    onPress={handleSubmit}
                    disable={!isValid}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};
