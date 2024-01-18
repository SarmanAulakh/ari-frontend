import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Typography, Stack, CardContent, Card } from '@mui/material';
import { shortenAddress } from '@icari-io/ui-components';

interface GameCardProps {
  id: string | number;
  name: string;
  image: string;
  imageAlt: string;
}

function UserGameCard({ id, name, image, imageAlt }: GameCardProps) {
  return (
    <Card>
      <Link href={`/game/${id}`}>
        <a>
          <Image src={image} width={500} height={450} alt="t" layout="responsive" />
        </a>
      </Link>
      <CardContent>
        <Link href={`/game/${id}`}>
          <a>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: '600',
                textTransform: 'none',
              }}>
              {name}
            </Typography>
          </a>
        </Link>
      </CardContent>
    </Card>
  );
}

export default memo(UserGameCard);
