export interface IProvider {
    children: React.ReactNode;
}
export interface IContextConfig {
    workingMinutes: string | undefined | null;
    restingMinutes: string | undefined | null;
    quantityOfCycles: string | undefined | null;
    title: string;
    setWorkingMinutes: (param: string) => void;
    setRestingMinutes: (param: string) => void;
    setQuantityOfCycles: (param: string) => void;
    setTitle: (param: string) => void;
    verifyValidation: ()=> boolean | "" | null | undefined;
  }
export interface IPomodoro {
    started: boolean;
    alreadyStarted: boolean;
    cyclesMade: number;
    restTime: boolean;
    workingSeconds: number;
    setStarted: (param: boolean) => void;
    setAlreadyStarted: (param: boolean) => void;
    setCyclesMade: (param: number) => void;
    setRestTime: (param: boolean) => void;
    setWorkingSeconds: (param: number) => void;
    restart: (param:number) => void;
}
export interface workMemoryParam {
    title?: String;
    workingMinutes: number;
    cycles: number ;
    timeFinished: string;
}
  
export interface ISetHistoryMemory {
    title: String | undefined;
    workingMinutes: number;
}
  
export interface historyMemory {
    date: string;
    works: workMemoryParam[];
}

export interface IDialogAlert {
    handleClose: () => void;
    open: boolean;
    handleConfirm: () => void;
  }