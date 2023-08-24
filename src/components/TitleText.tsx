import { Text } from '@mantine/core';
import { Title } from '../../types';

const TitleText = ({ title }: Title) => {
  return (
    <Text
      component="span"
      align="center"
      variant="gradient"
      gradient={{
        from: 'indigo',
        to: 'cyan',
        deg: 45,
      }}
      size="xl"
      weight={700}
      style={{
        fontFamily: 'Greycliff CF, sans-serif',
      }}
    >
      {title}
    </Text>
  );
};

export default TitleText;
