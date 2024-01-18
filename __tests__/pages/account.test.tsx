import { render, screen } from '@testing-library/react';
import Account from 'src/pages/account';
import { Web3AuthContext } from 'src/services/auth';
import { userValid } from '__tests__/mocks/user';

// 2nd parm is a fn that returns the fn useMoralisCustom that contains the fn getNFTs
jest.mock("src/services/useMoralisCustom", () => () => ({
  getNFTs: jest.fn()
}));

describe('Account', () => {
  it('renders content correctly', () => {
    render(
      <Web3AuthContext.Provider value={{
        provider: null,
        user: '0x09750ad360fdb7a2ee2sarmc4503c974d86d8694',
        isLoading: false,
        initialized: true,
        login: jest.fn(),
        logout: jest.fn(),
        userDetails: userValid,
        setUserInfo: jest.fn(),
        getBalance: jest.fn(),
        signMessage: jest.fn(),
      }}>
        <Account />
      </Web3AuthContext.Provider>
    )

    const heading = screen.getByRole('heading');

    expect(heading.innerHTML).toEqual(userValid.name);
  });

});
