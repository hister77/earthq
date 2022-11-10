import { format } from 'date-fns'
import type { ReactElement } from 'react'
import type { Feature } from 'types'

export default function Table({ properties }: Feature): ReactElement {
	return (
		<tr>
			<td>{properties.mag}</td>
			<td>{format(Number(properties.time), 'yyyy-MM-dd hh:mm')}</td>
			<td>
				<a href={properties.url} target='blank_'>
					{properties.place}
				</a>
			</td>
			<td>{properties.tsunami}</td>
		</tr>
	)
}
