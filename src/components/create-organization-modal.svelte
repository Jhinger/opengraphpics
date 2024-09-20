<script lang="ts">
	import { Label } from '$components/ui/label';
	import { Input } from '$components/ui/input';
	import * as Dialog from '$components/ui/dialog';
	import CreateNewFolderIcon from 'virtual:icons/mdi/create-new-folder-outline';
	import { buttonVariants } from '$components/ui/button';
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
		<form class="py-4">
			<div class="flex flex-col justify-start gap-4">
				<Label for="name" class="font-semibold">Name</Label>
				<Input id="name" type="text" placeholder="Organization Name" />
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
