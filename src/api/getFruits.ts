import type { IFeature } from 'types'

export default async function getFruits(): Promise<IFeature[]> {
	const response = await fetch(
		'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02'
	)
	return response.json() as Promise<IFeature[]>
}
