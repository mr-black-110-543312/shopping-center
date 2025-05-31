# Shopping Center - E-commerce Website

A complete e-commerce website built with HTML, CSS, and JavaScript, featuring a full admin panel for product management.

## Features

### Customer Features
- 🛒 **Shopping Cart**: Add, remove, and manage items
- 🔍 **Product Search**: Search products by name, description, or category
- 📱 **Responsive Design**: Works on all devices
- 🎨 **Modern UI**: Clean and intuitive interface
- ⏰ **Special Offers**: Countdown timer for limited-time deals
- 📧 **Newsletter**: Email subscription
- 💝 **Wishlist**: Save favorite products
- 📦 **Stock Management**: Real-time stock availability

### Admin Features
- ➕ **Add Products**: Easy product creation form
- ✏️ **Edit Products**: Update existing products
- 🗑️ **Delete Products**: Remove products from catalog
- 📊 **Analytics**: View store statistics
- 📁 **Data Management**: Import/export product data
- 🏷️ **Category Management**: Organize products by categories
- ⚙️ **Settings**: Configure store information

## Project Structure

\`\`\`
shopping-center/
├── index.html              # Main store page
├── admin.html              # Admin panel
├── css/
│   ├── styles.css          # Main store styles
│   └── admin-styles.css    # Admin panel styles
├── js/
│   ├── script.js           # Main store functionality
│   └── admin-script.js     # Admin panel functionality
├── favicon.ico             # Website icon
└── README.md              # This file
\`\`\`

## Getting Started

### Local Development

1. **Clone or download** this repository
2. **Open `index.html`** in your web browser to view the store
3. **Open `admin.html`** to access the admin panel
4. **Start adding products** through the admin panel

### Deploy to Vercel

1. **Create a Vercel account** at [vercel.com](https://vercel.com)
2. **Upload your project** to GitHub
3. **Connect your GitHub repository** to Vercel
4. **Deploy** - Your site will be available at `your-project.vercel.app`

### Deploy to GitHub Pages

1. **Upload your project** to a GitHub repository
2. **Go to Settings** > Pages in your repository
3. **Select source** as "Deploy from a branch"
4. **Choose main branch** and root folder
5. **Your site** will be available at `username.github.io/repository-name`

## Usage

### For Customers

1. **Browse Products**: View featured products on the homepage
2. **Search**: Use the search bar to find specific products
3. **Add to Cart**: Click "Add to Cart" on any product
4. **View Cart**: Click the cart icon to see your items
5. **Checkout**: Proceed to checkout when ready

### For Administrators

1. **Access Admin Panel**: Click "Admin" in the top bar or go to `admin.html`
2. **Add Products**: 
   - Click "Add Product" in the sidebar
   - Fill out the product form
   - Click "Add Product" to save
3. **Manage Products**:
   - View all products in the Products section
   - Edit products by clicking the edit icon
   - Delete products by clicking the delete icon
4. **View Analytics**: Check store statistics in the Analytics section
5. **Export Data**: Download your product data as JSON

## Product Data Structure

Each product has the following properties:

\`\`\`javascript
{
    id: 1,                    // Unique identifier
    title: "Product Name",    // Product title
    description: "...",       // Product description
    price: 99.99,            // Current price
    originalPrice: 149.99,   // Original price (optional)
    image: "🎧",             // Emoji or image URL
    category: "electronics", // Product category
    featured: true,          // Show in featured section
    badge: "Sale",           // Badge text (optional)
    stock: 25                // Available quantity
}
\`\`\`

## Customization

### Adding New Categories

1. **Update the category options** in both `index.html` and `admin.html`
2. **Add category navigation** in the main navigation menu
3. **Update the categories array** in `admin-script.js`

### Styling

- **Main store styles**: Edit `css/styles.css`
- **Admin panel styles**: Edit `css/admin-styles.css`
- **Colors**: Update CSS custom properties for consistent theming

### Adding Features

- **Payment Integration**: Add payment processing in the checkout function
- **User Authentication**: Implement login/signup functionality
- **Order Management**: Add order tracking and history
- **Reviews**: Add product review system

## Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript ES6+**: Modern JavaScript features
- **Font Awesome**: Icons
- **Local Storage**: Data persistence

## Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions:
- 📧 Email: info@shopping-center.com
- 📱 Phone: +1 (555) 123-4567
- 🌐 Website: [shopping-center.vercel.app](https://shopping-center.vercel.app)

## Changelog

### Version 1.0.0
- ✨ Initial release
- 🛒 Shopping cart functionality
- 👨‍💼 Admin panel
- 📱 Responsive design
- 🔍 Product search
- 📊 Analytics dashboard

---

**Happy Selling! 🛍️**
\`\`\`
