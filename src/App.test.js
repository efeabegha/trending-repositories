import { cleanup, render, screen } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App, {fetchRepos} from './App';

test('it should render App component', () => {
  render(<App />);
  const appElement = screen.getByTestId('app');
  expect(appElement).toBeInTheDocument();
});

test('it should render elements within App component', async () => {
  render(<App />);

  await screen.findByRole('button', { name: "★ Repositories"});
  await screen.findByRole('heading', { name: "Trending Repositories"});
  await screen.findByRole('banner', { name: ""});
});

describe('Server Response', () => {
  const response = rest.get(
    'https://api.github.com/search/repositories',
    (req, res, ctx) => {
      return res(ctx.json({items:
        [
          {
            name: "VentilatorStar - test",
            githubUrl: "https://api.github.com/users/jcl5m1",
            description: "Low-Cost Open Source Ventilator or PAPR",
            stars: "2334"
          },
        ]
      }))
    }
  );
  
  const server = new setupServer(response);

  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());
  
  afterAll(() => {
    server.close();
    cleanup();
  });

  test('it should handle the response data from the api', async () => {
    const repos = await fetchRepos();

    expect(repos).toEqual(
      [{
        name: "VentilatorStar - test",
        githubUrl: "https://api.github.com/users/jcl5m1",
        description: "Low-Cost Open Source Ventilator or PAPR",
        stars: "2334"
      },]
    );
  })

  test('it should throw an error when server responds with an error status', async () => {
    server.use(
      rest.get(
        'https://api.github.com/search/repositories',
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    
    await expect(fetchRepos()).rejects.toThrow('Request failed with status: 500');
  })
})
