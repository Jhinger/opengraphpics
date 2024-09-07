<script lang="ts">
	import { Button } from '$components/ui/button/index.js';
	import { Input } from '$components/ui/input/index.js';
	import { Label } from '$components/ui/label/index.js';
	import GoogleIcon from '$icons/google-icon.svelte';
</script>

<div class="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
	<div
		class="flex items-center justify-center py-12 bg-gradient-to-br from-sky-100 via-white to-pink-100"
	>
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Login</h1>
			</div>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="email@example.com" required />
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a
							href="##"
							class="ml-auto inline-block text-sm hover:text-sky-500 duration-150 transition-all"
						>
							Forgot your password?
						</a>
					</div>
					<Input id="password" type="password" required />
				</div>
				<Button type="submit" class="w-full bg-sky-400 hover:bg-sky-500 duration-150 font-medium">
					Login
				</Button>
				<a href="/oauth/google/">
					<Button
						variant="outline"
						class="w-full flex flex-row gap-2 hover:ring-2 hover:ring-offset-2 hover:ring-sky-500 transition-all duration-150"
					>
						<GoogleIcon className="w-5 h-5" />
						Sign in with Google
					</Button>
				</a>
			</div>
			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="##" class="underline hover:text-sky-500 duration-150"> Sign up </a>
			</div>
		</div>
	</div>
	<div class="relative bg-muted hidden lg:block">
		<enhanced:img
			src="$lib/images/login-stock.jpg"
			alt="placeholder"
			fetchpriority="high"
			loading="eager"
			class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
		/>
		<div class="absolute top-5 left-10">
			<a href="/" class="text-2xl text-white font-gochi font-black hover:text-sky-400 duration-150">
				ByteBite
			</a>
		</div>
		<div
			class="absolute inset-x-0 top-1/4 mx-auto w-[35rem] h-[15rem] bg-white/60 rounded-md backdrop-blur-md"
		></div>
	</div>
</div>
