import { useQuery } from '@tanstack/react-query'
import Footer from 'components/Footer'
import Head from 'components/Head'
import LoadingOrError from 'components/LoadingOrError'
import Row from 'components/Table'
import { add, format } from 'date-fns'
import type { ChangeEvent, FormEvent, ReactElement } from 'react'
import { useState } from 'react'
import type { Collection, Feature } from 'types'
import type { QueryParameters } from '../api/pathTypes'

const LIMIT = 1000
const MAXRADIUSKM = 2000
const LAT = 52.13
const LONG = 21
const OFFSET = -14
const SPAN = 30

const defaultFormData: QueryParameters = {
	format: 'geojson',
	starttime: format(add(new Date(), { days: OFFSET }), 'yyyy-MM-dd'),
	endtime: format(new Date(), 'yyyy-MM-dd'),
	orderby: 'magnitude',
	limit: LIMIT,
	longitude: LONG,
	latitude: LAT,
	maxradiuskm: MAXRADIUSKM
}

export default function DataBox(): ReactElement {
	const [formData, setFormData] = useState<QueryParameters>(defaultFormData)
	const [formSubmitData, setFormSubmitData] =
		useState<QueryParameters>(defaultFormData)
	const [radius, setRadius] = useState(MAXRADIUSKM)

	const { isLoading, isError, error, data } = useQuery<Collection>({
		queryKey: ['/query', formSubmitData]
	})

	if (isLoading || isError) {
		return <LoadingOrError error={error as Error} />
	}

	const { features, metadata } = data

	const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
		let objects = { [event.target.id]: event.target.value }
		if (event.target.id === 'starttime') {
			const date = format(
				add(new Date(event.target.value), { days: SPAN }),
				'yyyy-MM-dd'
			)
			objects = { ...objects, endtime: date }
		}
		setFormData(previousInputs => ({
			...previousInputs,
			...objects
		}))
	}

	const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault()
		setFormSubmitData({ ...formData, maxradiuskm: radius })
	}

	const onRadiusChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setRadius(Number(event.target.value))
	}

	return (
		<>
			<Head title='Data Box' />
			<main className='mt-1 md:w-full xl:mx-auto xl:w-2/5'>
				<form onSubmit={onSubmit} className='mx-auto mt-0 mb-2 block'>
					<div className='mx-0.5 flex justify-between'>
						<div className='w-32'>
							<input
								className='mb-4 w-32 rounded-xl border-0 shadow-lg shadow-gray-800/50'
								type='number'
								id='longitude'
								defaultValue={formData.longitude}
								onChange={onChange}
							/>
							<input
								className='w-32 rounded-xl border-0 shadow-lg shadow-gray-800/50'
								type='number'
								id='latitude'
								defaultValue={formData.latitude}
								onChange={onChange}
							/>
						</div>
						<div>
							<input
								className='mb-4 border-0 bg-slate-600 shadow-lg shadow-gray-800/50'
								type='date'
								value={formData.starttime}
								max={defaultFormData.endtime}
								id='starttime'
								onChange={onChange}
								required
							/>
							<input
								className='border-0 bg-slate-600 shadow-lg shadow-gray-800/50'
								type='date'
								value={formData.endtime}
								max={format(new Date(), 'yyyy-mm-dd')}
								id='endtime'
								onChange={onChange}
							/>
						</div>
					</div>
					<label
						className='object mt-4 block w-full justify-self-end text-center text-sm'
						htmlFor='radiuskm'
					>
						Max radius({radius} km)
						<input
							className='w-full accent-slate-800'
							type='range'
							id='maxradiuskm'
							min='0'
							max={MAXRADIUSKM}
							defaultValue={radius}
							step='10'
							onChange={onRadiusChange}
						/>
					</label>
					<input
						className='mt-4 ml-auto mr-2 block w-fit rounded-lg bg-gray-800 p-2'
						type='submit'
						value='Apply'
					/>
				</form>
				<table className='mx-auto w-full border-separate border-spacing-y-0.5 border-spacing-x-0.5 border border-slate-500'>
					<thead>
						<tr>
							<th>Magnitude</th>
							<th>Time</th>
							<th>Place</th>
							<th>Tsunami</th>
						</tr>
					</thead>
					<tbody>
						{features.map((v: Feature, index) => (
							<Row
								key={`${v.id ?? index}`}
								properties={v.properties}
								geometry={v.geometry}
								id={v.id}
							/>
						))}
					</tbody>
				</table>
			</main>
			<Footer title={metadata.title} generated={metadata.generated} />
		</>
	)
}
