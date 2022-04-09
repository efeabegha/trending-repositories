import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Repo from './repo';

afterEach(() => {
  cleanup();
})

test('should render Repo element', async () => {
  render(<Repo/>);
  const repoElement = screen.getByTestId('repo');
  expect(repoElement).toBeInTheDocument();
});

test('renders elements and content within Repo element', async () => {
  render(<Repo name="Ventilator"
    url="https://api.github.com/users/jcl5m1"
    description="Low-Cost Open Source Ventilator or PAPR"
    stars="600"
  />);

  await screen.findByRole('button', { name: "★"});
  await screen.findByRole('heading', { name: "Ventilator"});

  const repoElement = screen.getByTestId("repo");
  expect(repoElement).toHaveTextContent("Ventilator");
  expect(repoElement).toHaveTextContent("Low-Cost Open Source Ventilator or PAPR");
  expect(repoElement).toHaveTextContent("600");
});

test('should increase the star count after button click', async () => {
  render(<Repo name="Ventilator"
    url="https://api.github.com/users/jcl5m1"
    description="Low-Cost Open Source"
    stars="700"
  />);

  const repoElement = screen.getByTestId("repo");

  const button = await screen.findByRole('button', { name: "★"});
  userEvent.click(button);
  expect(repoElement).toHaveTextContent('701');
});