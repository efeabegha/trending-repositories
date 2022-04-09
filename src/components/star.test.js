import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Star from './Star';

afterEach(() => {
  cleanup();
})

test('it should render Star component', () => {
  render(<Star/>);
  const StarElement = screen.getByTestId('star')
  expect(StarElement).toBeInTheDocument();
  expect(StarElement).toHaveTextContent('★');
})

test('it should call the callback function passed in through props onClick', async () => {
  const countMock = jest.fn();
  render(<Star count={countMock} />)

  fireEvent.click(screen.getByTestId('star'));
  expect(countMock).toHaveBeenCalledTimes(1);
})