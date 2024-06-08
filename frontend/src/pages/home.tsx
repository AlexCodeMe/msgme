import Sidebar from '../components/sidebar/sidebar'
import MessageContainer from '../components/messages/message-container'

export default function Home() {
  return (
    <div className='flex h-[80vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
			<MessageContainer />
	</div>
  )
}
