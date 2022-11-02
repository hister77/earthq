import LoadingOrError from 'components/LoadingOrError'
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<div>e</div>
			</Suspense>
		</BrowserRouter>
	)
}
