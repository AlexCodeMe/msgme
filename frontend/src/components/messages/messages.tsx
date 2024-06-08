import Message from './message'
import useGetMessages from '../../hooks/use-get-messages'

export default function Messages() {
	const { loading, messages } = useGetMessages()

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{!loading && messages.map((message) => <Message key={message.id} message={message} />)}

			{!loading && messages.length === 0 && (
				<p className='text-center text-white'>Send a message to start the conversation</p>
			)}
		</div>
	)
}

export function MessageSkeleton() {
	return (
		<>
			<div className='flex gap-3 items-center'>
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
					<div className='skeleton h-4 w-40'></div>
				</div>
			</div>
			<div className='flex gap-3 items-center justify-end'>
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
				</div>
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
			</div>
		</>
	)
}