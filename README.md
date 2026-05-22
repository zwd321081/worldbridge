# Chrome 选词翻译插件

WordBridge 是一个 Manifest V3 Chrome 扩展。选中网页文字后，它会调用 OpenAI 兼容的聊天接口，按源语言和目标语言设置翻译或解释，并显示音标、例句、近义词和语音播放按钮。

## 界面预览

![WordBridge 设置界面](docs/settings.png)

## 功能

- 选中网页文字后自动弹出翻译浮窗
- 可在设置页启用或禁用选词翻译
- 设置页支持简中、繁中、英文、日文、韩文、法文、德文、西文、葡文、意文、俄文、阿语、印地语、越南语、泰语界面
- 可配置源语言和目标语言，源语言支持自动识别
- 英文到英文时会用简单英文解释
- 其他语言方向会按目标语言翻译并给出简短说明
- 显示 IPA 音标、简单例句、候选表达
- 使用浏览器自带语音朗读
- 可配置 OpenAI 兼容 `baseUrl`、`apiKey`、聊天模型和翻译语言

## 安装

1. 打开 Chrome 的 `chrome://extensions`
2. 打开右上角“开发者模式”
3. 点击“加载已解压的扩展程序”
4. 选择当前目录：`/Users/zwd321081/Documents/cloudmusic/projects/worldbridge`
5. 点击扩展图标，填写接口配置并保存

## 接口配置

默认配置：

- `API Base URL`: `https://api.openai.com/v1`
- `聊天模型`: `gpt-4o-mini`

如果使用其他 OpenAI 兼容服务，把 `API Base URL` 改成该服务的 `/v1` 地址，并填写对应模型名和 Key。

## 文件结构

- `manifest.json`: Chrome 扩展声明
- `icons/`: WordBridge 图标源文件和 Chrome 图标尺寸
- `background.js`: 调用大模型翻译并提供浏览器朗读语言
- `content.js`: 监听页面选词并渲染浮窗
- `content.css`: 内容脚本隔离样式
- `options.html`: 设置页
- `options.css`: 设置页样式
- `options.js`: 设置保存和接口测试

## 注意

API Key 和接口配置保存在 Chrome 扩展的同步存储 `chrome.storage.sync` 中，不会写入本项目文件。若 Chrome 开启账号同步，这些配置可能同步到同一账号的其他 Chrome 浏览器。适合个人使用，不要把带有真实 Key 的浏览器配置或打包扩展分享给别人。
