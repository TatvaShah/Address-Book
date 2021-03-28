import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setActiveUser } from '../../redux/actions/userActions';
import { Loader } from '../../common/components';
import { getInitals } from '../../helper';

function Users() {
  const history = useHistory();
  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.app.appLoading);

  const goToUser = (user) => {
    dispatch(setActiveUser(user));
    history.push('/users/' + user.login.uuid);
  }

  return (
    <Loader loading={isLoading}>
      <h1 className="text-center">Address book</h1>
      <div className="user" data-testid="userListContainer">
        <div className="user-list">
          {users.map((user, index) => {
            const profileUrl = user.picture.thumbnail || "";
            const userName = `${user.name.title}. ${user.name.first} ${user.name.last}`;
            let initals = "";
            if (!profileUrl) { initals = getInitals(`${user.name.first} ${user.name.last}`) };

            return (
              <div key={index} data-testid={`userListContainer-user-${index}`} className="bg-gradient-info  user-list-item" onClick={() => goToUser(user)}>
                {(
                  profileUrl
                    ? <img className="user-list-item_profile" src={profileUrl} alt={userName} />
                    : <span className="user-list-item_profile--avtar">{initals}</span>
                )}
                <span className="user-list-item_username">{userName}</span>
              </div>
            )
          })}
        </div>
      </div>
    </Loader>
  );
}

export default Users;