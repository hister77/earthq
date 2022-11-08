import type { QueryFunctionContext } from '@tanstack/react-query'
import queryString from 'query-string'
import type { Collection } from 'types'
import type { QueryParameters } from './pathTypes'

const BASE = 'https://earthquake.usgs.gov'
const PATH = '/fdsnws/event/1'

export default async function defaultQueryFunction({
	queryKey
}: QueryFunctionContext<[string, QueryParameters]>): Promise<Collection> {
	const [method, search] = queryKey
	const url = new URL(PATH + method, BASE)
	if (method === '/query') {
		url.search = queryString.stringify(search)
		const response = await fetch(url.href)
		return response.json() as Promise<Collection>
	}
	const response = await fetch(url.href)
	return response.json() as Promise<Collection>
}
