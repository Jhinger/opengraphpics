<script lang="ts">
	const { title, Icon, value, subvalue } = $props<{
		title: string;
		Icon: any;
		value: string | number;
		subvalue: string | number;
	}>();
</script>

<div
	class="flex h-[8rem] w-[15rem] flex-col items-center justify-between rounded-md bg-white p-4 ring-1 ring-gray-300 duration-100 hover:text-sky-500"
>
	<div class="flex w-full justify-between text-black">
		<span class="text-sm font-medium">{title}</span>
		<Icon class="h-5 w-5 text-gray-500" />
	</div>
	<div class="flex w-full flex-col items-start justify-center">
		<span class="text-3xl font-bold">
			{value}
		</span>
		<span class="text-xs text-gray-500">
			{subvalue}
		</span>
	</div>
</div>
