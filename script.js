document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Spinner
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.visibility = 'hidden';
            loader.style.display = 'none';
        }, 600);
    }, 1200);

    // 2. Initialize AOS Animation
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-in-out',
    });

    // 3. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Dynamic Products Data
    const defaultProducts = [
        {
            id: 1,
            name: 'كريم أساس لومينوس',
            category: 'face',
            price: 45.00,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            isNew: true,
            shades: ['#fcece0', '#f1d4b6', '#d19f70', '#8c5738']
        },
        {
            id: 2,
            name: 'باليت ظلال العيون نود',
            category: 'eyes',
            price: 35.00,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1512496015851-a1c8ceac4188?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            isNew: false,
            shades: ['#d4a373', '#a68a64', '#582f0e']
        },
        {
            id: 3,
            name: 'أحمر شفاه مخملي - روز',
            category: 'lips',
            price: 25.00,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            isNew: true,
            shades: ['#ffb3c6', '#fb6f92', '#c1121f']
        },
        {
            id: 4,
            name: 'ماسكارا مكثفة',
            category: 'eyes',
            price: 28.00,
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            isNew: false,
            shades: ['#000000', '#2b2d42']
        },
        {
            id: 5,
            name: 'بلاشر كريمي خوخي',
            category: 'face',
            price: 22.00,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            isNew: false,
            shades: ['#ffcdb2', '#ffb4a2']
        },
        {
            id: 6,
            name: 'ملمع شفاه جلاس',
            category: 'lips',
            price: 18.00,
            rating: 4.5,
            image: 'https://images.unsplash.com/photo-1617897903246-719242758050?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            isNew: true,
            shades: ['#ffe5d9', '#ffcad4', '#f4acb7']
        }
    ];

    // Load products from LocalStorage or use default
    let products = JSON.parse(localStorage.getItem('glow_products'));
    
    // If empty or doesn't exist, initialize with default products
    if (!products || products.length === 0) {
        products = defaultProducts;
        localStorage.setItem('glow_products', JSON.stringify(products));
    } else {
        // Merge any new items added to localStorage with defaults if needed
        // For simplicity, we just use what's in localStorage.
        // But to make sure default ones exist:
        if(products.length < defaultProducts.length) {
             products = defaultProducts;
             localStorage.setItem('glow_products', JSON.stringify(products));
        }
    }

    const productGrid = document.getElementById('productGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Render Products Function
    function renderProducts(category = 'all') {
        productGrid.innerHTML = '';
        
        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(p => p.category === category);

        filteredProducts.forEach((product, index) => {
            // Calculate delay for staggered animation
            const delay = (index % 3) * 100;
            
            let shadesHTML = '';
            if (product.shades) {
                shadesHTML = '<div class="d-flex justify-content-center gap-1 mb-2">';
                product.shades.forEach(shade => {
                    shadesHTML += `<div style="width:12px; height:12px; border-radius:50%; background-color:${shade}; border:1px solid rgba(0,0,0,0.1);"></div>`;
                });
                shadesHTML += '</div>';
            }
            
            const productHTML = `
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${delay}">
                    <div class="product-card h-100">
                        ${product.isNew ? '<span class="badge-new">جديد</span>' : ''}
                        <div class="product-img-container">
                            <img src="${product.image}" alt="${product.name}" loading="lazy">
                            <div class="product-actions">
                                <button class="action-btn" title="إضافة للسلة" onclick="window.location.href='cart.html'"><i class="fa-solid fa-cart-plus"></i></button>
                                <button class="action-btn" title="نظرة سريعة" onclick="window.location.href='product-details.html'"><i class="fa-regular fa-eye"></i></button>
                                <button class="action-btn" title="إضافة للمفضلة" onclick="window.location.href='wishlist.html'"><i class="fa-regular fa-heart"></i></button>
                            </div>
                        </div>
                        <div class="p-4 text-center">
                            <div class="text-warning small mb-2">
                                ${getStars(product.rating)}
                                <span class="text-muted ms-1">(${product.rating})</span>
                            </div>
                            <h5 class="fw-bold mb-2">${product.name}</h5>
                            ${shadesHTML}
                            <div class="text-primary-custom fw-bold fs-5">$${product.price.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            `;
            productGrid.insertAdjacentHTML('beforeend', productHTML);
        });

        // Re-initialize AOS for new dynamically added elements
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }

    // Helper function to generate stars
    function getStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fa-solid fa-star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fa-solid fa-star-half-stroke"></i>';
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="fa-regular fa-star"></i>';
        }
        return stars;
    }

    // Initial render
    renderProducts();

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            e.target.classList.add('active');
            
            const category = e.target.getAttribute('data-filter');
            
            // Add fade out effect
            productGrid.style.opacity = '0';
            productGrid.style.transform = 'translateY(10px)';
            productGrid.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                renderProducts(category);
                // Add fade in effect
                productGrid.style.opacity = '1';
                productGrid.style.transform = 'translateY(0)';
            }, 300);
        });
    });

    // Checkout Page Logic
    const cashRadio = document.getElementById('cash');
    const creditRadio = document.getElementById('credit');
    const cardDetails = document.getElementById('card-details');

    if (cashRadio && creditRadio && cardDetails) {
        cashRadio.addEventListener('change', function() {
            cardDetails.style.display = 'none';
        });
        creditRadio.addEventListener('change', function() {
            cardDetails.style.display = 'flex';
        });
    }

});

// Process Payment Validation and API call
window.processPayment = async function() {
    const firstName = document.getElementById('firstName')?.value.trim();
    const lastName = document.getElementById('lastName')?.value.trim();
    const address = document.getElementById('address')?.value.trim();
    const governorate = document.getElementById('governorate')?.value;
    const phone = document.getElementById('phone')?.value.trim();
    
    // Validate shipping info
    if (!firstName || !lastName || !address || !governorate || !phone) {
        alert('الرجاء إكمال جميع معلومات الشحن (الاسم، العنوان، المحافظة، ورقم الهاتف).');
        return;
    }

    const isCredit = document.getElementById('credit')?.checked;
    let paymentMethod = 'الدفع عند الاستلام';

    if (isCredit) {
        const cardName = document.getElementById('cardName')?.value.trim();
        const cardNumber = document.getElementById('cardNumber')?.value.trim();
        const cardExp = document.getElementById('cardExp')?.value.trim();
        const cardCvv = document.getElementById('cardCvv')?.value.trim();

        if (!cardName || !cardNumber || !cardExp || !cardCvv) {
            alert('الرجاء ملء جميع بيانات البطاقة الائتمانية.');
            return;
        }

        // Basic validation for card number
        if (cardNumber.length < 14) {
            alert('رقم البطاقة غير صحيح.');
            return;
        }

        paymentMethod = 'بطاقة ائتمان';
    }

    const payBtn = document.getElementById('pay-btn');
    const originalText = payBtn.innerHTML;
    
    payBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> جاري تجهيز الطلب...';
    payBtn.disabled = true;

    // Hardcode cart items since they are hardcoded in cart.html for the demo
    let itemsText = `- كريم أساس لومينوس (الكمية: 1)\n- أحمر شفاه مخملي (الكمية: 1)`;

    let message = `*طلب جديد من متجر GLOW* 🌟\n\n`;
    message += `*بيانات العميل:*\n`;
    message += `👤 الاسم: ${firstName} ${lastName}\n`;
    message += `📞 رقم الهاتف: ${phone}\n`;
    message += `📍 العنوان: ${address}، محافظة ${governorate}\n`;
    message += `💳 طريقة الدفع: ${paymentMethod}\n\n`;
    
    message += `*🛍️ المنتجات المطلوبة:*\n`;
    message += `${itemsText}\n\n`;
    
    message += `*الإجمالي:* $75.00 (شامل الشحن)`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "201225111598";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'تم تجهيز طلبك!',
            text: 'يتم الآن تحويلك لواتساب لإرسال الطلب واعتماده...',
            icon: 'success',
            confirmButtonText: 'العودة للرئيسية',
            confirmButtonColor: '#D4A373'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'index.html';
            }
        });
    } else {
        alert('تم تجهيز طلبك! يتم تحويلك لواتساب الآن.');
        window.location.href = 'index.html';
    }
    
    payBtn.innerHTML = originalText;
    payBtn.disabled = false;
};
