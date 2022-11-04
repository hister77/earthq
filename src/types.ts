export interface FCollection {
	type: string
	features: IFeature[]
}

export interface IFeature {
	id: string
	type: string
	properties: {
		place: string
		detail: string
		type: string
		tsunami: number
	}
}
