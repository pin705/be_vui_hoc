# Bé Vui Học (Kids' Fun Learning Adventure)

## 🎯 Mô Tả Concept

**Tên ứng dụng:** Bé Vui Học  
**Đối tượng:** Trẻ em Mầm non và Đầu cấp 1 (từ 4 đến 7 tuổi)

### Mục Tiêu Chính
- Phát triển kỹ năng nhận biết **Màu sắc, Hình dạng, Chữ cái (Tiếng Anh), và Số đếm (1-10)**
- Thúc đẩy sự phối hợp giữa mắt và tay
- Tạo môi trường học tập **vui vẻ, không căng thẳng**

### Tone & Cảm Xúc
Vui vẻ, thân thiện, khuyến khích, an toàn, và dễ thương

### Lợi Ích
- **Cho trẻ em:** Học hỏi trong vui chơi, phát triển kỹ năng cơ bản
- **Cho phụ huynh:** Công cụ giáo dục tin cậy, an toàn, không quảng cáo
- **Cho giáo viên:** Hỗ trợ giảng dạy tương tác

---

## 💡 Tính Năng Cốt Lõi

### 3 Trò Chơi Mini Chính

| Trò Chơi | Mục Tiêu | Cơ Chế | Route |
|----------|----------|--------|-------|
| **1. Nhận Biết Hình Dạng** | Phân biệt hình tròn, vuông, tam giác, ngôi sao | Tap để chọn và thả vào ô đúng | `/game/shapes` |
| **2. Truy Tìm Chữ Cái** | Nhận diện chữ cái ABC | Tap vào chữ cái được hiển thị | `/game/letters` |
| **3. Đếm & Tô Màu** | Đếm số từ 1-10 và nhận biết màu | Đếm vật thể, chọn số, tô màu | `/game/counting` |

---

## 📱 Sơ Đồ Cấu Trúc Ứng Dụng (App Flow)

```
Màn hình chính (/)
    ↓
Chọn Trò chơi
    ↓
┌───────────────┬──────────────┬────────────────┐
│ Hình Dạng     │ Chữ Cái     │ Đếm & Tô Màu   │
└───────────────┴──────────────┴────────────────┘
    ↓
Màn hình Trò chơi
    ↓
Màn hình Khen thưởng (🎉 Tuyệt vời!)
    ↓
[Chơi lại] [Về trang chủ]
```

---

## ⚙️ Cấu Trúc Code

### Công Nghệ Sử Dụng
- **Framework:** React 18.2.0
- **Language:** TypeScript
- **UI Components:** Zalo UI (zmp-ui) v1.11.5
- **State Management:** Recoil v0.7.7
- **Routing:** React Router DOM v6.8.2
- **Styling:** Tailwind CSS v3.4.10
- **Build Tool:** Vite v2.9.18

### Cấu Trúc Thư Mục

```
src/
├── components/
│   ├── app.tsx                 # Root App component
│   ├── config-provider.tsx     # Theme configuration
│   ├── layout.tsx              # Main layout with routing
│   ├── scroll-restoration.tsx  # Scroll behavior
│   └── divider.tsx            # Divider component
├── pages/
│   └── games/
│       ├── index.tsx          # Game home page (danh sách game)
│       ├── shapes.tsx         # Nhận Biết Hình Dạng game
│       ├── letters.tsx        # Truy Tìm Chữ Cái game
│       └── counting.tsx       # Đếm & Tô Màu game
├── state/
│   └── game-state.ts          # Recoil atoms & selectors cho game
├── types/
│   └── game.ts                # TypeScript interfaces
├── utils/
│   └── config.ts              # Configuration utilities
├── css/
│   ├── tailwind.css          # Tailwind input
│   ├── styles.css            # Generated CSS
│   └── app.scss              # Custom SCSS
├── static/                    # Static assets
├── app.ts                     # Entry point
├── state.ts                   # User state management
├── hooks.ts                   # Custom React hooks
└── global.d.ts               # Global type declarations
```

### Component Chi Tiết

#### 1. Màn Hình Chính (`/pages/games/index.tsx`)
**Chức năng:**
- Hiển thị danh sách 3 game cards
- Hiển thị tổng số sao đã đạt được
- Navigation đến từng game

**Components chính:**
- `GameCard`: Card hiển thị thông tin game với icon, title, description

#### 2. Game Nhận Biết Hình Dạng (`/pages/games/shapes.tsx`)
**Chức năng:**
- Hiển thị 4 drop zones cho 4 hình dạng
- Draggable shapes để người chơi chọn
- Kiểm tra đúng/sai khi thả hình
- Tính điểm và hiển thị kết quả

**State:**
- `dropZones`: Trạng thái các ô thả hình
- `draggedShape`: Hình đang được chọn
- `score`: Điểm số hiện tại
- `gameComplete`: Trạng thái hoàn thành game

#### 3. Game Truy Tìm Chữ Cái (`/pages/games/letters.tsx`)
**Chức năng:**
- Hiển thị chữ cái target lớn
- 4 options để chọn (1 đúng, 3 sai)
- Feedback ngay lập tức (đúng/sai)
- Tự động chuyển câu tiếp theo

**State:**
- `currentLetterIndex`: Chữ cái hiện tại
- `shuffledLetters`: Các options đã shuffle
- `showFeedback`: Hiển thị feedback
- `score`: Điểm số

#### 4. Game Đếm & Tô Màu (`/pages/games/counting.tsx`)
**Chức năng:**
- Step 1: Đếm số lượng vật thể và chọn số đúng
- Step 2: Chọn màu và tô cho vật thể
- 8 levels với độ khó tăng dần

**State:**
- `currentLevel`: Level hiện tại
- `step`: 'count' hoặc 'color'
- `selectedNumber`: Số được chọn
- `selectedColor`: Màu được chọn
- `coloredItems`: Trạng thái các item đã tô màu

### State Management (`/state/game-state.ts`)

#### Atoms
- `gamesState`: Danh sách 3 game
- `gameScoresState`: Lịch sử điểm của các game
- `currentGameState`: Game đang chơi
- `shapesDataState`: Data cho game hình dạng
- `lettersDataState`: Data cho game chữ cái (A-H)
- `colorsDataState`: Data cho game màu sắc
- `soundEnabledState`: Bật/tắt âm thanh

#### Selectors
- `totalStarsState`: Tổng số sao đã đạt được

### Types (`/types/game.ts`)

```typescript
interface GameScore {
  gameId: string;
  score: number;
  maxScore: number;
  stars: number;  // 1-3 sao
  completedAt: Date;
}

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;      // Emoji
  color: string;     // Hex color
  route: string;
}
```

---

## 🎨 Thiết Kế UI/UX

### Màu Sắc
- **Primary Color:** `#FF6B9D` (Hồng pastel)
- **Game 1 (Shapes):** `#FFB6C1` (Hồng nhạt)
- **Game 2 (Letters):** `#87CEEB` (Xanh dương nhạt)
- **Game 3 (Counting):** `#98FB98` (Xanh lá nhạt)
- **Success:** `#4CAF50` (Xanh lá)
- **Error:** `#F44336` (Đỏ)

### Đặc Điểm An Toàn
✅ **Không có quảng cáo**  
✅ **Không có liên kết ngoài**  
✅ **Giao diện đơn giản, trực quan**  
✅ **Sử dụng biểu tượng và emoji thay vì text phức tạp**  
✅ **Màu sắc dịu nhẹ, không gây mỏi mắt**

### Phản Hồi Tích Cực
- 🎉 Emoji lớn khi hoàn thành
- ✅ Màu xanh cho đáp án đúng
- ❌ Màu đỏ cho đáp án sai (chớp nhanh)
- ⭐ Hệ thống sao (1-3 sao)
- 🏆 Động viên bằng text: "Tuyệt vời!", "Xuất sắc!"

---

## 📦 Assets Cần Thiết

### Hình Dạng (Built-in với CSS/SVG)
- ⭕ Hình tròn (Circle)
- ⬜ Hình vuông (Square)
- 🔺 Hình tam giác (Triangle)
- ⭐ Hình ngôi sao (Star emoji)

### Chữ Cái
- 8 chữ cái tiếng Anh: A, B, C, D, E, F, G, H

### Vật Thể Đếm (Emojis)
- 🍎 Táo
- 🍌 Chuối
- 🍓 Dâu
- 🍊 Cam
- 🍇 Nho
- 🥕 Cà rốt
- 🌽 Bắp
- 🍒 Cherry

### Màu Sắc
- Đỏ (#FF0000)
- Xanh lá (#00FF00)
- Xanh dương (#0000FF)
- Vàng (#FFFF00)
- Cam (#FFA500)
- Tím (#800080)

### Âm Thanh (Tương lai)
- ✅ Âm thanh đúng
- ❌ Âm thanh sai
- 🎉 Âm thanh hoàn thành
- 🎵 Nhạc nền nhẹ nhàng

---

## 🚀 Cài Đặt và Chạy

### Yêu Cầu
- Node.js >= 14
- npm hoặc yarn
- Zalo Mini App DevTools

### Cài Đặt Dependencies
```bash
npm install
```

### Chạy Development Server
```bash
npm start
```

### Build CSS
```bash
npm run build:css
```

### Deploy lên Zalo
```bash
npm run deploy
```

---

## 📋 Checklist Tuân Thủ Zalo UI

✅ **Sử dụng Zalo UI Components:**
- `Page`, `Box`, `Text`, `Button` từ `zmp-ui`
- `BottomNavigation` (đã loại bỏ vì app dạng game)
- Không sử dụng icon nhựa hay UI nhựa

✅ **Responsive Design:**
- Sử dụng Tailwind CSS cho responsive
- Grid layout cho danh sách games
- Touch-friendly buttons (kích thước lớn)

✅ **Performance:**
- Code splitting với React Router
- Lazy loading components khi cần
- Optimized với Vite

---

## 📊 Hệ Thống Điểm & Sao

### Cách Tính Sao
- **3 sao:** Hoàn thành hoàn hảo (100%)
- **2 sao:** Hoàn thành tốt (>=60%)
- **1 sao:** Hoàn thành cơ bản (>0%)

### Game Shapes
- Maxscore: 4
- 3 sao: 4/4 đúng
- 2 sao: 3/4 đúng
- 1 sao: <3 đúng

### Game Letters
- Maxscore: 8
- 3 sao: >=7/8 đúng
- 2 sao: >=5/8 đúng
- 1 sao: <5 đúng

### Game Counting
- Maxscore: 8 levels
- 3 sao: >=7/8 levels
- 2 sao: >=5/8 levels
- 1 sao: <5 levels

---

## 🔮 Tính Năng Tương Lai

- [ ] Thêm âm thanh và hiệu ứng
- [ ] Thêm nhiều chữ cái (A-Z)
- [ ] Thêm số đếm lớn hơn (1-20)
- [ ] Thêm game mới: Ghép hình puzzle
- [ ] Thêm game mới: Nhớ thứ tự
- [ ] Leaderboard cho trẻ em
- [ ] Chế độ nhiều người chơi
- [ ] Thêm animation mượt mà hơn
- [ ] Tích hợp Text-to-Speech cho phát âm
- [ ] Parent dashboard để theo dõi tiến độ

---

## 📝 License

Copyright (c) 2024. All rights reserved.
Ứng dụng giáo dục cho trẻ em - Bé Vui Học

---

## 👨‍💻 Development Notes

### Tuân Thủ Yêu Cầu
✅ Sử dụng Zalo UI components  
✅ Không sử dụng icon nhựa  
✅ Không sử dụng UI nhựa  
✅ Giao diện thân thiện, an toàn cho trẻ em  
✅ Xóa các file không còn sử dụng từ template  

### Technology Stack
- React + TypeScript: Đảm bảo type-safe
- Recoil: State management đơn giản, dễ mở rộng
- Tailwind CSS: Utility-first CSS framework
- Zalo UI: Native components cho Zalo Mini App

### Code Quality
- TypeScript strict mode
- Component-based architecture
- Reusable state management
- Clean folder structure
