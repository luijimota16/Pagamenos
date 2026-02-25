document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isMenuOpen = navLinks.style.display === 'flex';

            if (isMenuOpen) {
                navLinks.style.display = 'none';
                navActions.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '1rem 2rem';
                navLinks.style.borderBottom = '1px solid #f3f4f6';

                navActions.style.display = 'flex';
                navActions.style.flexDirection = 'column';
                navActions.style.position = 'absolute';
                navActions.style.top = 'calc(100% + 150px)';
                navActions.style.left = '0';
                navActions.style.width = '100%';
                navActions.style.background = 'white';
                navActions.style.padding = '0 2rem 1rem';
            }
        });
    }

    // Calculator Logic
    const debtSlider = document.getElementById('debtSlider');
    const debtValueDisplay = document.getElementById('debtValueDisplay');
    const monthlyPaymentDisplay = document.getElementById('monthlyPayment');
    const totalSavingsDisplay = document.getElementById('totalSavings');

    // Format numbers as Currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            maximumFractionDigits: 0
        }).format(value);
    };

    if (debtSlider && debtValueDisplay && monthlyPaymentDisplay && totalSavingsDisplay) {

        const updateCalculatorValues = () => {
            const debtValue = parseInt(debtSlider.value);

            // Formula estimations based on design figures (150,000 -> 3,200/mo, 105,000 saved ~ 70%)
            const savings = debtValue * 0.70;
            const newDebt = debtValue - savings;
            // Assuming around 14 months to pay the negotiated debt (45000 / 3200 approx 14)
            const monthlyPayment = newDebt / 14;

            debtValueDisplay.textContent = formatCurrency(debtValue);
            monthlyPaymentDisplay.textContent = formatCurrency(monthlyPayment);
            totalSavingsDisplay.textContent = formatCurrency(savings);

            // Update slider background color percentage
            const min = debtSlider.min || 10000;
            const max = debtSlider.max || 500000;
            const percentage = ((debtValue - min) / (max - min)) * 100;

            debtSlider.style.background = `linear-gradient(90deg, #14d178 ${percentage}%, #e5e7eb ${percentage}%)`;
        };

        debtSlider.addEventListener('input', updateCalculatorValues);

        // Initial call
        updateCalculatorValues();
    }

    // Testimonial Slider Interaction
    const sliderContainer = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.slider-dots .dot');

    if (sliderContainer && prevBtn && nextBtn) {

        const scrollAmount = () => {
            // Card width + gap
            const card = sliderContainer.querySelector('.testimonial-card');
            if (card) {
                const style = window.getComputedStyle(sliderContainer);
                const gap = parseInt(style.gap) || 32;
                return card.offsetWidth + gap;
            }
            return 382; // Fallback estimate (350+32)
        };

        nextBtn.addEventListener('click', () => {
            sliderContainer.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            sliderContainer.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });

        // Update active dot on scroll
        sliderContainer.addEventListener('scroll', () => {
            const scrollLeft = sliderContainer.scrollLeft;
            const amount = scrollAmount();
            // Estimate current index
            const index = Math.round(scrollLeft / amount);

            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });

        // Add click events to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                sliderContainer.scrollTo({
                    left: index * scrollAmount(),
                    behavior: 'smooth'
                });
            });
        });
    }
});
