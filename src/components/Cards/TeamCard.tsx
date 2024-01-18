import { Stack } from '@mui/material';
import Image from 'next/image';
import TextGradient from '../TextGradient';

interface CardProps {
  firstName: string;
  lastName: string;
  title: string;
  img: string;
  blurb: string;
  linkedInUrl?: string;
  height?: number;
}

export default function TeamCard({ firstName, lastName, img, title, blurb, height }: CardProps) {
  return (
    <div
      style={{
        width: 350,
        backgroundColor: 'rgba(235,237,240,0.1)',
        padding: 10,
        borderRadius: 15,
      }}
    >
      <Stack direction="row">
        <Image src={img} alt="" width={80} height={80} style={{ marginRight: 20, borderRadius: 15 }} />
        <Stack direction="column" gap={0} textAlign="left" ml={2}>
          <p style={{ marginTop: 5, marginBottom: 0, fontSize: 22 }}>
            <TextGradient>{firstName}</TextGradient> {lastName}
          </p>
          <p style={{ marginTop: 0, fontSize: 20 }}>{title}</p>
        </Stack>
      </Stack>
      <p style={{ textAlign: 'left' }}>{blurb}</p>
    </div>
  );
}
