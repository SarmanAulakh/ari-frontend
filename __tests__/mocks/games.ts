import { Game } from 'types/game';

export const getAllGamesValid: Game[] = [
  {
    gameId: 'portal-dogs',
    displayName: 'Portal Dogs',
    coverImage: 'https://storage.googleapis.com/ari-game-images/portal-dogs/cover.png',
    tags: ['Arcade', 'Single-Player'],
    price: {
      USD: 1.5,
    },
    description:
      'As king of the dogs, your mission is to find all your loyal subjects and guide them to the portal. The second you wake up another dog, he will simultaneously follow your movements. You succeed by finding your way to the portal. You are mastering the mission if you save all your loyal subjects, find the golden bone and get to the portal.',
    platforms: ['Windows', 'MacOS'],
    released: true,
    rating: 4,
    company: 'Brain Connected',
    esrbRating: 'E',
    sold: 5,
    countLimit: 10,
  },
  {
    gameId: 'test-game',
    displayName: 'Test Game',
    coverImage: 'https://storage.googleapis.com/ari-game-images/games/fallout-76/fallout-76-large.webp',
    tags: ['FPS'],
    price: {
      USD: 1.5,
    },
    description: 'test',
    platforms: ['windows'],
    released: true,
    rating: 4,
    company: 'test company',
    sold: 5,
    countLimit: 10,
  },
];
