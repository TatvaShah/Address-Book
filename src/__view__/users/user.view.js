import { queryByTestId } from "@testing-library/react";

export default class UserView {
  constructor(dom) {
    this.dom = dom;
  }

  get container() {
    return queryByTestId(this.dom.container, "userListContainer");
  }

  get containerLoading() {
    return queryByTestId(this.dom.container, "loading");
  }

  get user() {
    return queryByTestId(this.dom.container, "userListContainer-user-0");
  }
}