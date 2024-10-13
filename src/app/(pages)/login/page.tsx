import { login, signup } from '@/src/app/actions/login';

const LoginPage = () => {
	return (
		<>
			<div className="flex flex-col items-center justify-center h-[calc(100vh-3rem)]">
				<form className="w-full max-w-xs bg-neutral-100 border-neutral-200 border p-8 flex flex-col gap-2">
					<div>
						<label htmlFor="email">Sähköposti:</label>
						<input id="email" name="email" type="email" required />
					</div>
					<div>
						<label htmlFor="password">Salasana:</label>
						<input
							id="password"
							name="password"
							type="password"
							required
						/>
					</div>
					<div className="grid w-full grid-cols-2 gap-4 pt-2">
						<button
							className="bg-neutral-900 text-white"
							formAction={login}
						>
							Kirjaudu
						</button>
						<button
							className="border-neutral-900 border"
							formAction={signup}
						>
							Rekisterödy
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default LoginPage;
