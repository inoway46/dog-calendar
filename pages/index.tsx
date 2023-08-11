import { useState, useEffect } from 'react';
import axios from 'axios';

const messages = [
  '今日も一日がんばるワン！',
  'いつでも君を応援しているワン！',
  '君ならできるワン！',
  '前向きに取り組むワン！',
  'どんな困難も乗り越えるワン！'
];

export const randomPickMessage = (): string => {
  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
};

const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
};

export default function Home() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [dogImage, setDogImage] = useState<string>('');
  const [encourageMessage, setEncourageMessage] = useState<string>('');

  const getDogImage = async (): Promise<void> => {
    const res = await axios.get('https://dog.ceo/api/breeds/image/random');
    setDogImage(res.data.message);
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

  const goYesterday = (): void => changeDate(-1);
  const goTomorrow = (): void => changeDate(1);

  useEffect(() => {
    getDogImage();
    getMessage();
  }, [currentDate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-10">
      <div className="flex items-center space-x-2">
        <h1 className="text-center text-4xl font-serif">{formatDate(currentDate)}</h1>
        {/* 犬の手形アイコンをここに追加します */}
      </div>
      <div>
        <img src={dogImage} alt="Dog of the day" className="w-[375px] h-[375px] object-cover" />
      </div>
      <div className="p-4 rounded-xl bg-blue-200">
        <p className="font-rounded">{encourageMessage}</p> {/* font-roundedは丸みを帯びたフォントを示します */}
      </div>
      <div className="flex items-center justify-between w-full px-4">
        <button onClick={goYesterday} className="px-4 py-2 border rounded-md">
          きのう {/* 犬の手形アイコンをここに追加します */}
        </button>
        <button onClick={goTomorrow} className="px-4 py-2 border rounded-md">
          あした {/* 犬の手形アイコンをここに追加します */}
        </button>
      </div>
    </div>
  );
}
