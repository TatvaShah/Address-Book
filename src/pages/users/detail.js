import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Loader } from '../../common/components';
import { getInitals } from '../../helper';
import { setActiveUser } from '../../redux/actions/userActions';

function UserDetail() {
  const history = useHistory();
  const activeUser = useSelector(state => state.user.activeUser);
  const isLoading = useSelector(state => state.app.appLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!activeUser) { // then redirect to users list
      history.push('/');
    }
  }, []);

  const goBackToUserList = () => {
    dispatch(setActiveUser(null));
    history.push('/users');
  }

  const profileUrl = activeUser?.picture.large || "";
  const userName = `${activeUser?.name.title}. ${activeUser?.name.first} ${activeUser?.name.last}`;
  let initals = "";
  if (!profileUrl) { initals = getInitals(`${activeUser?.name.first} ${activeUser?.name.last}`) };

  return (
    <Loader loading={isLoading}>
      <div className="user-detail" data-testid="userDetailContainer">
        <span className="user-detail-item_link mdi mdi-arrow-left-circle mdi-36px" title="Back to all users" data-testid="userDetailContainer-back-btn" onClick={() => goBackToUserList()} />
        <div className="user-detail-item">
          {(
            profileUrl
              ? <img data-testid="userDetailContainer-profile" className="user-detail-item_profile" src={profileUrl} alt={userName} />
              : <span data-testid="userDetailContainer-profile" className="user-detail-item_profile--avtar">{initals}</span>
          )}
          <h2 className="user-detail-item_username">{userName}</h2>
          <span className="user-detail-item_info d-flex">
            <span className="mdi mdi-email mdi-24px mr-1"></span>
            {activeUser?.email}
          </span>
          <span className="user-detail-item_info d-flex">
            <span className="mdi mdi-phone mdi-24px mr-1"></span>
            {activeUser?.phone}
          </span>
        </div>
      </div>
    </Loader>
  );
}

export default UserDetail;