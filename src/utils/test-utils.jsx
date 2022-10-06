import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import queryClient from "../main"

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