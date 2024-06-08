import Conversation from './conversation'
import useGetConversations from '../../hooks/use-get-conversations'

export default function Conversations() {
	const { conversations, loading } = useGetConversations()

    return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation) => (
				<Conversation key={conversation.id} conversation={conversation} 
					emoji={getRandomEmoji()}
				/>
			))}
			{loading ? (
				<span className='loading loading-spinner mx-auto' />
			) : null}
		</div>
	)
}

const funEmojis = [
	'👾',
	'⭐',
	'🌟',
	'🎉',
	'🎊',
	'🎈',
	'🎁',
	'🎂',
	'🎄',
	'🎃',
	'🎗',
	'🎟',
	'🎫',
	'🎖',
	'🏆',
	'🏅',
	'🥇',
	'🥈',
	'🥉',
	'⚽',
	'🏀',
	'🏈',
	'⚾',
	'🎾',
	'🏐',
	'🏉',
	'🎱',
	'🏓',
	'🏸',
	'🥅',
	'🏒',
	'🏑',
	'🏏',
	'⛳',
	'🏹',
	'🎣',
	'🥊',
	'🥋',
	'🎽',
	'⛸',
	'🥌',
	'🛷',
	'🎿',
	'⛷',
	'🏂',
	'🏋️',
	'🤼',
	'🤸',
	'🤺',
	'⛹️',
	'🤾',
	'🏌️',
	'🏇',
	'🧘',
]

const getRandomEmoji = () => {
	return funEmojis[Math.floor(Math.random() * funEmojis.length)]
}