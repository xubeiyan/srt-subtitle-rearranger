<script>
  import { save } from "@tauri-apps/plugin-dialog";
  import { writeTextFile } from "@tauri-apps/plugin-fs";
  let srtFileUpload = null;
  // 当期状态
  let stage = "toUploadSRTFile";
  // 字幕
  let subtitleContent = [];
  let rearranged = [];
  let outputContent = "";
  // 文件位置
  let fileLocation = "";

  // 打开文件选择
  const openSelectFile = () => {
    if (srtFileUpload == null) return;
    srtFileUpload.click();
  };

  // 分解文件内容
  const srtContentConverter = (text) => {
    const textArray = text.split("\r\n");
    let results = [];
    let one = {};
    let para = "wait_index";
    for (let i = 0; i < textArray.length; ++i) {
      // 如果是数字则开始新的处理
      const digitRegex = /^\d{1,5}/;
      if (digitRegex.test(textArray[i]) && para == "wait_index") {
        para = "wait_time";
        continue;
      }

      // 如果是时间
      const timeRegex = /^\d{2}:\d{2}:\d{2}.\d{3}/;
      if (timeRegex.test(textArray[i]) && para == "wait_time") {
        const time = textArray[i].split("-->");
        one.startTime = time[0].trim();
        one.endTime = time[1].trim();
        const [hour, min, sec] = one.startTime.split(":");
        one.timestamp = Number(hour) * 3600 + Number(min) * 60 + Number(sec);
        para = "wait_content";
        continue;
      }

      // 如果是换行
      if (textArray[i] == "") {
        para = "wait_index";
        results.push(one);
        one = {};
        continue;
      }

      // 普通内容
      if (para == "wait_content") {
        if (one.content == undefined) {
          one.content = [textArray[i]];
        } else {
          one.content.push(textArray[i]);
        }
      }
    }

    // 将最后的内容也放入result
    if (one.timestamp !== undefined) {
      results.push(one);
    }

    return results;
  };

  // 处理上传文件
  const handleFileInput = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.addEventListener("loadend", (e) => {
      subtitleContent = srtContentConverter(e.target.result);
      rearranged = subtitleContent.toSorted((a, b) => {
        if (a.timestamp > b.timestamp) return 1;
        else return -1;
      });
      rearranged.forEach((one, index) => {
        outputContent += `${index + 1}\r\n${one.startTime} --> ${one.endTime}\r\n${one.content.join("\r\n")}\r\n\r\n`;
      });
      stage = "rearrangeComplete";
    });
  };

  // 保存文件
  const saveSRTfile = async () => {
    const filePath = await save({
      filters: [
        {
          name: "SRT file",
          extensions: ["srt"],
        },
      ],
    });

    fileLocation = filePath;

    await writeTextFile(filePath, outputContent);
    stage = "saved";
  };

  // 重置
  const reset = () => {
    stage = "toUploadSRTFile";
    outputContent = "";
    if (srtFileUpload == null) return;
    srtFileUpload.value = null;
  };
</script>

<div class="p-2 grow flex flex-col justify-center items-center">
  {#if stage == "toUploadSRTFile"}
    <div class="w-full text-center mb-4">
      <h1 class="text-xl font-bold text-balance">
        Some software apps only support subtitle files arranged by start time,
        This tool will rearrange each subtitle's timing based on the start time.
      </h1>
    </div>
    <button
      class="border-4 border-neutral-400 border-dashed rounded-lg p-4 hover:bg-slate-100"
      on:click={() => openSelectFile()}
      >1. Click to open your SRT subtitle file</button
    >
    <input
      bind:this={srtFileUpload}
      type="file"
      on:input={(e) => handleFileInput(e)}
      class="hidden"
      accept=".srt"
    />
  {:else if stage == "rearrangeComplete"}
    <div class="w-full text-center mb-4">
      <h1 class="text-lg">2. Rearrange Complete</h1>
    </div>
    <button
      class="border-4 border-neutral-400 rounded-lg p-4 hover:bg-slate-100"
      on:click={() => saveSRTfile()}>Click this button to save it</button
    >
  {:else if stage == "saved"}
    <div class="w-full text-center mb-2">
      <h1 class="text-lg">3. SRT Subtitle File Saved</h1>
      <h5 class="text-slate-600">File Location: {fileLocation}</h5>
    </div>
    <button class="text-blue-400 hover:text-blue-500" on:click={() => reset()}
      >Rearrange more? Click here</button
    >
  {/if}
</div>
