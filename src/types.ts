export interface Collection {
	type: string
	metadata: Metadata
	bbox: {
		minimum_longitute: number
		minimum_latitude: number
		minimum_depth: number
		maximum_longitude: number
		maximum_latitude: number
		maximum_depth: number
	}
	features: Feature[]
}

export interface Metadata {
	generated: number
	url?: string
	title: string
	api?: string
	count?: number
	status?: number
}

export interface Feature {
	id?: string
	type?: string
	url?: string
	properties: {
		url: string | undefined
		time: number
		mag: number
		place: string
		detail: string
		type: string
		tsunami: number
	}
	geometry: Geometry[]
}

export interface Geometry {
	type: string
	mag: number
	coordinates: {
		longitude: number
		latitude: number
		depth: number
	}
}
