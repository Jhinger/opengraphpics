<script lang="ts">
	import { Label } from '$components/ui/label';
	import { Input } from '$components/ui/input';
	import { Button } from '$components/ui/button';
	import * as Dialog from '$components/ui/dialog';
	import CreateNewFolderIcon from 'virtual:icons/mdi/create-new-folder-outline';
	import FileUploadIcon from 'virtual:icons/mdi/file-upload-outline';
	import { buttonVariants } from '$components/ui/button';
	import { toast } from 'svelte-sonner';
	import { cn } from '$lib/utils';
	import { MAX_FILE_ICON_SIZE, MAX_FILE_THUMBNAIL_SIZE, BYTES_IN_MB } from '$constants';

	let fileName = $state('');
	let organizationName = $state('');
	let thumbnailImage = $state<HTMLImageElement | null>(null);
	let showImage = $state(false);
	let isIconValidSize = $state(true);
	let isThumbnailValidSize = $state(true);

	$effect(() => {
		thumbnailImage = new Image();
	});

	const handleIconUpload = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file === undefined) {
			toast.error('Could not find file.');
			return;
		}

		if (file.size > MAX_FILE_ICON_SIZE) {
			isIconValidSize = false;
			target.value = '';
			return;
		} else {
			isIconValidSize = true;
		}
	};

	const handleThumbnailUpload = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file === undefined) {
			toast.error('Could not find file.');
			return;
		}

		if (file.size > MAX_FILE_THUMBNAIL_SIZE) {
			isThumbnailValidSize = false;
			showImage = false;
			target.value = '';
			return;
		} else {
			isThumbnailValidSize = true;
		}

		if (file) {
			fileName = file.name;
			showImage = true;
			const reader = new FileReader();
			reader.onload = (e) => {
				thumbnailImage!.src = e.target?.result as string;
			};
			reader.readAsDataURL(file);
			return;
		}
	};
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
		<CreateNewFolderIcon class="w-6 h-6" />
		<span class="ml-2">Create</span>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create an Organization</Dialog.Title>
			<Dialog.Description class="pt-2">
				Fill in the details to create a new organization. Once created, you’ll be able to invite
				collaborators, set permissions, and select a plan appropriate for your organizations needs.
			</Dialog.Description>
		</Dialog.Header>
		<form
			class="pt-3 flex flex-col gap-6"
			method="POST"
			action="/dashboard?/create"
			enctype="multipart/form-data"
		>
			<div class="flex flex-col justify-start gap-2">
				<Label for="name" class="font-semibold text-sm">Name</Label>
				<Input
					bind:value={organizationName}
					id="name"
					name="organization"
					type="text"
					placeholder="Organization Name"
					required
				/>
			</div>
			<div class="flex flex-col justify-start gap-2">
				<Label for="icon" class="font-semibold text-sm"
					>Icon <span class="font-normal italic text-xs"
						>({MAX_FILE_ICON_SIZE / BYTES_IN_MB}MB max)</span
					></Label
				>
				<Input
					name="icon"
					id="icon"
					type="file"
					placeholder="Organization Icon"
					onchange={handleIconUpload}
					accept="image/jpg,image/png,image/jpeg,image/avif"
					class="file:bg-sky-100 file:mr-4 file:rounded-md file:hover:cursor-pointer hover:cursor-pointer"
					required
				/>
				{#if !isIconValidSize}
					<span class="text-xs font-medium text-red-500"
						>Icon size must be less than {MAX_FILE_ICON_SIZE / BYTES_IN_MB}MB.</span
					>
				{/if}
			</div>
			<div class="flex flex-col justify-start gap-2">
				<Label class="flex flex-row items-center gap-2 font-semibold text-sm">
					<span
						>Default Thumbnail <span class="font-normal italic text-xs"
							>({MAX_FILE_THUMBNAIL_SIZE / BYTES_IN_MB}MB max)</span
						>
					</span>
				</Label>
				<Label
					for="dropzone-file"
					class={cn(
						showImage ? 'border-hidden' : 'border-dashed',
						'flex flex-col relative items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 duration-100'
					)}
				>
					{#if showImage}
						<img
							id="preview"
							bind:this={thumbnailImage}
							src=""
							alt=""
							class="absolute w-full h-full opacity-100 object-cover rounded-t-lg hover:opacity-75 duration-150"
							draggable="false"
						/>
					{/if}
					{#if !showImage}
						<div class="flex flex-col items-center justify-center pt-5 pb-6">
							<FileUploadIcon class="w-8 h-8 mb-4 text-gray-500" />
							<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
								{#if fileName}
									<span>File Uploaded: <span class="font-semibold">{fileName}</span></span>
								{:else}
									<span class="font-semibold">Click to upload</span>
								{/if}
							</p>
							<p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, JPEG, or AVIF</p>
						</div>
					{/if}
					<Input
						id="dropzone-file"
						name="thumbnail"
						type="file"
						class="hidden"
						onchange={handleThumbnailUpload}
						accept="image/jpg,image/png,image/jpeg,image/avif"
						required
					/>
					{#if !isThumbnailValidSize}
						<span class="text-xs font-medium text-red-500"
							>Thumbnail size must be less than {MAX_FILE_THUMBNAIL_SIZE / BYTES_IN_MB}MB.</span
						>
					{/if}
				</Label>
				{#if showImage}
					<div
						class="flex flex-col gap-1 justify-start items-center px-4 pt-2 relative -top-3 w-full h-[5rem] bg-gray-200 rounded-b-md"
					>
						<span class="font-bold text-sm text-black w-full"
							>{organizationName} | Example Heading</span
						>
						<span class="text-xs text-gray-500 w-full">
							This image will be used as the default thumbnail for routes that don't have a
							corresponding OpenGraph image.
						</span>
					</div>
				{/if}
			</div>
			<Button
				variant="default"
				type="submit"
				class="bg-sky-400 hover:bg-sky-500 hover:ring-2 hover:ring-sky-500 hover:ring-offset-white hover:ring-offset-2 duration-150 transition-all"
				>Create</Button
			>
		</form>
	</Dialog.Content>
</Dialog.Root>
