<script>
    import { afterUpdate, beforeUpdate, onMount, setContext } from "svelte";
    import Header from "./Header.svelte";

    onMount(() => {
        console.log('foo1');
    });

    beforeUpdate(() => {
        console.log('foo2');
    });

    afterUpdate(() => {
        console.log('foo3');
    });

    let items = [
        {
            name: 'Ngu',
            status: 'done',
        }
    ];

    let name = null;
    let status = null;

    function addToDo()
    {
        if (name == null || status == null) {
            alert('Name vaf status khogn duowc de null!');
            return;
        };
        items = [...items, {
            name: name,
            status: status,
        }];
    }

    setContext('foo', 1000);

    let smallTitle = 'Small event from parent';
    function getDataFromChild(event)
    {
        console.log('foo: ', event.detail);
        smallTitle = event.detail;
    }

    import { count } from "./store/writeStore";
</script>

<main>
    <Header
        title="Todo app cua thep"
        on:fooEvent={getDataFromChild}
    ></Header>
    <h2>{$count} {smallTitle}</h2>

    <label for="status">name</label>
    <input type="text" bind:value={name}>
    <label for="status">Status</label>
    <input type="text" bind:value={status}>

    <button type="button" on:click={addToDo}>Add todo</button>
    <ul>
        {#each items as item (item)}
            <li>Name: {item.name} <br></li>
            <li>
                Status:
                {#if item.status == 'done'}
                    ✅
                {:else if item.status == 'waitting'}
                    🟨
                {:else}
                    ❌
                {/if}
            </li>
        {/each}
    </ul>
</main>

<style>
</style>
