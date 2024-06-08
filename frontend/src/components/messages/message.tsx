import { useAuthContext } from '../../context/auth-context'
import useConversation, { MessageType } from '../../zustand/use-conversation'

export default function Message({ message }: { message: MessageType }) {
	const { authUser } = useAuthContext()
	const { selectedConversation } = useConversation()

	const fromMe = message?.senderId === authUser?.id
	const chatClass = fromMe
		? "chat-end"
		: "chat-start"
	const img = fromMe
		? authUser?.profilePic
		: selectedConversation?.profilePic
	const bubbleBg = fromMe
		? "bg-blue-500"
		: ""

	return (
		<div className={`chat ${chatClass}`}>
			<div className='hidden md:block chat-image avatar'>
				<div className='w-6 md:w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={img} />
				</div>
			</div>
			<p className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md`}>{message.body}</p>
			<span className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>
				{extractTime(message.createdAt)}
			</span>
		</div>
	)
}

function extractTime(dateString: string) {
	const date = new Date(dateString)
	const hours = padZero(date.getHours())
	const minutes = padZero(date.getMinutes())
	return `${hours}:${minutes}`
}

function padZero(number: number) {
	return number.toString().padStart(2, "0")
}
