import { Colors } from '@ari/ui-components';

interface Props {
  color?: string | any;
  children?: string;
}

export default function TextGradient({ color = Colors.PRIMARY_GRADIENT, children }: Props) {
  return (
    <span
      style={
        {
          background: color,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          MozBackgroundClip: 'text',
          MozTextFillColor: 'transparent',
        } as any
      }
    >
      {children}
    </span>
  );
}
