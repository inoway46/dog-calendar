import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('応援メッセージが表示されること', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
    render(<Home />)
    expect(screen.getByText('今日も一日がんばるワン！')).toBeInTheDocument()
  })
})
