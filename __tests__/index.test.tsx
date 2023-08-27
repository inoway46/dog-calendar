import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/react'

describe('Home', () => {
  beforeAll(() => {
    const RealDate = Date;
    global.Date = class extends RealDate {
      constructor() {
        super();
        return new RealDate('2023-01-01');
      }
    };
  });

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('応援メッセージが表示されること', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
    render(<Home />)
    expect(screen.getByText('今日も一日がんばるワン！')).toBeInTheDocument()
  })

  test('あしたボタンを押すと、翌日の日付が表示されること', () => {
    render(<Home />)
    fireEvent.click(screen.getByText('あした'))
    expect(screen.getByText('1月2日')).toBeInTheDocument()
  })

  test('きのうボタンを押すと、前日の日付が表示されること', () => {
    render(<Home />)
    fireEvent.click(screen.getByText('きのう'))
    expect(screen.getByText('12月31日')).toBeInTheDocument()
  })

  test('画像が表示されること', () => {
    render(<Home />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
