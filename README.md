# SRT Subtitle Rearranger

有些设备必须按顺序播放出现的字幕，这个工具就是用来调整现有字幕 `srt` 文件的

就是将这样的乱序 `srt` 字幕文件
```
1
00:00:01,123 --> 00:00:03,321
你是谁？

2
00:00:10,789 --> 00:00:13,987
好吧，我以为你有名字

3
00:00:05,456 --> 00:00:08,654
抱歉，我也不知道我是谁

```

调整为
```
1
00:00:01,123 --> 00:00:03,321
你是谁？

2
00:00:05,456 --> 00:00:08,654
抱歉，我也不知道我是谁

3
00:00:10,789 --> 00:00:13,987
好吧，我以为你有名字

```


## 使用技术

* 使用 [Tauri v2](https://v2.tauri.app/) 框架开发
    * 后端使用 [Rust](https://www.rust-lang.org/)
    * 前端
        * 框架使用 [Svelte v4](https://svelte.dev/)
        * 生成工具链使用 [Vite](https://vitejs.dev/)
        * CSS框架使用 [TailwindCSS](https://tailwindcss.com/)

## 自己构建

### 预安装组件

请参考 https://v2.tauri.app/start/prerequisites/

### 本项目

1. 克隆本项目

```shell
git clone https://github.com/xubeiyan/srt-subtitle-rearranger
```

2. 安装依赖

```shell
pnpm i
```

3. 开始开发

```shell
pnpm tauri dev
```

4. 开始构建

```shell
pnpm tauri build
```