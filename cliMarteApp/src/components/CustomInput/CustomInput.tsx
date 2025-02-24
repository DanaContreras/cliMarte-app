import React from 'react';
import {Text, TextInput, TextInputProps, View} from 'react-native';
import {styles} from './styles';
import {COLORS, FONTS} from '../../constans/theme';
import {FieldProps} from 'formik';

interface Props extends FieldProps {
  inputProps: TextInputProps;
  comment?: boolean;
}

export const CustomInput = ({field, form, inputProps, comment}: Props) => {
  const {name, onBlur, onChange, value} = field;
  const {errors, touched, setFieldTouched} = form;

  const hasError = errors[name] && touched[name];

  return (
    <View style={styles.container}>
      <TextInput
        style={[comment ? styles.inputComment : styles.input]}
        value={value}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        underlineColorAndroid={COLORS.transparent}
        {...inputProps}
      />
      {hasError && (
        <Text style={[FONTS.error, styles.error]}>
          {errors[name] as string}
        </Text>
      )}
    </View>
  );
};
