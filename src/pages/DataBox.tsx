import { useQuery } from '@tanstack/react-query'
import getFeature from 'api/getFeature'
import Feature from 'components/Box'
import Head from 'components/Head'
import LoadingOrError from 'components/LoadingOrError'
import type { ReactElement } from 'react'
import type { IFeature } from 'types'

export default function DataBox(): ReactElement {
	const { isLoading, isError, error, data } = useQuery(
		['collection'],
		getFeature
	)
	if (isLoading || isError) {
		return <LoadingOrError error={error as Error} />
	}

	return (
		<>
			<Head title='Data Box' />
			<div className='mx-auto w-fit p-2'>
				{data.features.map((v: IFeature) => (
					<Feature
						key={`FruitCard-${v.id}`}
						type={v.type}
						id={v.id}
						properties={v.properties}
					/>
				))}
			</div>
		</>
	)
}
