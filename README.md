# Bé Vui Học - Educational Game for Kids

<p style="display: flex; flex-wrap: wrap; gap: 4px">
  <img alt="react" src="https://img.shields.io/github/package-json/dependency-version/pin705/be_vui_hoc/react" />
  <img alt="zmp-ui" src="https://img.shields.io/github/package-json/dependency-version/pin705/be_vui_hoc/zmp-ui" />
  <img alt="zmp-sdk" src="https://img.shields.io/github/package-json/dependency-version/pin705/be_vui_hoc/zmp-sdk" />
  <img alt="recoil" src="https://img.shields.io/github/package-json/dependency-version/pin705/be_vui_hoc/recoil" />
  <img alt="tailwindcss" src="https://img.shields.io/github/package-json/dependency-version/pin705/be_vui_hoc/dev/tailwindcss" />
</p>

Ứng dụng trò chơi giáo dục tương tác trên Zalo Mini App, giúp trẻ em 4-7 tuổi học hỏi và phát triển các kỹ năng cơ bản.

## 🎮 Tính Năng Chính

- **Nhận Biết Hình Dạng:** Kéo và thả hình dạng vào đúng vị trí
- **Truy Tìm Chữ Cái:** Tìm chữ cái được hiển thị
- **Đếm & Tô Màu:** Đếm số lượng vật thể và tô màu
- **Hệ thống sao:** Theo dõi tiến độ học tập
- **Giao diện thân thiện:** Màu sắc dịu nhẹ, phù hợp cho trẻ em

## 📖 Xem Tài Liệu Chi Tiết

Để biết thêm thông tin về concept, tính năng, cấu trúc code và thiết kế UI/UX, xem file [GAME_DOCUMENTATION.md](./GAME_DOCUMENTATION.md)

## 🚀 Setup

### Using Zalo Mini App Extension

1. Install [Visual Studio Code](https://code.visualstudio.com/download) and [Zalo Mini App Extension](https://mini.zalo.me/docs/dev-tools).
1. Click on **Create Project** > Choose a template > Import this project
1. **Configure App ID** and **Install Dependencies**, then navigate to the **Run** panel > **Start** to develop your Mini App 🚀


### Using Zalo Mini App Studio

1. [Install Zalo Mini App Studio](https://mini.zalo.me/docs/dev-tools)
1. Import this project into Zalo Mini App Studio
1. Enter your Mini App ID
1. Wait until the project is ready and click the Start button to run the mini app 🚀

### Using Zalo Mini App CLI

1. [Install Node JS](https://nodejs.org/en/download/)
1. [Install Mini App DevTools CLI](https://mini.zalo.me/docs/dev-tools/cli/intro/)
1. Download or clone this repository
1. Install dependencies

   ```bash
   npm install
   ```

1. Start dev server using `zmp-cli`

   ```bash
   zmp start
   ```

1. Open `localhost:3000` on your browser and start coding 🔥

## Deployment

1. Create a mini app. For instruction on how to create a mini app, please refer to [Zalo Mini App Documentation](https://mini.zalo.me/docs)

1. Deploy your mini app to Zalo using the mini app ID created in step 1.

   If you're using `zmp-cli`:

   ```bash
   zmp login
   zmp deploy
   ```

1. Scan the QR code using Zalo to preview your mini app.

## Usage:

The repository contains an educational game application for children. Main features:

- **3 Educational Mini-Games**: Shape recognition, letter finding, counting and coloring
- **Progress Tracking**: Star-based scoring system
- **Child-Friendly UI**: Safe, colorful, and intuitive interface

Folder structure:

- **`src`**: Contains all the logic source code of your Mini App. Inside the `src` folder:

  - **`components`**: Reusable components written in React.JS.
  - **`css`**: Tailwind CSS and custom stylesheets
  - **`pages/games`**: Game pages (shapes, letters, counting)
  - **`state`**: State management with Recoil
  - **`types`**: TypeScript type declarations for games
  - **`utils`**: Utility functions
  - **`app.ts`**: Entry point of your Mini App.
  - **`global.d.ts`**: TypeScript declarations for third-party modules.
  - **`hooks.ts`**: Custom React hooks.

- **`app-config.json`**: [Global configuration](https://mini.zalo.me/intro/getting-started/app-config/) for your Mini App.

The other files (such as `tailwind.config.js`, `vite.config.ts`, `tsconfig.json`) are configurations for libraries used in your application.

## Customizations

### Changing app's name

Just change the `app.title` property in `app-config.json`:

```json
{
  "app": {
    "title": "Bé Vui Học"
  }
}
```

### Changing app's logo

Visit [Zalo Mini App](https://mini.zalo.me/) and go to your mini app's settings to change the logo.

### Primary Color

You can customize the primary color in `app-config.json`:

```json
{
  "template": {
    "primaryColor": "#FF6B9D"
  }
}
```

## 🎯 Target Audience

Children aged 4-7 years old (Preschool and early elementary)

## 🔒 Safety Features

- ✅ No advertisements
- ✅ No external links  
- ✅ Child-safe interface
- ✅ Simple, intuitive design
- ✅ Gentle, eye-friendly colors

## License

Copyright (c) 2024. All rights reserved.

Educational game application for children.
