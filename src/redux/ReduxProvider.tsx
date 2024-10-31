"use client"; // This component is a Client Component

import { Provider } from "react-redux";
import store from "@/redux/store";

const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
