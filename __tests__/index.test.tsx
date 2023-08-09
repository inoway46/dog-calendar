import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

jest.mock('../pages/index', () => {
  const originalModule = jest.requireActual('../pages/index');
  return {
    __esModule: true,
    ...originalModule,
    getDogImage: jest.fn(),
    randomPickMessage: jest.fn().mockReturnValue('今日も一日がんばるワン！')
  }
})

describe('Home', () => {
  it('renders a title', () => {
    render(<Home />)
    expect(screen.getByText('今日も一日がんばるワン！')).toBeInTheDocument()
  })
})
