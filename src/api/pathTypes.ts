export interface Method {
	path: 'application.json' | 'count' | 'query' | 'version'
}

export interface QueryParameters {
	format: 'geojson'
	endtime?: string
	starttime?: string
	updatedafter?: string
	minlatitute?: number
	maxlatitude?: number
	minlongitude?: number
	maxlongitude?: number
	latitude?: number
	longitude?: number
	maxradius?: number
	maxradiuskm?: number
	orderby?: string
	limit?: number
}
