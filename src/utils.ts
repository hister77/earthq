import { useLayoutEffect, useState } from 'react'

// eslint-disable-next-line import/prefer-default-export
export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(() => matchMedia(query).matches)

	useLayoutEffect(() => {
		const mediaQuery = matchMedia(query)

		function onMediaQueryChange(): void {
			setMatches(mediaQuery.matches)
		}

		mediaQuery.addEventListener('change', onMediaQueryChange)

		return (): void => {
			mediaQuery.removeEventListener('change', onMediaQueryChange)
		}
	}, [query])

	return matches
}

export function formatDate(date = new Date(), dayOffset = 0): string {
	const PAD = 1
	const MAXDIGIT = 9
	const year = date.getFullYear()
	const month =
		date.getMonth() + PAD > MAXDIGIT
			? date.getMonth() + PAD
			: `0${date.getMonth() + PAD}`
	const day =
		date.getDate() + dayOffset > MAXDIGIT
			? date.getDate() + dayOffset
			: `0${date.getDate() + dayOffset}`
	return `${year}-${month}-${day}`
}
