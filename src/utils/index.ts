import {
  ISetHistoryMemory,
  historyMemory,
  workMemoryParam,
} from "../interfaces";

export const setInHistoryMemory = ({
  title = "Atividade",
  workingMinutes,
}: ISetHistoryMemory) => {
  const arrayObjectToBeSaved: historyMemory[] = [
    {
      date: new Date().toLocaleDateString(),
      works: [
        {
          title,
          timeFinished: new Date().toLocaleTimeString(),
          workingMinutes,
          cycles: 1,
        },
      ],
    },
  ];
  if (localStorage.getItem("@history")) {
    const previousMemoryHistory: historyMemory[] =
      JSON.parse(localStorage.getItem("@history") || "") ||
      arrayObjectToBeSaved;
    const alreadyThereIsADate: historyMemory | undefined =
      previousMemoryHistory?.find(
        (memo: historyMemory): boolean =>
          memo.date === new Date().toLocaleDateString()
      );
    if (alreadyThereIsADate) {
      const work: workMemoryParam | undefined = alreadyThereIsADate.works?.find(
        (work: workMemoryParam): boolean =>
          work.title === title && work.workingMinutes === workingMinutes
      );
      if (work) {
        work.cycles++;
        work.timeFinished = new Date().toLocaleTimeString();
      } else {
        alreadyThereIsADate.works.push({
          title,
          timeFinished: new Date().toLocaleTimeString(),
          workingMinutes,
          cycles: 1,
        });
      }
      localStorage.setItem("@history", JSON.stringify(previousMemoryHistory));
    } else {
      previousMemoryHistory.push(arrayObjectToBeSaved[0]);
      localStorage.setItem("@history", JSON.stringify(previousMemoryHistory));
    }
  } else {
    localStorage.setItem("@history", JSON.stringify(arrayObjectToBeSaved));
  }
};

export const getDatesBefore30Days = () => {
  const milisecondsInADay = 24 * 60 * 60 * 1000;
  const milisecondsNow = new Date().valueOf();
  const resultArray = new Array(30).fill("");
  return resultArray
    .map((res: string, i: number) =>
      new Date(milisecondsNow - milisecondsInADay * i).toLocaleDateString()
    )
    .reverse();
};

export const notifyMe = (message: string) => {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification("Pomodoro", {
      body: message,
      icon: "https://img.icons8.com/color/48/null/clr_watch_2.png",
    });
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification("Pomodoro", {
          body: message,
          icon: "https://img.icons8.com/color/48/null/clr_watch_2.png",
        });
        // …
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
};
