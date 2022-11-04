import type { FCollection } from 'types'

export default async function getFruits(): Promise<FCollection> {
	const response = await fetch('http://104.207.130.64:8091/')
	return response.json() as Promise<FCollection>
}
