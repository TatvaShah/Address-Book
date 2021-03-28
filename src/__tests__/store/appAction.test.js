import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as appActions from '../../redux/actions/appActions';
import reducers from '../../redux/reducers';

const middlewares = [thunk];
const createStore = configureMockStore(middlewares);
const store = createStore(reducers.app);

describe('App actions', () => {

  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('Dispatches loading while fetching users', () => {
    fetchMock.getOnce('/appActions',
      {
        body: {},
      })
    store.dispatch(appActions.startAppLoading())
    store.dispatch(appActions.stopAppLoading())
  })
})