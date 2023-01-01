import ConfigProvider from "./config";
import PomodoroProvider from "./pomodoro";
import { IProvider } from "../interfaces";

const Provider = ({ children }: IProvider) => {
  return (
    <ConfigProvider>
      <PomodoroProvider>{children}</PomodoroProvider>
    </ConfigProvider>
  );
};

export default Provider;
