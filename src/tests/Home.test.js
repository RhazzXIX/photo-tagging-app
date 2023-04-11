import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../components/Home'
import { BrowserRouter } from 'react-router-dom'

describe('Home component', () => {
  it('Renders on screen', () => {
    const { container } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>    
    )
    expect(container).toMatchSnapshot()
  })
})