<script lang="ts">
	import { Label } from '$components/ui/label';
	import { Input } from '$components/ui/input';
	import * as Dialog from '$components/ui/dialog';
	import * as Tooltip from '$components/ui/tooltip';
	import CreateNewFolderIcon from 'virtual:icons/mdi/create-new-folder-outline';
	import FileUploadIcon from 'virtual:icons/mdi/file-upload-outline';
	import InformationOutlineIcon from 'virtual:icons/mdi/information-outline';
	import { buttonVariants } from '$components/ui/button';

	let fileName = $state('');
	let image = $state<HTMLImageElement | null>(null);
	let showImage = $state(false);

	$effect(() => {
		image = new Image();
	});

	const handleFileUpload = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			fileName = file.name;
			showImage = true;
			const reader = new FileReader();
			reader.onload = (e) => {
				image!.src = e.target?.result as string;
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
		<form class="py-4 flex flex-col gap-8">
			<div class="flex flex-col justify-start gap-2">
				<Label for="name" class="font-semibold text-sm">Name</Label>
				<Input id="name" type="text" placeholder="Organization Name" required />
			</div>
			<div class="flex flex-col justify-start gap-2">
				<Label for="icon" class="font-semibold text-sm">Icon</Label>
				<Input
					id="icon"
					type="file"
					placeholder="Organization Icon"
					accept="image/jpg,image/png,image/jpeg,image/avif"
					required
				/>
			</div>
			<div class="flex flex-col justify-start gap-2">
				<Label class="flex flex-row items-center gap-2 font-semibold text-sm">
					<span>Default Thumbnail</span>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<InformationOutlineIcon class="w-4 h-4 text-gray-500" />
						</Tooltip.Trigger>
						<Tooltip.Content class="w-[20rem] font-normal" side="right" sideOffset={10}>
							<span>
								<strong>Note:</strong> This image will be used as the default thumbnail for routes that
								don't have a corresponding OG image.
							</span>
						</Tooltip.Content>
					</Tooltip.Root>
				</Label>
				<Label
					for="dropzone-file"
					class="flex flex-col relative items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 duration-100"
				>
					{#if showImage}
						<img
							id="preview"
							bind:this={image}
							src=""
							alt=""
							class="absolute w-full h-full opacity-45 object-cover rounded-lg hover:opacity-100 duration-150"
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
					<input
						id="dropzone-file"
						type="file"
						class="hidden"
						onchange={handleFileUpload}
						accept="image/jpg,image/png,image/jpeg,image/avif"
						required
					/>
				</Label>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
