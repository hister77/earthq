import type { ReactElement } from 'react'

interface Metadata {
	generated: number
	title: string
}

export default function Footer({ title, generated }: Metadata): ReactElement {
	const date = new Date(generated).toDateString()
	return (
		<footer className=' mx-auto mt-4 w-fit text-center text-sm'>
			<p>{title}</p>
			<p>{date}</p>
		</footer>
	)
}
