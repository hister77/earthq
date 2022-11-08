import { useQuery } from '@tanstack/react-query'
import FeatureBox from 'components/Box'
import Footer from 'components/Footer'
import Head from 'components/Head'
import LoadingOrError from 'components/LoadingOrError'
import type { ChangeEvent, FormEvent, ReactElement } from 'react'
import { useState } from 'react'
import type { Feature, Metadata } from 'types'
import { formatDate } from 'utils'
import type { QueryParameters } from '../api/pathTypes'

const LIMIT = 1000
const MAXRADIUSKM = 1800

const defaultFormData: QueryParameters = {
	format: 'geojson',
	starttime: formatDate(new Date(), -7),
	endtime: formatDate(),
	orderby: 'magnitude',
	limit: LIMIT,
	longitude: 116.41,
	latitude: 39.9,
	maxradiuskm: MAXRADIUSKM
}

export default function DataBox(): ReactElement {
	const [formData, setFormData] = useState<QueryParameters>(defaultFormData)
	const [formSubmitData, setFormSubmitData] =
		useState<QueryParameters>(defaultFormData)

	const { isLoading, isError, error, data } = useQuery({
		queryKey: ['/query', formSubmitData]
	})

	if (isLoading || isError) {
		return <LoadingOrError error={error as Error} />
	}

	const { features }: Feature[] = data
	const { metadata }: Metadata = data

	const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setFormData(previousInputs => ({
			...previousInputs,
			[event.target.name]: event.target.value
		}))
	}

	const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault()
		setFormSubmitData(formData)
	}

	return (
		<>
			<Head title='Data Box' />
			<div className='mx-auto mt-0 w-fit'>
				<form
					onSubmit={onSubmit}
					className='mx-auto mt-0 block w-full border border-red-500'
				>
					<input
						className='bg-slate-600'
						type='date'
						value={formData.starttime}
						max={defaultFormData.endtime}
						name='starttime'
						onChange={onChange}
					/>
					<input
						className='bg-slate-600'
						type='date'
						value={formData.endtime}
						max={defaultFormData.endtime}
						name='endtime'
						onChange={onChange}
					/>
					<input type='submit' value='Submit' />
				</form>
				<table className='mx-auto border border-slate-100 p-2'>
					<thead>
						<tr className='border-collapse border border-slate-100'>
							<th>Magnitude</th>
							<th>Place</th>
							<th>Type</th>
						</tr>
					</thead>
					<tbody>
						{features.map((v: Feature) => (
							<FeatureBox
								key={`FruitCard-${v.id}`}
								properties={v.properties}
								geometry={v.geometry}
							/>
						))}
					</tbody>
				</table>
			</div>
			<Footer title={metadata.title} generated={metadata.generated} />
		</>
	)
}
