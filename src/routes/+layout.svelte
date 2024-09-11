<script>
  import "../app.css";
  import Header from "../components/Header.svelte";
</script>

<div class="flex flex-col h-screen">
    <Header />
    <slot />
</div>
