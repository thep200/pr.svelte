# Svelte notes
Svelte không sử dụng vitual dom. Do đó nó giảm được thời giam compare với DOM, tiết kiệm thời gian render lên trình duyệt.
> Chúng ta không thể trực tiếp sử dụng hàm push, ... để làm thay đổi một mảng trong svelte vì làm như thế nó sẽ không ánh xạ với mảng ban đầu.

Tương tự như vue, svelte cũng có các component được chia nhỏ để tối ưu khả năng sử dụng lại code. Svelte cũng có các lifecycle của một component
```js
// Thứ tự run của các cycle từ trên xuống dưới
beforeUpdate() : Trước khi bind dữ liệu vào DOM
onMount()      : Khi đã thực hiện bind dữ liệu vào DOM
afterUpdate()  : Sau khi update dữ liệu vào DOM
onDestroy()    : Sau khi gỡ dữ liệu khỏi DOM
```

Cấu trúc của một file `.svelte` tương tự vue, gồm có 3 phần riêng biệt
```svelte
<script>
    <!-- script here -->
</script>

<main>
    <!-- html here -->
</main>

<style>
    /* Style here */
</style>
```
## Cú pháp
Cú pháp thường sử dụng
```js
bind:value={var} : gán giá trị cho biến var
on:click={foo}  : gán sự kiện click gọi hàm foo
```

Vòng lặp
```js
{#each items as item}
    <li>{item}</li>
{/each}
```

Cấu trúc điều kiện
```js
{#if condition1}
    // do something
{:else if condition2}
    // do something
{:else}
    // do something
{/if}
```

## Truyền dữ liệu giữa các component
Props
```js
// child
<script>
    export let title = 'Foo note';
    export disabled = true;
</script>

// parent
<Child
    title='Foo note in parent'
    {disabled} // disabled={disabled}
/>
```

Ngoài sử dụng prop chúng ta có thể sử dụng một kỹ thuật khác gọi là `context`. Context được sử dụng để truyền dữ liệu xuống component con thuộc cây của component cha mà không cần thông qua prop, tránh tình trạng drilling prop. (Tương tự như kỹ thuật injection trong vue)
```js
// parent
<script>
    import { setContext } from "svelte";
    setContext('foo', 1000);
</script>

// child
<script>
    import { getContext } from "svelte";
    let foo = getContext('foo');
</script>
```

Tương tự như vue để truyền dữ liệu từ một component con lên một component cha chúng ta cần sử dụng một emit, trong svelte chúng ta định nghĩa một event và thực hiện truyền dữ liệu lên component cha thông qua event đó
```js
// Child
<script>
    import { createEventDispatcher } from "svelte";
    const emit = createEventDispatcher()
    function toParent()
    {
        emit('fooEvent', 'this is from my child');
    }
</script>
<main>
    <button type="button" on:click={toParent}>
        Click here
    </button>
</main>

// Parent
<script>
    let foo = 'foo in parent';
    function getFromChild(event)
    {
        foo = event.detail;
    }
</script>
<main>
    <Child on:getFromChild={foo} />
</main>
```

## Store
Svelte cung cấp cho chúng ta 3 loại store: Writable, Readable và Derived. Để sử dụng các store chúng ta có thể khai báo chúng và import vào file cần sử dụng. Sử dụng prefix `$` để gọi giá trị hoặc thay đổi giá trị của chúng.

Writable store: có thể thực hiện thay đổi giá trị của một writable store.
```js
import { writable } from 'svelte/store';
export const count = writable(100);
```

Readable store: chỉ có thể thực hiện đọc giá trị của một readable store
```js
import { readable } from 'svelte/store';
export const msg = readable('Hello thep day la svelte tore!');

<main>
    <h1>{$msg}</h1>
</main>
```

Derived store: thực hiện các thay đổi dựa trên các store gốc, chúng ta không thể đổi giá trị của nó một cách trực tiếp.
```js
import { derived } from 'svelte/store';
import { count } from './writeStore';
export const fooCount = derived(count, $count => $count * 5);
```
