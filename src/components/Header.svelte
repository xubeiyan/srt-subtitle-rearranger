<script>
  import CloseIcon from "../assets/svg-icon/close.svelte";
  import { Window } from "@tauri-apps/api/window";

  const appWindow = new Window("main");
  let closeButtonHover = false;
</script>

<header
  data-tauri-drag-region
  class="w-full h-[2em] relative flex justify-center items-center bg-slate-100"
>
  <div></div>
  <span class=" pointer-events-none">SRT Subtitle Rearranger</span>
  <div class="absolute right-1 top-1">
    <button
      class="bg-red-300 hover:bg-red-400 size-[1.5em] rounded-full flex justify-center items-center"
      on:focus={() => (closeButtonHover = true)}
      on:mouseover={() => (closeButtonHover = true)}
      on:mouseleave={() => (closeButtonHover = false)}
      on:click={() => appWindow.close()}
    >
      <CloseIcon hover={closeButtonHover} />
    </button>
  </div>
</header>
