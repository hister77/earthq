import LoadingOrError from 'components/LoadingOrError'
import type { ReactElement } from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const DataBox = lazy(async () => import('pages/Main'))

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<Routes>
					<Route path='/earthq' element={<DataBox />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}
