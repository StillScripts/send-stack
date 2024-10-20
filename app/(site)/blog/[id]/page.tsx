import { notFound } from 'next/navigation'

import { client } from '@/app/(site)/client'

export const generateMetadata = async ({
	params
}: {
	params: { id: string }
}) => {
	const { data, error } = await client.api.blogs({ id: params.id }).get()

	if (error || !data) {
		notFound()
	}

	return {
		title: data.title
	}
}

const EditBlog = async ({ params }: { params: { id: string } }) => {
	const { data, error } = await client.api.blogs({ id: params.id }).get()

	if (error || !data) {
		notFound()
	}

	return (
		<div className="prose mt-16 dark:prose-invert">
			{data.content?.map((element, index) => {
				switch (element.type) {
					case 'h1':
						return <h1 key={index}>{element.text}</h1>
					case 'h2':
						return <h2 key={index}>{element.text}</h2>
					case 'h3':
						return <h3 key={index}>{element.text}</h3>
					case 'h4':
						return <h4 key={index}>{element.text}</h4>
					case 'h5':
						return <h5 key={index}>{element.text}</h5>
					case 'h6':
						return <h6 key={index}>{element.text}</h6>
					case 'paragraph':
						return <p key={index}>{element.text}</p>
					default:
						return null
				}
			})}
		</div>
	)
}

export default EditBlog
