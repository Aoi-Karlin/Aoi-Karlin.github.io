# Abyss's Space

> 基于终末地工业编辑风的个人网站 | Personal Website with Endfield Industrial-Editorial Style

一个采用《明日方舟：终末地》工业编辑风格设计的个人空间网站，包含关于、公告、致谢、赞助和联系等模块。

## 特性

- ✅ **L1 等级完整实现**：含开屏三阶段动画 + 终末地配色
- ✅ **工业编辑风设计**：全直角、等宽字体、角标刻线、切角按钮、HUD 元素
- ✅ **开屏三阶段动画**：充填 → 右滑 → 渐显，带百分比读数与 HUD 界面
- ✅ **双语支持**：中文/英文切换，所有文案通过 i18n 管理
- ✅ **响应式设计**：完整的移动端适配（≤768px 断点）
- ✅ **无障碍支持**：`prefers-reduced-motion` 降级处理
- ✅ **5 个功能模块**：About / Announcements / Thanks / Sponsor / Contact

## 快速开始

1. 克隆或下载本项目
2. 使用本地服务器打开：

```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# VS Code Live Server
# 右键 index.html → Open with Live Server
```

3. 在浏览器中访问 `http://localhost:8000`

## 文件结构

```
Abyss's Blog/
├── index.html      # 主页面结构
├── styles.css      # 完整样式（设计令牌 + 组件样式）
├── script.js       # 加载动画、导航、交互逻辑
├── i18n.js         # 国际化控制器与翻译资源
├── SKILL.md        # 终末地风格技能文档
└── README.md       # 本文件
```

## 设计系统

### 颜色令牌

采用终末地标准配色：

- **背景层级**：`#101110` / `#181a18` / `#1e201d`
- **文字层级**：`#f5f5f0` / `#898d89` / `#5a5d59`
- **强调色**：`#fff500`（黄色）
- **信号色**：粉/蓝/红/绿/橙/青/紫/钢灰

### 形态语言

- 全直角（`border-radius: 0`）
- 等宽数字与代码字体
- 72px 工程网格背景
- L 形角标刻线
- 描边空心序号 + 等宽注记
- 切角按钮（右上角 14px 切角）
- 黄黑警示条纹分隔
- HUD 元素（坐标/REC 闪烁/取景刻线/滚动提示）

### 开屏三阶段

1. **充填**（1900ms）：左侧竖条加载 + 底部进度线 + 百分比读数
2. **右滑**（780ms）：遮罩整体右滑退场，强调色前缘扫场
3. **渐显**：首屏元素逐个淡入（每项延迟 110ms）

## 自定义

### 修改个人信息

编辑 `i18n.js` 中的翻译内容：

```javascript
'about.title': '你的名字',
'about.subtitle': '你的职业/身份',
'about.bio.p1': '你的介绍段落1',
// ...
```

### 修改联系方式

编辑 `index.html` 中的 Contact Section：

```html
<a href="mailto:your@email.com" class="contact-item">
    <!-- ... -->
    <span class="contact-item__value">your@email.com</span>
</a>
```

### 修改公告内容

编辑 `index.html` 中的 Announcements Section 以及 `i18n.js` 中对应的翻译键。

### 调整配色

如需保留形态语言但使用自己的配色，修改 `styles.css` 中的 `:root` 颜色令牌即可。

### 禁用开屏动画

在 `script.js` 的 `LoaderAnimation` 类中，将 `skipAnimation()` 方法设为默认执行：

```javascript
init() {
    this.skipAnimation();
    return;
}
```

## 浏览器兼容性

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

需要支持：
- CSS Grid
- CSS Custom Properties
- CSS `clip-path`
- CSS `backdrop-filter`
- ES6+ JavaScript

## 致谢

- [明日方舟：终末地](https://endfield.hypergryph.com) - 设计灵感来源
- [dsh-theme-endfield](https://github.com/ymh0000123/dsh-theme-endfield) - 设计语言参考

## 许可证

MIT License

---

**提示**：本项目遵循终末地工业编辑风设计规范，所有改动请保持风格一致性。
