import { createContext, useContext } from "react";
import * as React from "react";
import { IContextConfig, IProvider } from "../../interfaces";

const ConfigContext = createContext<IContextConfig>({} as IContextConfig);

const ConfigProvider = ({ children }: IProvider) => {
  const [workingMinutes, setWorkingMinutes] = React.useState<
    string | undefined | null
  >(localStorage.getItem("@workingMinutes") || null);

  const [restingMinutes, setRestingMinutes] = React.useState<
    string | undefined | null
  >(localStorage.getItem("@restingMinutes") || null);

  const [quantityOfCycles, setQuantityOfCycles] = React.useState<
    string | undefined | null
  >(localStorage.getItem("@quantityOfCycles") || null);

  const [title, setTitle] = React.useState(
    localStorage.getItem("@title") || ""
  );

  const verifyValidation = () => {
    return (
      workingMinutes &&
      restingMinutes &&
      quantityOfCycles &&
      Number(workingMinutes) > 0 &&
      Number(restingMinutes) > 0 &&
      Number(quantityOfCycles) > 0
    );
  };
  return (
    <ConfigContext.Provider
      value={{
        workingMinutes,
        restingMinutes,
        quantityOfCycles,
        title,
        setWorkingMinutes,
        setRestingMinutes,
        setQuantityOfCycles,
        setTitle,
        verifyValidation,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;

export const useConfig = () => useContext(ConfigContext);
