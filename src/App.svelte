<script>
    import { afterUpdate, beforeUpdate, onMount, setContext } from "svelte";
    import Header from "./Header.svelte";
    import { count } from "./store/writeStore";

    onMount(() => { console.log('foo1'); });
    beforeUpdate(() => { console.log('foo2'); });
    afterUpdate(() => { console.log('foo3'); });

    let name = null;
    let status = null;
    let items = [
        {
            name: 'Ngu',
            status: 'done',
        }
    ];
    function addToDo()
    {
        if (name == null || status == null) {
            alert('Name and status are required!');
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
        smallTitle = event.detail;
    }

    let users = [
        {
            name: 'Jonh',
            age: 15,
        },
        {
            name: 'Peter',
            age: 12,
        },
        {
            name: 'Alice',
            age: 17,
        },
    ];

    let badUser = [];
    let cool = 0;
    $: console.log('foo: ', cool);
    function increaseCool() {
        cool++;
    }
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

    <button type="button" on:click={increaseCool}>change cool</button><br>

    <!-- Loop -->
    <small>Each with index</small>
    {#each users as user, index (user.age)}
        <p>{index}. {user.name}</p>
    {/each}


    <small>Each with destruction</small>
    {#each users as {name, age}, index}
        <p>{index}. {name} : {age}</p>
    {/each}

    <small>Each with else</small>
    {#each badUser as user, index}
        <p>{index}. {user.name}</p>
    {:else}
        <p>No user found</p>
    {/each}

    {#key badUser}
        badUser: {badUser}
    {/key}
</main>

<style>
</style>
