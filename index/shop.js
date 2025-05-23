document.querySelectorAll('.product-image-wrapper').forEach(wrapper => {
    const btn = wrapper.querySelector('.add-to-cart-btn');
    wrapper.addEventListener('mouseenter', () => {
        btn.style.display = 'block';
        setTimeout(() => btn.style.opacity = '1', 10);
    });
    wrapper.addEventListener('mouseleave', () => {
        btn.style.opacity = '0';
        setTimeout(() => btn.style.display = 'none', 200);
    });
});