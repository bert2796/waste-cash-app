import React from 'react';
import { TextInput } from 'react-native-paper';

import { Input } from '../Input/Input';

type Props = React.ComponentProps<typeof Input>;

export const PasswordInput: React.FC<Props> = ({ ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const handlePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  return (
    <Input
      label="Password"
      placeholder="Your Password"
      right={
        <TextInput.Icon
          name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
          onPress={handlePasswordVisibility}
        />
      }
      secureTextEntry={!isPasswordVisible}
      {...props}
    />
  );
};
