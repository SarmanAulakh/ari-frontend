import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Tag } from '@icari-io/ui-components';
import { Typography, Stack, CardContent, Card, useTheme } from '@mui/material';
import { FaWindows, FaApple } from 'react-icons/fa';
import { PaymentType } from 'types/game';
import styles from './Card.module.css';

interface GameCardProps {
  id: string | number;
  name: string;
  price?: PaymentType;
  image: string;
  imageAlt: string;
  platforms: string[];
  discountPercent: number | null;
}

function supportsPlatform(supportedPlatforms: string[], platform: string) {
  return supportedPlatforms.indexOf(platform) > -1;
}

function GameCard({ id, name, price, image, imageAlt, platforms, discountPercent }: GameCardProps) {
  const theme = useTheme();
  const darkMode = theme.palette.mode === 'dark';
  return (
    <Card>
      <Link href={`/game/${id}`}>
        <a>
          <div className={styles['card-image']}>
            <Image src={image} width={500} height={450} alt="t" layout="responsive" />
            <Stack className={styles['platforms']} direction="row" spacing={2}>
              {supportsPlatform(platforms, 'Windows') && <FaWindows fontSize={24} />}
              {supportsPlatform(platforms, 'MacOS') && <FaApple fontSize={24} />}
            </Stack>
            {discountPercent && <Tag className={styles['tl-tag']} label={`${discountPercent}% off`} />}
          </div>
        </a>
      </Link>
      <CardContent sx={{ backgroundColor: darkMode ? '#121212' : 'rgba(0, 0, 0, 0.1)' }}>
        <Link href={`/game/${id}`}>
          <a>
            <Typography
              sx={{
                marginBottom: '8px',
                marginTop: '0px',
                fontSize: '16px',
                fontWeight: '600',
                lineHeight: '1.5',
                textTransform: 'none',
              }}
            >
              {name}
            </Typography>
          </a>
        </Link>
        <Typography variant="h5" color="primary.contrastText" lineHeight="25px">
          {price && `$ ${price.USD}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default memo(GameCard);
