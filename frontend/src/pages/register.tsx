import { FormEvent, useState } from 'react'
import GenderCheckbox from '../components/gender-checkbox'
import { Link } from 'react-router-dom'
import useSignUp from '../hooks/use-sign-up';

export default function Register() {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	})
	const { loading, signup } = useSignUp();

	function handleCheckboxChange(gender: 'male' | 'female') {
		setInputs({ ...inputs, gender })
	}

	function handleSubmitForm(e: FormEvent) {
		e.preventDefault()
		console.log(inputs)
		signup(inputs)
	}

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> MsgMe</span>
				</h1>

				<form onSubmit={handleSubmitForm}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input type='text' 
							placeholder='John Doe' 
							className='w-full input input-bordered h-10'
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}	
						/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input type='text' 
						placeholder='johndoe' 
						className='w-full input input-bordered h-10' 
						onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox selectedGender={inputs.gender} 
						onCheckboxChange={handleCheckboxChange} 
					/>

					<Link to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'
					>
						Already have an account?
					</Link>

					<div>
						<button disabled={loading}
							className='btn btn-block btn-sm mt-2 border border-slate-700'	
						>
							{loading ? "Loading..." : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
  )
}
