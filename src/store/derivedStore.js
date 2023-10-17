import { derived } from 'svelte/store';
import { count } from './writeStore';

export const fooCount = derived(count, $count => $count * 5);

