import React from 'react';
import { fireEvent, render, waitFor, act } from '@testing-library/react';
import { useSelector } from 'react-redux';
import UsersPage from '../../../pages/users';
import UserView from '../../../__view__/users/user.view';

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

const mockUserListResponse = {
  "results": [
    {
      "gender": "male",
      "name": {
        "title": "Mr",
        "first": "Johan",
        "last": "Pedersen"
      },
      "location": {
        "street": {
          "number": 3675,
          "name": "Norgesvej"
        },
        "city": "Brondby",
        "state": "Midtjylland",
        "country": "Denmark",
        "postcode": 25456,
        "coordinates": {
          "latitude": "-29.3317",
          "longitude": "-57.6591"
        },
        "timezone": {
          "offset": "+1:00",
          "description": "Brussels, Copenhagen, Madrid, Paris"
        }
      },
      "email": "johan.pedersen@example.com",
      "login": {
        "uuid": "6b759272-823e-4241-83be-eea3966924c4",
        "username": "redwolf902",
        "password": "christia",
        "salt": "Hkn5jsdd",
        "md5": "977e7e73066f71aa6b598f65303c0096",
        "sha1": "513fd2bf4eb176cc0fb26a4ffaad24b88eff5397",
        "sha256": "a7556cc4cb7279de56e6adbcd0d5e68fcc6fd45f4fdc36ea32263eee36763feb"
      },
      "dob": {
        "date": "1993-06-04T11:48:02.869Z",
        "age": 28
      },
      "registered": {
        "date": "2013-10-16T21:32:07.505Z",
        "age": 8
      },
      "phone": "63451283",
      "cell": "26206284",
      "id": {
        "name": "CPR",
        "value": "040693-3534"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/24.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/24.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/24.jpg"
      },
      "nat": "DK"
    }
  ],
  "info": {
    "seed": "178b6d3760031b13",
    "results": 20,
    "page": 1,
    "version": "1.3"
  }
};

const mockUserListPromise = Promise.resolve(mockUserListResponse);
const mockUserPromise = Promise.resolve(mockUserListResponse.results[0]);

jest.mock('../../../redux/actions/userActions', () => ({
  getAllUsers: jest.fn().mockImplementation(() => mockUserListPromise),
  setActiveUser: jest.fn().mockImplementation(() => mockUserPromise),
}));


describe('User Listing Page', () => {
  let api;
  beforeAll(() => {
    api = jest.requireMock('../../../redux/actions/userActions');
  });

  it('When fetching users, loader should be visible', () => {
    useSelector.mockImplementation((selector) => selector({
      user: {
        users: []
      },
      app: {
        appLoading: true
      }
    }));
    const view = renderView();
    expect(view.containerLoading).toBeInTheDocument();
  });

  it('Users API must called once', async () => {
    renderView();
    await act(() => api.getAllUsers())
    await waitFor(() => expect(api.getAllUsers).toHaveBeenCalled());
  });

  it('After fetching users, the user list should be visible', () => {
    useSelector.mockImplementation((selector) => selector({
      user: {
        users: []
      },
      app: {
        appLoading: false
      }
    }));
    const view = renderView();
    expect(view.container).toBeInTheDocument();
  });

  it('redicrect to user detail page by clicking user from list ', () => {
    useSelector.mockImplementation((selector) => selector({
      user: {
        users: mockUserListResponse.results,
      },
      app: {
        appLoading: false
      }
    }));
    const view = renderView();
    expect(view.user).toBeInTheDocument();
    fireEvent.click(view.user);
  });
});


const renderView = () => {
  const dom = render(<UsersPage />)
  return new UserView(dom);
};