import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import FrontPage from '../components/FrontPage'

describe('FrontPage component' , () => {
  it('Renders on screen', () => {
    const { container } = render(
    <BrowserRouter>
      <FrontPage img={{}}/>
    </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })
})