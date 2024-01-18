import { memo } from 'react';
import { Paper, Typography, useTheme } from '@mui/material';

// icons
import BaseballIcon from 'src/assets/icons/category/baseball.svg';
import ContollerIcon from 'src/assets/icons/category/controller.svg';
import GunIcon from 'src/assets/icons/category/gun.svg';
import RetroHandheldIcon from 'src/assets/icons/category/retro-handheld.svg';
import Image from 'next/image';
import { Box } from '@mui/system';

import { GenreList } from 'types/game';
import { Genres } from 'constants/game';

// same order as categories
const icons = {
  [Genres.ACTION]: ContollerIcon,
  [Genres.FPS]: RetroHandheldIcon,
  [Genres.RPG]: GunIcon,
  [Genres.STRATEGY]: BaseballIcon,
} as const;

interface CategoryCardProps {
  category: GenreList;
  filter: GenreList | null;
  onClick: any;
}

function CategoryCard({ category, filter, onClick }: CategoryCardProps) {
  const theme = useTheme();
  const darkMode = theme.palette.mode === 'dark';
  const active = filter === category;

  const toggleActive = () => {
    if (active) {
      onClick(null);
    } else {
      onClick(category);
    }
  };

  return (
    <Box onClick={toggleActive}>
      <Paper
        sx={[
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: 250,
            background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
            borderRadius: 2,
            '&:hover': {
              cursor: 'pointer',
            },
          },
          active && {
            background: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.4)',
          },
        ]}
      >
        <Image src={icons[category]} alt={`${category} icon`} />
        <Typography variant="h5" margin="20px 0px 5px 0px">
          {category}
        </Typography>
      </Paper>
    </Box>
  );
}

export default memo(CategoryCard);
