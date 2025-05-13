document.addEventListener('DOMContentLoaded', function() {
    // PRODUCT GALLERY
    initializeGallery();
    
    // QUANTITY SELECTOR
    initializeQuantitySelector();
    
    // PRODUCT VARIANTS
    initializeColorSwatches();
    initializeSizeButtons();
    
    // MODALS
    initializeSizeChartModal();
    initializeCompareColorsModal();
    
    // PRODUCT TABS
    initializeProductTabs();
    
    // COMPLEMENTARY PRODUCTS SCROLLING
    initializeComplementaryProductsScroll();
    
    // THUMBNAILS SCROLLING
    initializeThumbnailScroll();
    
    // ADD TO CART FUNCTIONALITY
    initializeAddToCart();
    
    // SAVE FOR LATER FUNCTIONALITY
    initializeSaveForLater();
    
    // BUNDLE FUNCTIONALITY
    initializeBundleActions();
});

// =========== GALLERY FUNCTIONS ===========
function initializeGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    // Add click event listener to each thumbnail
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image source
            const imageSrc = this.getAttribute('data-image');
            mainImage.src = imageSrc;
        });
    });
    
    // Image zoom functionality
    const zoomOverlay = document.querySelector('.image-zoom-overlay');
    if (mainImage && zoomOverlay) {
        mainImage.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width * 100;
            const y = (e.clientY - top) / height * 100;
            
            this.style.transform = 'scale(1.5)';
            this.style.transformOrigin = `${x}% ${y}%`;
        });
        
        mainImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

function initializeThumbnailScroll() {
    const prevBtn = document.querySelector('.thumbnail-scroll.prev');
    const nextBtn = document.querySelector('.thumbnail-scroll.next');
    const thumbnailsContainer = document.querySelector('.thumbnails-container');
    
    if (!prevBtn || !nextBtn || !thumbnailsContainer) return;
    
    const scrollAmount = 100; // Adjust based on thumbnail width + margin
    
    prevBtn.addEventListener('click', function() {
        thumbnailsContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', function() {
        thumbnailsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Hide/show buttons based on scroll position
    thumbnailsContainer.addEventListener('scroll', function() {
        prevBtn.style.visibility = this.scrollLeft <= 0 ? 'hidden' : 'visible';
        nextBtn.style.visibility = 
            (this.scrollLeft + this.clientWidth) >= this.scrollWidth ? 'hidden' : 'visible';
    });
    
    // Trigger initial check
    prevBtn.style.visibility = thumbnailsContainer.scrollLeft <= 0 ? 'hidden' : 'visible';
}

// =========== QUANTITY SELECTOR FUNCTIONS ===========
function initializeQuantitySelector() {
    const decreaseBtn = document.querySelector('.quantity-decrease');
    const increaseBtn = document.querySelector('.quantity-increase');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (!decreaseBtn || !increaseBtn || !quantityInput) return;
    
    decreaseBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < parseInt(quantityInput.max)) {
            quantityInput.value = currentValue + 1;
        }
    });
    
    // Ensure the input value is valid when manually changed
    quantityInput.addEventListener('change', function() {
        let value = parseInt(this.value);
        const min = parseInt(this.min);
        const max = parseInt(this.max);
        
        if (isNaN(value) || value < min) {
            this.value = min;
        } else if (value > max) {
            this.value = max;
        }
    });
}

// =========== PRODUCT VARIANTS FUNCTIONS ===========
function initializeColorSwatches() {
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const selectedColorSpan = document.querySelector('.selected-color');
    
    if (!colorSwatches.length || !selectedColorSpan) return;
    
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            // Remove active class from all swatches
            colorSwatches.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked swatch
            this.classList.add('active');
            
            // Update selected color text
            const selectedColor = this.getAttribute('data-color');
            selectedColorSpan.textContent = selectedColor;
            
            // Here you could add code to update the main product image based on the selected color
        });
    });
}

function initializeSizeButtons() {
    const sizeButtons = document.querySelectorAll('.size-button');
    const selectedSizeSpan = document.querySelector('.selected-size');
    
    if (!sizeButtons.length || !selectedSizeSpan) return;
    
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all size buttons
            sizeButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update selected size text
            const selectedSize = this.getAttribute('data-size');
            selectedSizeSpan.textContent = selectedSize;
        });
    });
}

// =========== MODAL FUNCTIONS ===========
function initializeSizeChartModal() {
    const sizeChartBtn = document.querySelector('.size-chart-btn');
    const sizeChartModal = document.getElementById('size-chart-modal');
    const modalClose = sizeChartModal ? sizeChartModal.querySelector('.modal-close') : null;
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (!sizeChartBtn || !sizeChartModal || !modalClose || !modalOverlay) return;
    
    sizeChartBtn.addEventListener('click', function() {
        sizeChartModal.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    modalClose.addEventListener('click', function() {
        closeModal(sizeChartModal);
    });
    
    modalOverlay.addEventListener('click', function() {
        // Close all open modals when clicking on overlay
        const activeModals = document.querySelectorAll('.modal.active');
        activeModals.forEach(modal => closeModal(modal));
    });
}

function initializeCompareColorsModal() {
    const compareColorsBtn = document.querySelector('.compare-colors-btn');
    const compareColorsModal = document.getElementById('compare-colors-modal');
    const modalClose = compareColorsModal ? compareColorsModal.querySelector('.modal-close') : null;
    const modalOverlay = document.querySelector('.modal-overlay');
    const colorCompareOptions = compareColorsModal ? compareColorsModal.querySelectorAll('input[name="compare-color"]') : [];
    const comparisonResults = document.getElementById('colors-comparison-results');
    
    if (!compareColorsBtn || !compareColorsModal || !modalClose || !modalOverlay || !colorCompareOptions.length || !comparisonResults) return;
    
    compareColorsBtn.addEventListener('click', function() {
        compareColorsModal.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    modalClose.addEventListener('click', function() {
        closeModal(compareColorsModal);
    });
    
    // Add functionality for color comparison
    colorCompareOptions.forEach(option => {
        option.addEventListener('change', updateColorComparison);
    });
    
    function updateColorComparison() {
        const selectedColors = [];
        colorCompareOptions.forEach(option => {
            if (option.checked) {
                selectedColors.push({
                    name: option.value,
                    color: option.nextElementSibling.style.backgroundColor
                });
            }
        });
        
        if (selectedColors.length < 2) {
            comparisonResults.innerHTML = '<p>Select at least two colors to compare</p>';
            return;
        }
        
        // Build comparison display
        let comparisonHTML = '<div class="color-comparison-grid">';
        selectedColors.forEach(color => {
            comparisonHTML += `
                <div class="color-comparison-item">
                    <div class="color-preview" style="background-color: ${color.color};"></div>
                    <p>${color.name}</p>
                </div>
            `;
        });
        comparisonHTML += '</div>';
        
        // Add some fictitious but realistic information about the colors
        comparisonHTML += `
            <div class="color-comparison-details">
                <h3>Color Comparison Details</h3>
                <p>These colors are all part of our premium wool collection. Each is dyed using eco-friendly processes.</p>
                <table>
                    <thead>
                        <tr>
                            <th>Color</th>
                            <th>Best paired with</th>
                            <th>Season</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        const colorInfo = {
            'Navy Blue': { pairedWith: 'Light blue, white, gray', season: 'All seasons' },
            'Burgundy': { pairedWith: 'Gray, black, beige', season: 'Fall/Winter' },
            'Forest Green': { pairedWith: 'Brown, beige, cream', season: 'Fall/Winter' },
            'Charcoal': { pairedWith: 'All colors', season: 'All seasons' },
            'Camel': { pairedWith: 'Navy, burgundy, white', season: 'Fall/Winter' }
        };
        
        selectedColors.forEach(color => {
            const info = colorInfo[color.name] || { pairedWith: 'Various', season: 'Any' };
            comparisonHTML += `
                <tr>
                    <td>${color.name}</td>
                    <td>${info.pairedWith}</td>
                    <td>${info.season}</td>
                </tr>
            `;
        });
        
        comparisonHTML += `
                    </tbody>
                </table>
            </div>
        `;
        
        comparisonResults.innerHTML = comparisonHTML;
    }
}

function closeModal(modal) {
    const modalOverlay = document.querySelector('.modal-overlay');
    
    modal.classList.remove('active');
    
    // Only hide overlay if no modals are active
    const activeModals = document.querySelectorAll('.modal.active');
    if (activeModals.length === 0) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// =========== PRODUCT TABS FUNCTIONS ===========
function initializeProductTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (!tabButtons.length || !tabPanels.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding panel
            const tabId = this.getAttribute('data-tab');
            const panel = document.getElementById(tabId);
            if (panel) {
                panel.classList.add('active');
            }
        });
    });
}

// =========== COMPLEMENTARY PRODUCTS SCROLLING ===========
function initializeComplementaryProductsScroll() {
    const prevBtn = document.querySelector('.complementary-products .scroll-btn.prev');
    const nextBtn = document.querySelector('.complementary-products .scroll-btn.next');
    const productsContainer = document.querySelector('.complementary-products-container');
    
    if (!prevBtn || !nextBtn || !productsContainer) return;
    
    const scrollAmount = productsContainer.querySelector('.complementary-product').offsetWidth + 20; // Product width + margin
    
    prevBtn.addEventListener('click', function() {
        productsContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', function() {
        productsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Hide/show buttons based on scroll position
    productsContainer.addEventListener('scroll', function() {
        prevBtn.style.visibility = this.scrollLeft <= 0 ? 'hidden' : 'visible';
        nextBtn.style.visibility = 
            (this.scrollLeft + this.clientWidth) >= this.scrollWidth ? 'hidden' : 'visible';
    });
    
    // Trigger initial check
    prevBtn.style.visibility = productsContainer.scrollLeft <= 0 ? 'hidden' : 'visible';
}

// =========== ADD TO CART FUNCTIONALITY ===========
function initializeAddToCart() {
    const addToCartButton = document.querySelector('.add-to-cart-btn');
    const quantityInput = document.querySelector('.quantity-input');
    const cartCountElement = document.querySelector('.cart-btn');
    
    if (!addToCartButton || !quantityInput || !cartCountElement) return;
    
    // Start with cart count at 0
    let cartCount = 0;
    
    addToCartButton.addEventListener('click', function() {
        // Check if size is selected
        const selectedSize = document.querySelector('.size-button.active');
        if (!selectedSize) {
            alert('Please select a size before adding to cart.');
            return;
        }
        
        // Get selected quantity
        const quantity = parseInt(quantityInput.value);
        
        // Add to cart count
        cartCount += quantity;
        
        // Update cart button text
        cartCountElement.textContent = `Cart (${cartCount})`;
        
        // Create and show toast notification
        showAddedToCartNotification(quantity);
    });
    
    // Quick add buttons for complementary products
    const quickAddButtons = document.querySelectorAll('.quick-add-btn');
    quickAddButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get product info
            const productElement = this.closest('.complementary-product');
            const productName = productElement.querySelector('h3').textContent;
            
            // Add to cart count
            cartCount += 1;
            
            // Update cart button text
            cartCountElement.textContent = `Cart (${cartCount})`;
            
            // Show notification
            showAddedToCartNotification(1, productName);
            
            // Change button text temporarily
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
    
    // Bundle add to cart
    const addBundleButton = document.querySelector('.add-bundle-btn');
    if (addBundleButton) {
        addBundleButton.addEventListener('click', function() {
            // Add 3 items to cart (bundle consists of 3 products)
            cartCount += 3;
            
            // Update cart button text
            cartCountElement.textContent = `Cart (${cartCount})`;
            
            // Show notification
            showAddedToCartNotification(3, 'Bundle Items');
        });
    }
}

function showAddedToCartNotification(quantity, productName = 'Premium Wool Sweater') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">✓</span>
            <div class="toast-message">
                <strong>Added to Cart!</strong>
                <p>${quantity} x ${productName}</p>
            </div>
            <button class="toast-close">&times;</button>
        </div>
        <div class="toast-actions">
            <button class="toast-action-btn view-cart">View Cart</button>
            <button class="toast-action-btn checkout">Checkout</button>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(toast);
    
    // Add styles dynamically if not already in CSS
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 4px;
                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                padding: 15px;
                z-index: 1000;
                min-width: 280px;
                transform: translateX(110%);
                transition: transform 0.3s ease;
            }
            .toast-notification.show {
                transform: translateX(0);
            }
            .toast-content {
                display: flex;
                align-items: flex-start;
                margin-bottom: 10px;
            }
            .toast-icon {
                background: #4CAF50;
                color: white;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 10px;
                flex-shrink: 0;
            }
            .toast-message {
                flex-grow: 1;
            }
            .toast-close {
                background: transparent;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: #999;
            }
            .toast-actions {
                display: flex;
                gap: 10px;
            }
            .toast-action-btn {
                padding: 8px 12px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                flex-grow: 1;
            }
            .toast-action-btn.view-cart {
                background: #f5f5f5;
                color: #333;
            }
            .toast-action-btn.checkout {
                background: #000;
                color: white;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Add close functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (document.body.contains(toast)) {
            toast.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }
    }, 5000);
    
    // View cart and checkout button functionality could be added here
    const viewCartBtn = toast.querySelector('.view-cart');
    const checkoutBtn = toast.querySelector('.checkout');
    
    viewCartBtn.addEventListener('click', () => {
        // Redirect to cart page or show cart sidebar
        alert('View Cart clicked - would redirect to cart page');
    });
    
    checkoutBtn.addEventListener('click', () => {
        // Redirect to checkout
        alert('Checkout clicked - would redirect to checkout page');
    });
}

// =========== SAVE FOR LATER FUNCTIONALITY ===========
function initializeSaveForLater() {
    const saveForLaterBtn = document.querySelector('.save-for-later-btn');
    
    if (!saveForLaterBtn) return;
    
    saveForLaterBtn.addEventListener('click', function() {
        const isSaved = this.classList.contains('saved');
        
        if (isSaved) {
            this.classList.remove('saved');
            this.innerHTML = '♡';
        } else {
            this.classList.add('saved');
            this.innerHTML = '♥';
            
            // Show save notification
            showSavedNotification();
        }
    });
    
    // Add styles for saved button if not in CSS
    if (!document.querySelector('#save-button-styles')) {
        const style = document.createElement('style');
        style.id = 'save-button-styles';
        style.textContent = `
            .save-for-later-btn.saved {
                color: red;
            }
        `;
        document.head.appendChild(style);
    }
}

function showSavedNotification() {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon" style="background: #FF3B30;">♥</span>
            <div class="toast-message">
                <strong>Item Saved!</strong>
                <p>Added to your wishlist</p>
            </div>
            <button class="toast-close">&times;</button>
        </div>
        <div class="toast-actions">
            <button class="toast-action-btn view-wishlist">View Wishlist</button>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Add close functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    });
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        if (document.body.contains(toast)) {
            toast.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }
    }, 3000);
    
    // View wishlist functionality
    const viewWishlistBtn = toast.querySelector('.view-wishlist');
    viewWishlistBtn.addEventListener('click', () => {
        // Redirect to wishlist page
        alert('View Wishlist clicked - would redirect to wishlist page');
    });
}

// =========== BUNDLE FUNCTIONALITY ===========
function initializeBundleActions() {
    const bundleContainer = document.querySelector('.product-bundle');
    if (!bundleContainer) return;
    
    // Add hover effects to bundle products
    const bundleProducts = bundleContainer.querySelectorAll('.bundle-product');
    bundleProducts.forEach(product => {
        product.addEventListener('mouseenter', function() {
            this.classList.add('highlight');
        });
        
        product.addEventListener('mouseleave', function() {
            this.classList.remove('highlight');
        });
    });
    
    // Add styles for bundle product hover if not in CSS
    if (!document.querySelector('#bundle-styles')) {
        const style = document.createElement('style');
        style.id = 'bundle-styles';
        style.textContent = `
            .bundle-product.highlight {
                box-shadow: 0 0 10px rgba(0,0,0,0.2);
                transform: translateY(-5px);
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
}