import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const imageCount = 10;
  const messages = [
    '今日も一日がんばるワン！',
    'いつでも君を応援しているワン！',
    '君ならできるワン！',
    '前向きに取り組むワン！',
    'どんな困難も乗り越えるワン！'
  ];
  const randomPickMessage = (): string => {
    const index = Math.floor(Math.random() * messages.length);
    return messages[index];
  };
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [imageNum, setImageNum] = useState<string>('');
  const [encourageMessage, setEncourageMessage] = useState<string>('');

  const getImageNum = (): void => {
    const random = Math.floor(Math.random() * imageCount);
    setImageNum(random.toString());
  };

  const getMessage = (): void => {
    setEncourageMessage(randomPickMessage());
  };

  const changeDate = (offset: number): void => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate.getTime());
      newDate.setDate(newDate.getDate() + offset);
      return newDate;
    });
  };

  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
  };

  const goYesterday = (): void => changeDate(-1);
  const goTomorrow = (): void => changeDate(1);

  useEffect(() => {
    getImageNum();
    getMessage();
  }, [currentDate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-5">
      <div className="flex items-center space-x-2">
        <h1 className="text-center text-4xl font-serif">{formatDate(currentDate)}</h1>
      </div>
      <div className="flex items-center justify-between px-4">
        <button onClick={goYesterday} className="px-4 py-2 border rounded-md">
          きのう
        </button>
        <button onClick={goTomorrow} className="px-4 py-2 border rounded-md">
          あした
        </button>
      </div>
      <div>
        <Image
          src={`/images/golden_retriever/${imageNum}.jpg`}
          alt="Random Dog Image"
          className='w-[375px] h-[375px] object-cover'
          width={375}
          height={375}
        />
      </div>
      <div className="p-4 rounded-xl bg-blue-200">
        <p className="font-rounded">{encourageMessage}</p>
      </div>
    </div>
  );
}
