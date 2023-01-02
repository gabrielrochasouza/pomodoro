import { ISetHistoryMemory, historyMemory, workMemoryParam } from '../interfaces';

export const setInHistoryMemory = ({title= 'Atividade', workingMinutes}:ISetHistoryMemory ) => {
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
        const work: workMemoryParam | undefined =
          alreadyThereIsADate.works?.find(
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
  