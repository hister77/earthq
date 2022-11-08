import type { ReactElement } from 'react'
import type { Feature } from 'types'

export default function FeatureBox({ properties }: Feature): ReactElement {
	return (
		<tr>
			<td>{properties.mag}</td>
			<td>
				<a href={properties.url} target='blank_'>
					{properties.place}
				</a>
			</td>
			<td>{properties.tsunami}</td>
		</tr>
	)
}
