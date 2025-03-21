import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import {
	ENTRY_MONTHLY_PRICE_ID,
	ENTRY_YEARLY_PRICE_ID,
	GROWTH_MONTHLY_PRICE_ID,
	GROWTH_YEARLY_PRICE_ID,
	ENTERPRISE_MONTHLY_PRICE_ID,
	ENTERPRISE_YEARLY_PRICE_ID
} from '$constants';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function initials(name: string) {
	return name
		.split(' ')
		.map((word) => word[0])
		.join('');
}

export function userPlan(plan: string) {
	switch (plan) {
		case ENTRY_YEARLY_PRICE_ID:
		case ENTRY_MONTHLY_PRICE_ID: {
			return 'Entry';
		}

		case GROWTH_YEARLY_PRICE_ID:
		case GROWTH_MONTHLY_PRICE_ID: {
			return 'Growth';
		}

		case ENTERPRISE_YEARLY_PRICE_ID:
		case ENTERPRISE_MONTHLY_PRICE_ID: {
			return 'Enterprise';
		}

		default:
			return 'ERROR';
	}
}

export function assetPath(path: string) {
	return `https://dvvoc3l8fowfh.cloudfront.net${path}`;
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};
