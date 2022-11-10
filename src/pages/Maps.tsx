import obj from 'config.maps.json'
import GoogleMapReact from 'google-map-react'

function AnyReactComponent({ text }) {
	return <div>{text}</div>
}

export default function SimpleMap() {
	const defaultProps = {
		center: {
			lat: 10.998_356_02,
			lng: 77.015_026_27
		},
		zoom: 11
	}

	return (
		// Important! Always set the container height explicitly
		<div style={{ height: '100vh', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={obj}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
			>
				<AnyReactComponent lat={59.955_413} lng={30.337_844} text='My Marker' />
			</GoogleMapReact>
		</div>
	)
}
