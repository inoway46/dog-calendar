import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/react'

describe('Home', () => {
  let originalDate: DateConstructor;

  beforeAll(() => {
    originalDate = global.Date;
    global.Date = class extends originalDate {
      constructor() {
        super();
        return new originalDate('2023-01-01');
      }
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    global.Date = originalDate;
  });

  test('応援メッセージが表示されること', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
    render(<Home />);
    expect(screen.getByText('今日も一日がんばるワン！')).toBeInTheDocument();
  });

  test('あしたボタンを押すと、翌日の日付が表示されること', () => {
    render(<Home />);
    fireEvent.click(screen.getByText('あした'));
    expect(screen.getByText('1月2日(月)')).toBeInTheDocument();
  });

  test('きのうボタンを押すと、前日の日付が表示されること', () => {
    render(<Home />);
    fireEvent.click(screen.getByText('きのう'));
    expect(screen.getByText('12月31日(土)')).toBeInTheDocument();
  });

  test('画像が表示されること', () => {
    render(<Home />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('曜日が表示されること', () => {
    render(<Home />);
    expect(screen.getByText('1月1日(日)')).toBeInTheDocument();
  });
});
