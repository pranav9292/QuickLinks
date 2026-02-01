# QuickLinks - Shortcuts Hub

A modern, beautiful React-based shortcuts management application with a stunning dark theme design.

## Features

✨ **Core Features**
- Add, edit, and delete categories with custom icons and colors
- Add and delete shortcuts with auto-fetched favicons
- Real-time search across all shortcuts
- Export/Import data as JSON for backup
- Reset to default configuration
- LocalStorage persistence

🎨 **Design Features**
- Dark glassmorphic UI with gradient backgrounds
- Smooth animations and transitions
- Floating action button with hover effects
- Custom Outfit font family for premium look
- Color-coded categories with accent colors
- Fully responsive grid layout

## Project Structure

```
quicklinks-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AddCategoryForm.jsx
│   │   ├── AddShortcutForm.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── EditCategoryForm.jsx
│   │   ├── EmptyState.jsx
│   │   ├── Modal.jsx
│   │   └── ShortcutCard.jsx
│   ├── data/
│   │   └── defaultData.js
│   ├── styles/
│   │   ├── App.css
│   │   ├── CategoryCard.css
│   │   ├── EmptyState.css
│   │   ├── Forms.css
│   │   ├── Modal.css
│   │   └── ShortcutCard.css
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   └── index.jsx
└── package.json
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Build for production:**
   ```bash
   npm build
   ```

## Usage

### Adding a Shortcut
1. Click the floating `+` button in the bottom-right corner
2. Enter the name and URL of the shortcut
3. Select a category
4. Click "Add Shortcut"

### Adding a Category
1. Click the "Add Category" button in the top controls
2. Enter category name, icon (emoji), and accent color
3. Click "Add Category"

### Editing a Category
1. Click the edit icon (✏️) on any category card
2. Modify the name, icon, or color
3. Click "Save Changes"

### Searching
- Use the search bar at the top to filter shortcuts by name or URL
- Results update in real-time as you type

### Export/Import
- **Export:** Click the "Export" button to download your shortcuts as JSON
- **Import:** Click the "Import" button and select a JSON file to restore

### Reset
- Click the "Reset" button to restore default categories and shortcuts

## Technologies Used

- **React** - UI library
- **Lucide React** - Icon library
- **CSS3** - Styling with animations
- **LocalStorage** - Data persistence

## Customization

### Changing Default Data
Edit `src/data/defaultData.js` to modify the initial categories and shortcuts.

### Modifying Styles
- Global styles: `src/styles/App.css`
- Component-specific styles: Individual CSS files in `src/styles/`

### Adding New Features
1. Create new components in `src/components/`
2. Add corresponding styles in `src/styles/`
3. Import and use in `App.jsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Created with ❤️ using React and modern web technologies.