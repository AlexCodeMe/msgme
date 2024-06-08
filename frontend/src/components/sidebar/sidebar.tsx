import SearchInput from './search-input'
import Conversations from './conversations'
import { LogOut } from 'lucide-react'
import useLogout from '../../hooks/use-logout'

export default function Sidebar() {
	const { logout } = useLogout()

	return (
		<div className='border-r border-slate-500 p-1 md:p-4 flex flex-col w-44 md:w-1/2'>
			<SearchInput />
			<div className='divider px-3' />
			<Conversations />
			{/* <LogoutButton /> */}
			<div className='mt-auto'>
				<LogOut className='w-6 h-6 text-white cursor-pointer'
					onClick={logout}
				/>
			</div>
		</div>
	)
}
