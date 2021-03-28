import { queryByTestId } from "@testing-library/react";

export default class UserDetailView {
  constructor(dom) {
    this.dom = dom;
  }

  get container() {
    return queryByTestId(this.dom.container, "userDetailContainer");
  }

  get backButton() {
    return queryByTestId(this.dom.container, "userDetailContainer-back-btn");
  }

  get userProfile() {
    return queryByTestId(this.dom.container, "userDetailContainer-profile");
  }
}