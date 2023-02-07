import { format } from 'date-fns'
import type { ReactElement } from 'react'
import type { Feature } from 'types'

interface Features {
	features: Feature[]
}

export default function Table({ features }: Features): ReactElement {
	return (
		<table className='mx-auto mt-4 w-full border-separate border-spacing-y-0.5 border-spacing-x-0.5 border border-slate-500 text-sm'>
			<thead>
				<tr>
					<th>Magnitude</th>
					<th>Time</th>
					<th>Place</th>
					<th>Depth</th>
				</tr>
			</thead>
			<tbody>
				{features.map(feature => {
					const { properties, id, geometry } = feature
					return (
						<tr key={id}>
							<td>{properties.mag}</td>
							<td>{format(Number(properties.time), 'yyyy-MM-dd hh:mm')}</td>
							<td>
								<a href={properties.url} target='blank_'>
									{properties.place}
								</a>
							</td>
							<td>{geometry.coordinates[2]}</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}
