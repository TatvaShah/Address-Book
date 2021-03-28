import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import UserDetailPage from '../../../pages/users/detail';
import UserDetailView from '../../../__view__/users/detail.view';
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('User Detail Page', () => {
  it('render user details on navigating to any user', () => {
    useSelector.mockImplementation((selector) => selector({
      user: {
        activeUser: {
          name: {
            title: 'Mr',
            first: 'Richie',
            last: 'Rich'
          },
          email: 'richie@test.com',
          phone: '91919191919',
          picture: {
            large: ''
          }
        }
      },
      app: {
        appLoading: false
      }
    }));
    const view = renderView();
    expect(view.container).toBeInTheDocument();
    expect(view.userProfile).toBeInTheDocument();
  });

  it('User can navigate to home page on click of back button', () => {
    useSelector.mockImplementation((selector) => selector({
      user: {
        activeUser: {
          name: {
            title: 'Mr',
            first: 'Richie',
            last: 'Rich'
          },
          email: 'richie@test.com',
          phone: '91919191919',
          picture: {
            large: ''
          }
        }
      },
      app: {
        appLoading: false
      }
    }));
    const view = renderView();
    expect(view.backButton).toBeInTheDocument();
    fireEvent.click(view.backButton);
  });

  it('User can navigate back to home if invalid user id passed to url', () => {
    useSelector.mockImplementation((selector) => selector({
      user: {
        activeUser: null
      },
      app: {
        appLoading: false
      }
    }));
    renderView();
  });
});

const renderView = () => {
  const dom = render(<UserDetailPage />)
  return new UserDetailView(dom);
};