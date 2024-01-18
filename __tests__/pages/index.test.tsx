import { render, screen } from '@testing-library/react'
import Home, { getServerSideProps } from 'src/pages/index'

import apiClient from 'src/util/apiClient';
import { getAllGamesValid } from '__tests__/mocks/games';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /Store/i, // i RegExp for case-insensitive match
    })

    expect(heading).toBeInTheDocument()
  });

  it('getServerSideProps returns the correct list of games from api', async () => {
    jest.spyOn(apiClient, 'get').mockImplementation(async () => ({
      data: getAllGamesValid
    }));

    const res = await getServerSideProps({} as any);

    expect(apiClient.get).toHaveBeenCalled();
    expect(res).toEqual({
      props: {
        games: getAllGamesValid
      }
    })
  })

  it('getServerSideProps returns undefined', async () => {
    jest.spyOn(apiClient, 'get').mockImplementation();

    const res = await getServerSideProps({} as any);

    expect(apiClient.get).toHaveBeenCalled();
    expect(res).toEqual({
      props: {
        games: null
      }
    })
  })

})