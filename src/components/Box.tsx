import type { ReactElement } from 'react'
import type { IFeature } from 'types'

export default function Feature({
	type,
	id,
	properties
}: IFeature): ReactElement {
	return (
		<div className='mb-2'>{`${type}: ${id} ${properties.place} ${properties.type}`}</div>
	)
}
