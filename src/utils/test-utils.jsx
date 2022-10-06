import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 2,
			cacheTime: 1000 * 60 * 60 * 4
		}
	}
})

export const renderWithBrowserRouter = (component) => {
	return render(
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				{component}
			</BrowserRouter>
		</QueryClientProvider>

	)
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'