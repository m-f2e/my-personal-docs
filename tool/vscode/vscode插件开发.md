# VSCode插件开发

## 1、文档
官方文档：https://code.visualstudio.com/api
中文文档：https://liiked.github.io/VS-Code-Extension-Doc-ZH/#/extension-guides/tree-view
中文文档：https://www.cnblogs.com/liuxianan/p/vscode-plugin-overview.html

## 2、项目搭建
### 2.1、安装依赖
```bash
npm install -g yo generator-code
```

### 2.2、创建项目
```bash
yo code

? What type of extension do you want to create? New Extension (JavaScript)
? What's the name of your extension? MarkdownExample
? What's the identifier of your extension? MarkdownExample
? What's the description of your extension? Full Markdown Example
? Enable JavaScript type checking in 'jsconfig.json'? Yes
? Initialize a git repository? Yes
? Which package manager to use? npm
```

### 2.3、启动项目
运行 `vscode 菜单栏 run -> Start Debugging ` 会弹出的 vscode 窗口，在新窗口中测试。

### 2.4、package.json配置
```json
{
  "name": "vscode-learn", // 插件名称
  "displayName": "VSCode Learn", // 插件显示名称，应用市场显示的名称
  "description": "vscode 学习",
  "version": "0.0.1", // 插件版本
  "publisher": "MisterZhouZhou", // 发布者ID
  "engines": {
    "vscode": "^1.85.0"
  },
  "categories": [ // 插件分类
    "Other"
  ],
  "activationEvents": [ // 插件事件激活事件，在什么条件下插件会被激活
    "onStartupFinished" // 初始化完成时启动
  ],
  "main": "./dist/extension.js", // 插件入口文件
  "contributes": { // 插件贡献点配置
    "commands": [ // 命令，通过Command+Shift+P触发的命令
      {
        "command": "vscode-learn.helloWorld",
        "title": "Hello World"
      }
    ],
    "menus": { // 菜单配置
      "editor/title": [ // 定义菜单出现在编辑标题菜单栏 editorToolbar， 这里会将command对应的标题和icon作为菜单展示的内容
        {
          "group": "navigation", // 菜单分组
          "when": "editorFocus", // 菜单出现的条件，这里是光标出现时
          "alt": "", // 按住alt再选择菜单时应该执行的命令
          "command": "vscodeLearn.helloWorld" // 点击执行的命令
        }
      ],
      "view/item/context": [ // tree item菜单项
				{
					"command": "nodeDependencies.editEntry",
					"when": "view == nodeDependencies && viewItem == dependency" // 指定视图及视图item(treeItem中contextValue = 'dependency';)
				},
				{
					"command": "nodeDependencies.deleteEntry",
					"when": "view == nodeDependencies && viewItem == dependency"
				},
        {
          "command": "jsonOutline.refreshNode",
          "when": "view == jsonOutline",
          "group": "inline" // 一行内显示
        }
      ]
      "commandPalette": [ // 命令面板命令
          {
              "command": "vscodeLearn.helloWorld",
              "when": "editorLangId == markdown"
          }
      ]
    },
    "keybindings": [ // 绑定快捷键
      {
        "key": "ctrl+shift+h", // windows对应的组合键
        "mac": "cmd+shift+h", // mac对应的组合键
        "command": "vscodeLearn.helloWorld", // 执行的命令
        "when": "editorTextFocus" // 快捷键什么时候有效，这里光标出现时
      }
    ],
    "configuration": [ // vscode的settings.json里设置vscode-learn.customPath的值，然后再插件工程中读取用户设置的vscode-learn.customPath的值做对应的逻辑
      {
        "title": "VSCode Learn",
        "properties": {
          "vscode-learn.customPath": {
            "type": "string",
            "default": "",
            "description": "Hello World"
          }
        }
      }
    ],
    "languages": [ // 设置插件语言的后缀名
      {
        "id": "vscodeLearn",
        "extensions": [
          ".zw"
        ],
        "aliases": [
          "vscodeLearn"
        ],
        "configuration": "./language-configuration.json"
      }
    ],
     "grammars": [ // 语法高亮配置
      {
        "language": "id",
        "scopeName": "source.id",
        "path": "./syntaxes/id.tmLanguage.json"
      }
    ]
  },
  "scripts": { // 构建脚本
    "vscode:prepublish": "pnpm run package",
    "compile": "webpack",
    "watch": "webpack --watch",
    "package": "webpack --mode production --devtool hidden-source-map",
    "compile-tests": "tsc -p . --outDir out",
    "watch-tests": "tsc -p . -w --outDir out",
    "pretest": "pnpm run compile-tests && pnpm run compile && pnpm run lint",
    "lint": "eslint src --ext ts",
    "test": "vscode-test"
  },
  "devDependencies": { // 开发依赖
    ...
  }
}
```

## 3、VSCode API使用
官网示例：https://github.dev/Microsoft/vscode-extension-samples/tree/main/tree-view-sample

### 3.1、VSCode内置icon使用
icon地址：https://microsoft.github.io/vscode-codicons/dist/codicon.html
figma地址: https://www.figma.com/community/file/768673354734944365/visual-studio-code-icons

配置文件使用`package.json`
```js
{
  "command": "markdownEnjoy.editor.hyperlink",
  "title": "hyperlink",
  "category": "Markdown Enjoy",
  "icon": "$(link)"
},
```
代码中使用`toolbar.ts`
```js
vscode.commands.registerCommand('hello.options', () => {
  const qpItems: QuickPickItem[] = [
    {
      label: `$(case-sensitive) 标题`,
      detail: '# 标题',
      alwaysShow: true
    },
  ];
});
```

### 3.2、注册命令
`package.json`
```js
"contributes": {
  "commands": [
    {
      "command": "vscode-learn.helloWorld",
      "title": "Hello World"
    }
  ]
},
```
`extension.ts`
```js
let disposable = vscode.commands.registerCommand('vscode-learn.helloWorld', () => {
  vscode.window.showInformationMessage('Hello World from VSCode Learn!');
});
context.subscriptions.push(disposable);
```

### 3.3、打开文件
插件目录文件
```js
import path from 'path';
// 相对路径
vscode.workspace.openTextDocument(path.join(__dirname, '../../example.md')).then(doc => {
    vscode.window.showTextDocument(doc);
});

// 绝对路径
vscode.workspace.openTextDocument(path.join(context.extensionPath, 'src', 'extension.ts')).then((doc) => {
  vscode.window.showTextDocument(doc);
});
```

系统文件
```js
// 只能打开非二进制文件
let uri: vscode.Uri = vscode.Uri.parse('file:///Users/xx/Desktop/README.md');
const doc = await vscode.workspace.openTextDocument(uri);
await vscode.window.showTextDocument(doc);
```

### 3.4、菜单配置
在`package.json`中的`contributes`配置项种配置
```js
"contributes": { // 插件贡献点配置
  "commands": [ // 命令，通过Command+Shift+P触发的命令
    {
      "command": "vscode-learn.helloWorld",
      "title": "Hello World"
    }
  ],
  "menus": { // 菜单配置
    "editor/title": [ // 定义菜单出现在编辑标题菜单栏 editorToolbar， 这里会将command对应的标题和icon作为菜单展示的内容
      {
        "group": "navigation", // 菜单分组
        "when": "editorFocus", // 菜单出现的条件，这里是光标出现时
        "alt": "", // 按住alt再选择菜单时应该执行的命令
        "command": "vscodeLearn.helloWorld" // 点击执行的命令
      }
    ]
  },
}
```
![vscode-plugin-menu](/vscode/vscode-plugn-menu.png)

### 3.5、快捷键
在`package.json`中的`contributes`配置项种配置
```js
"keybindings": [ // 绑定快捷键
  {
    "key": "ctrl+shift+h", // windows对应的组合键
    "mac": "cmd+shift+h", // mac对应的组合键
    "command": "vscodeLearn.helloWorld", // 执行的命令
    "when": "editorTextFocus" // 快捷键什么时候有效，这里光标出现时
  }
]
```

### 3.6、鼠标悬停提示
:::tip
悬停提示的思路是在`extension.ts`中注册一个悬停事件，然后根据提供的docuemnt、position已经文件名，文件路径等信息作出相应的逻辑。

主要API：
`function registerHoverProvider(selector: DocumentSelector, provider: HoverProvider): Disposable`
:::
```js
// 鼠标悬停操作
// selector指定在什么文件类型起作用， json表示在json类型文件上有悬停操作, javascript, 
let hoverProvider = vscode.languages.registerHoverProvider('json', {
  provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
    const fileName = document.fileName;
    let word = document.getText(document.getWordRangeAtPosition(position));
    // 满足package.json && main提示
    if (/\/package\.json$/.test(fileName) && /\bmain\b/.test(word)) {
      return new vscode.Hover(`Hello ${word}!`);
    }
    return undefined;
  }
});
context.subscriptions.push(hoverProvider);
```

```js
// 悬浮操作执行command命令
let hoverProvider = vscode.languages.registerHoverProvider('javascript', {
  provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
    const commentCommandUri = vscode.Uri.parse(`command:editor.action.addCommentLine`);
    const contents = new vscode.MarkdownString(`[Add comment](${commentCommandUri})`);
    // command URIs如果想在Markdown 内容中生效, 你必须设置`isTrusted`。
    contents.isTrusted = true;
    return new vscode.Hover(contents);
  }
});
context.subscriptions.push(hoverProvider);
```

```js
// 悬浮处理git stage
let hoverProvider = vscode.languages.registerHoverProvider('javascript', {
  provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
    const args = [{ resourceUri: document.uri }];
    const commentCommandUri = vscode.Uri.parse(
        `command:git.stage?${encodeURIComponent(JSON.stringify(args))}`
    );
    const contents = new vscode.MarkdownString(`[Stage file](${commentCommandUri})`);
    contents.isTrusted = true;
    return new vscode.Hover(contents);
  }
});
context.subscriptions.push(hoverProvider);
```

### 3.7、代码片段
在`package.json`中的`contributes`配置项种配置
```js
"snippets": [
    {
      "language": "lizard",
      "path": "./snippets.json"
    },
    {
      "language": "javascript",
      "path": "./snippets.json"
    }
  ],
  "languages": [ // 自定义语音类型
    {
      "id": "lizard",
      "aliases": [
        "lizard",
        "Lizard"
      ],
      "extensions": [
        ".lz"
      ]
    }
  ]
```

`snippets.json`
```json
{
  "Console": {
    "prefix": "clg",
    "body": [
      "console.log('$==='${1})"
    ],
    "description": "console log log"
  }
}
```

### 3.8、代码高亮

### 3.8、代码提示
:::tip
registerCompletionItemProvider(selector: DocumentSelector, provider: CompletionItemProvider, ...triggerCharacters: string[]): Disposable;
:::
```js
// 代码提示
// selector 指定在什么文件类型起作用， plaintext, javascript
let completionProvider = vscode.languages.registerCompletionItemProvider('javascript', {
  provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[]> {
    const word = document.getText(document.getWordRangeAtPosition(position));
    const items: vscode.CompletionItem[] = [];
    const completionItem1 = new vscode.CompletionItem('Hello World!');
    const completionItem2 = new vscode.CompletionItem('World Peace!');
    items.push(completionItem1, completionItem2);
    return items;
  }
});
```

### 3.9、内置命令
:::tip 
- editor.action.addCommentLine: 将当前选中行变成注释
- workbench.action.openSettings: 打开设置

- workbench.action.openGlobalSettings: 打开设置文件
- workbench.action.openRecent: 打开最近打开的文件
- workbench.action.openRecentFolder: 打开最近打开的文件夹
- workbench.action.openWorkspaceSettings: 打开工作空间设置文件

:::
#### 3.9.1、执行命令
```js
await vscode.commands.executeCommand('workbench.action.openSettings');
```

### 3.10、when条件
文档： https://code.visualstudio.com/docs/getstarted/keybindings#_when-clause-contexts


### 3.11、TreeView
示例地址：https://github.dev/Microsoft/vscode-extension-samples/tree/main/tree-view-sample

`treeProvider.ts`
```js
import * as vscode from 'vscode';
import * as path from 'path';

class User {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly github: string,
  ) {}
}

class Topic {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly userId: number,
  ) {}
}

export class TreeProvider implements vscode.TreeDataProvider<User | Topic> {
  getTreeItem(element: User | Topic): vscode.TreeItem | Thenable<vscode.TreeItem> {
    if (element instanceof User) {
      const treeItem = new vscode.TreeItem(element.name, vscode.TreeItemCollapsibleState.Collapsed);
      treeItem.iconPath = new vscode.ThemeIcon('account');
      return treeItem;
    }
    const treeItem = new vscode.TreeItem(element.title);
    treeItem.iconPath = new vscode.ThemeIcon('file');
    return treeItem;
  }

  getChildren(element?: User | Topic | undefined): vscode.ProviderResult<(User | Topic)[]> {
    if (!element) {
      const users: User[] = require(path.join(__dirname, '..', 'resource', 'user.json'));
      return users.map((t) => new User(t.id, t.name, t.github));
    }
    const userId = element.id;
    const topics: Topic[] = require(path.join(__dirname, '..', 'resource', 'topic.json'));
    return topics.filter((t) => t.userId === userId).map((t) => new Topic(t.id, t.title, t.userId));
  }
}
```

`package.json`
```json
 "views": {
  "explorer": [
    {
      "id": "treeDemo",
      "name": "Tree Demo"
    }
  ]
},
```

`extension.ts`
```js
const treeProvider = vscode.window.registerTreeDataProvider('treeDemo', new TreeProvider());
context.subscriptions.push(treeProvider);
```

### 3.12、读取configuration配置
```js
// 获取配置值，默认为false
const autoRefresh = vscode.workspace.getConfiguration('jsonOutline').get('autorefresh', false);

// 更新配置, 最后一个参数，为true时表示写入全局配置，为false或不传时则只写入工作区配置
vscode.workspace.getConfiguration().update('jsonOutline.autorefresh', true, true);
```

### 3.13、创建webview
```js
const panel = vscode.window.createWebviewPanel(
  'testWelcome', // viewType
  "自定义欢迎页", // 视图标题
  vscode.ViewColumn.One, // 显示在编辑器的哪个部位
  {
      enableScripts: true, // 启用JS，默认禁用
  }
);
let global = { panel };
panel.webview.html = fs.readFileSync(path.join(__dirname, 'view', 'custom-welcome.html'), 'utf-8');
panel.webview.onDidReceiveMessage(message => {
    console.log('message',message);
}, undefined, context.subscriptions);
```

## 4、打包
官网构建文档：
[publishing-extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

### 4.1、准备工作 
1. 修改`package.json`，设置项目发行者和图标
  ```
  "publisher": "xxx",
  "icon": "icon.png"
  ```
2. 安装 vsce

:::tip vsce 是 "Visual Studio Code Extensions "的缩写，是用于打包、发布和管理 VS Code 插件的命令行工具。
:::
```bash
npm install -g vsce
```

### 4.2、打包
```bash
vsce package
```
项目根目录出现插件安装文件 `xx-0.0.1.vsix` 

:::warning 注意：
  1. 必需修改 README.md 文件后才允许打包
  2. 尽量使用npm（踩坑使用pnpm时vsce打包失败）
  3. xxx.vsix文件直接拖到extensions tab下可以完成本地安装
:::

## 5、发布
### 5.1、创建publisher
  * 登录 [Extensions for Visual Studio](https://marketplace.visualstudio.com/)  -> Publish extensions -> Create publiser

```
// 输入Name和ID，Logo, 点击Create按钮

Name：Xx Zw // 插件开发者名称, 插件会展示开发者Xx Zw
ID：MisterZhouZhou // 组织名称,插件会展示misterzhouzhou.markdown-enjoy
```

2. 手动发布方式：管理平台手动发布 
  * [Extensions for Visual Studio](https://marketplace.visualstudio.com/)  -> Publish extensions -> +New ezxtension -> Visual Studio Code -> 上传 `MarkdownExample-0.0.1.vsix`  文件


3. 自动发布方式：vsce 命令直接发布 
* 创建 Token 
  [azure DevOps](https://dev.azure.com/) -> User settings -> Personal Access Tokens

  ```
  Name: Markdown Enjoy
  Organization: ID：MisterZhouZhou
  Expiration: 30 days
  Scopes: Full access
  ```

* 终端 vsce 登录验证
  ```
  vsce login MisterZhouZhou
  输入前面创建的 Personal Access Tokens
  ```

* 执行发布
  ```bash
  vsce publish
  ```
  
