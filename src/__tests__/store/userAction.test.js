import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as userActions from '../../redux/actions/userActions';
import reducers from '../../redux/reducers';

const middlewares = [thunk]
const createStore = configureMockStore(middlewares);
const store = createStore(reducers.user);

const response = [
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
];

describe('User actions', () => {

  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('Dispatches SET_USERS after fetching users', async () => {
    fetchMock.getOnce('/userActions',
      {
        body: { data: { results: response } },
      })


    const expectedActions_1 = [
      { type: 'START_APP_LOADING' },
      { type: 'SET_USERS', data: [] },
      { type: 'STOP_APP_LOADING' }
    ]
    store.dispatch(userActions.getAllUsers())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions_1)
      })
    store.dispatch(userActions.setUsers(response))
    store.dispatch(userActions.setActiveUser(response[0]))
  })
})