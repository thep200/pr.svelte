<script>
    import { createEventDispatcher, getContext } from "svelte";
    import { msg } from './store/readStore';
    import { count } from './store/writeStore';
    import { fooCount } from './store/derivedStore';

    export let title = 123;

    let ctx = getContext('foo');

    const emit = createEventDispatcher()
    function toParent()
    {
        emit('fooEvent', 'this is from my child');
        $count += 100;
    }
</script>

<main>
    <h1>{title} {ctx} hohoho</h1>
    <p>Readable store: {$msg}</p>
    <p>Writeable store: {$count}</p>
    <p>Derived store: {$fooCount}</p>
    <br>
    <button type="button" on:click={toParent}>Click to emit</button>
</main>
