import { Link } from "react-router-dom";

import trackmanLogo from "../assets/trackman.svg";

export default function AppHeader() {
	return (
		<header className='bg-neutral-900 px-6 py-4 text-white sm:px-8 lg:px-12'>
			<div className='mx-auto max-w-7xl'>
				<Link
					to='/'
					className='inline-flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trackman-orange'
					aria-label='Facility Portal home'>
					<img src={trackmanLogo} alt='' className='h-4 w-4' />
					<span aria-hidden='true' className='h-5 w-px bg-neutral-600' />
					<span className='text-xs font-semibold tracking-[0.28em] uppercase'>
						Facility Portal
					</span>
				</Link>
			</div>
		</header>
	);
}
