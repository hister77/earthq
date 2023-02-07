import { useQuery } from '@tanstack/react-query'
import Footer from 'components/Footer'
import Head from 'components/Head'
import LoadingOrError from 'components/LoadingOrError'
import Table from 'components/Table'
import { add, format } from 'date-fns'
import type { ChangeEvent, FormEvent, ReactElement } from 'react'
import { useRef, useState } from 'react'
import type { Collection } from 'types'
import type { QueryParameters } from '../api/pathTypes'

const LIMIT = 1000
const MAXRADIUSKM = 2000
const LAT = 37.062_778
const LONG = 37.379_167
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
	const longReference = useRef<HTMLInputElement>(null)
	const latReference = useRef<HTMLInputElement>(null)

	const { isLoading, isError, error, data } = useQuery<Collection>({
		queryKey: ['/query', formSubmitData]
	})

	if (isLoading || isError) {
		return <LoadingOrError error={error as Error} />
	}

	const { features, metadata } = data

	const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const { id, value } = event.target
		const S = -1
		let objects = { [id]: value }
		if (id === 'starttime' || id === 'endtime') {
			let span = Number(SPAN)
			let opposite = 'endtime'
			if (id === 'endtime') {
				opposite = 'starttime'
				span *= S
			}
			const date = format(add(new Date(value), { days: span }), 'yyyy-MM-dd')
			objects = { ...objects, [opposite]: date }
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

	const onClick = (): void => {
		navigator.geolocation.getCurrentPosition(position => {
			const geo = position.coords
			setFormData(previousData => ({
				...previousData,
				longitude: geo.longitude,
				latitude: geo.latitude
			}))
		})
	}

	return (
		<>
			<Head title='Data Box' />
			<main className='mt-1 md:w-full xl:mx-auto xl:w-2/5'>
				<form onSubmit={onSubmit} className='mx-auto mt-0 mb-2 block'>
					<div id='inputs' className='mx-0.5 flex justify-between'>
						<div className='w-32 flex-col'>
							<label htmlFor='longitude'>
								<span>Longitude:</span>
								<input
									className='mb-4 w-32 rounded-xl border-0 shadow-lg shadow-gray-800/50'
									type='number'
									step='0.0001'
									id='longitude'
									value={formData.longitude}
									onChange={onChange}
									ref={longReference}
								/>
							</label>
							<label htmlFor='latitude'>
								<span>Latitude:</span>
								<input
									className='w-32 rounded-xl border-0 shadow-lg shadow-gray-800/50'
									type='number'
									step='0.0001'
									id='latitude'
									value={formData.latitude}
									onChange={onChange}
									ref={latReference}
								/>
							</label>
						</div>
						<div className='flex flex-col justify-between'>
							<label className='block' htmlFor='starttime'>
								<span>Start date:</span>
								<input
									className='mb-4 border-0 shadow-lg shadow-gray-800/50'
									type='date'
									value={formData.starttime}
									max={defaultFormData.endtime}
									id='starttime'
									onChange={onChange}
									required
								/>
							</label>
							<label htmlFor='endtime'>
								<span className='pl-2'>End date:</span>
								<input
									className='border-0 shadow-lg shadow-gray-800/50'
									type='date'
									value={formData.endtime}
									max={format(new Date(), 'yyyy-mm-dd')}
									id='endtime'
									onChange={onChange}
								/>
							</label>
						</div>
					</div>
					<input
						className='mt-4 ml-2 rounded-md bg-amber-50 px-2 py-0.5 text-sm text-slate-800'
						type='button'
						onClick={onClick}
						value='Geo'
					/>
					<label
						className='block w-full justify-self-end text-center text-sm'
						htmlFor='radiuskm'
					>
						<span className='text-sm'>Max radius({radius} km)</span>
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
						className='text2-sm mt-0 ml-auto mr-1 block w-fit rounded-lg bg-gray-800 p-1'
						type='submit'
						value='Apply'
					/>
				</form>
				<Table features={features} />
			</main>
			<Footer title={metadata.title} generated={metadata.generated} />
		</>
	)
}
