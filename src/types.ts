export interface IFeature {
	geometry: {
		coordinates: {
			latitude: number
			longitute: number
			c: number
		}[]
		id: string
		properties: {
			place: string
			detail: string
			type: string
			tsunami: number
		}
		type: string
	}
}
