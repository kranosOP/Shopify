# ShopifyStyle Product Page

## Overview

ShopifyStyle is a modern e-commerce product page showcasing a premium wool sweater. The page is designed with a focus on user experience, providing detailed product information, high-quality images, and interactive elements to aid in the purchasing decision. Built with HTML, CSS, and JavaScript, this responsive product page includes features commonly found in high-end e-commerce platforms.

## Features Implemented

### 1. Product Gallery
- Main product image with zoom overlay
- Scrollable thumbnail gallery with previous/next navigation
- Thumbnail selection to update the main product image

### 2. Size Selection and Information
- Interactive size buttons (XS to XXL)
- Size chart modal with detailed measurements
- "How to Measure" guide for accurate sizing

### 3. Color Selection
- Visual color swatches with active state indication
- Real-time color name update when selected
- Compare colors feature with detailed modal

### 4. Product Information
- Tabbed information sections (Description, Product Information, Shipping Details)
- Detailed product specifications and materials
- Shipping and return policy information

### 5. Product Recommendations
- "Pair Well With" horizontal scrollable product suggestions
- Quick add buttons for complementary products
- Multiple product categories showcased

### 6. Product Bundle
- "Complete the Look" bundle option with discount
- Visual representation of bundled items
- Bundle savings calculation and display

### 7. Related Products
- "You May Also Like" product grid
- Color options for each related product
- Product badges (New, Popular, Sale)

### 8. Shopping Controls
- Quantity selector with increment/decrease buttons
- Add to Cart button
- Save for Later functionality

### 9. Navigation and Site Structure
- Breadcrumb navigation
- Main site navigation
- Footer with multiple sections (Shop, Help, About, Newsletter)

## How to Run Locally

### Prerequisites
- Web browser (Chrome, Firefox, Safari, or Edge recommended)
- Optional: Local development server (like Live Server for VS Code)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shopifystyle-product-page.git
   cd shopifystyle-product-page
   ```

2. **Structure your project**
   Ensure your project has the following structure:
   ```
   shopifystyle-product-page/
   ├── index.html           # Main HTML file
   ├── css/
   │   └── styles.css       # CSS styles
   ├── js/
   │   └── main.js          # JavaScript functionality
   └── assets/
       └── images/          # Product images
   ```

3. **Run with local server**
   - **Option 1 - VS Code Live Server:**
     - Install the Live Server extension in VS Code
     - Right-click on index.html and select "Open with Live Server"
   
   - **Option 2 - Python's built-in server:**
     ```bash
     # For Python 3.x
     python -m http.server
     
     # For Python 2.x
     python -m SimpleHTTPServer
     ```
     Then open `http://localhost:8000` in your browser

   - **Option 3 - Node.js http-server:**
     ```bash
     npm install -g http-server
     http-server
     ```
     Then open `http://localhost:8080` in your browser

4. **View in browser**
   - If not using a local server, simply open the index.html file directly in your browser:
     ```
     file:///path/to/shopifystyle-product-page/index.html
     ```

### Browser Compatibility
The product page is compatible with modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements
- Product reviews section with user ratings
- Recently viewed products
- Stock level indicators
- Size recommendation tool
- Social sharing functionality

## Credits
- Design inspiration from modern e-commerce platforms
- Product imagery placeholders included in assets folder
