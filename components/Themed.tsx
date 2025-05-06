import { Text as DefaultText, View as DefaultView, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: DefaultText['props']) {
  const { style, ...otherProps } = props;
  const color = useThemeColor({}, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: DefaultView['props']) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor({}, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
} 