/**
 * Banfield Pet Hospital - Main JavaScript
 * Handles navigation, modals, FAQ accordion, and form validation
 */

(function() {
    'use strict';

    // ===========================================
    // DOM Elements
    // ===========================================
    const elements = {
        modal: document.querySelector('.js-modal'),
        modalOpenBtn: document.querySelector('.js-modal-open'),
        modalCloseBtn: document.querySelector('.exit-button'),
        hamburger: document.querySelector('.header__menu-button'),
        header: document.querySelector('.header'),
        nav: document.querySelector('#main-navigation'),
        faqItems: document.querySelectorAll('.faq-list__item'),
        faqTogglers: document.querySelectorAll('.faq-list__item__btn'),
        forms: document.querySelectorAll('form[novalidate]')
    };

    // Store the element that opened the modal for focus return
    let lastFocusedElement = null;

    // ===========================================
    // Modal Functions
    // ===========================================
    function openModal() {
        if (!elements.modal) return;
        
        lastFocusedElement = document.activeElement;
        elements.modal.classList.add('modal-open');
        elements.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus first focusable element in modal
        const firstFocusable = elements.modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
    }

    function closeModal() {
        if (!elements.modal) return;
        
        elements.modal.classList.remove('modal-open');
        elements.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // Return focus to the element that opened the modal
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    function handleModalKeydown(event) {
        if (!elements.modal || !elements.modal.classList.contains('modal-open')) return;
        
        // Close on Escape key
        if (event.key === 'Escape') {
            closeModal();
            return;
        }
        
        // Trap focus within modal
        if (event.key === 'Tab') {
            const focusableElements = elements.modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }

    // Close modal when clicking outside content
    function handleModalBackdropClick(event) {
        if (event.target === elements.modal) {
            closeModal();
        }
    }

    // ===========================================
    // Mobile Navigation Functions
    // ===========================================
    function toggleMobileNav() {
        if (!elements.header || !elements.hamburger) return;
        
        const isOpen = elements.header.classList.toggle('header--active');
        elements.hamburger.setAttribute('aria-expanded', isOpen.toString());
        
        if (elements.nav) {
            elements.nav.setAttribute('aria-hidden', (!isOpen).toString());
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMobileNav() {
        if (!elements.header) return;
        
        elements.header.classList.remove('header--active');
        if (elements.hamburger) {
            elements.hamburger.setAttribute('aria-expanded', 'false');
        }
        if (elements.nav) {
            elements.nav.setAttribute('aria-hidden', 'true');
        }
        document.body.style.overflow = '';
    }

    // ===========================================
    // FAQ Accordion Functions
    // ===========================================
    function toggleFaqItem(toggler) {
        const faqItem = toggler.closest('.faq-list__item');
        if (!faqItem) return;
        
        const isOpen = faqItem.classList.toggle('faq--open');
        toggler.setAttribute('aria-expanded', isOpen.toString());
        
        const content = faqItem.querySelector('.faq-list__item__desc');
        if (content) {
            content.setAttribute('aria-hidden', (!isOpen).toString());
        }
    }

    // ===========================================
    // Form Validation Functions
    // ===========================================
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.setAttribute('role', 'alert');
            input.insertAdjacentElement('afterend', errorElement);
        }
        
        errorElement.textContent = message;
        input.classList.add('input-error');
        input.setAttribute('aria-invalid', 'true');
    }

    function clearError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.classList.remove('input-error');
        input.setAttribute('aria-invalid', 'false');
    }

    function validateInput(input) {
        clearError(input);
        
        const value = input.value.trim();
        const type = input.type;
        const required = input.hasAttribute('required');
        const minLength = input.getAttribute('minlength');
        const maxLength = input.getAttribute('maxlength');
        
        // Required field validation
        if (required && !value) {
            showError(input, 'This field is required');
            return false;
        }
        
        // Email validation
        if (type === 'email' && value && !validateEmail(value)) {
            showError(input, 'Please enter a valid email address');
            return false;
        }
        
        // Min length validation
        if (minLength && value.length < parseInt(minLength)) {
            showError(input, `Minimum ${minLength} characters required`);
            return false;
        }
        
        // Max length validation
        if (maxLength && value.length > parseInt(maxLength)) {
            showError(input, `Maximum ${maxLength} characters allowed`);
            return false;
        }
        
        return true;
    }

    function validateForm(form) {
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    function handleFormSubmit(event) {
        const form = event.target;
        
        if (!validateForm(form)) {
            event.preventDefault();
            
            // Focus first invalid input
            const firstInvalid = form.querySelector('.input-error');
            if (firstInvalid) {
                firstInvalid.focus();
            }
            return;
        }
        
        // For demo purposes, prevent actual submission
        event.preventDefault();
        
        // Show success message (can be customized)
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sent!';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                form.reset();
                
                // Close modal if form is inside modal
                if (form.closest('.js-modal')) {
                    closeModal();
                }
            }, 2000);
        }
    }

    // ===========================================
    // Event Listeners Setup
    // ===========================================
    function initEventListeners() {
        // Modal events
        if (elements.modalOpenBtn) {
            elements.modalOpenBtn.addEventListener('click', openModal);
        }
        
        if (elements.modalCloseBtn) {
            elements.modalCloseBtn.addEventListener('click', closeModal);
        }
        
        if (elements.modal) {
            elements.modal.addEventListener('click', handleModalBackdropClick);
        }
        
        // Global keyboard events
        document.addEventListener('keydown', handleModalKeydown);
        
        // Mobile navigation
        if (elements.hamburger) {
            elements.hamburger.addEventListener('click', toggleMobileNav);
        }
        
        // Close mobile nav on escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && elements.header?.classList.contains('header--active')) {
                closeMobileNav();
            }
        });
        
        // FAQ accordion
        elements.faqTogglers.forEach(toggler => {
            toggler.addEventListener('click', () => toggleFaqItem(toggler));
            
            // Keyboard support
            toggler.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleFaqItem(toggler);
                }
            });
        });
        
        // Form validation
        elements.forms.forEach(form => {
            form.addEventListener('submit', handleFormSubmit);
            
            // Real-time validation on blur
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => validateInput(input));
                input.addEventListener('input', () => {
                    if (input.classList.contains('input-error')) {
                        validateInput(input);
                    }
                });
            });
        });
    }

    // ===========================================
    // Initialize
    // ===========================================
    function init() {
        initEventListeners();
        
        // Set initial ARIA states
        if (elements.nav) {
            elements.nav.setAttribute('aria-hidden', 'true');
        }
        
        // Initialize FAQ items with ARIA
        elements.faqTogglers.forEach(toggler => {
            toggler.setAttribute('aria-expanded', 'false');
            const content = toggler.closest('.faq-list__item')?.querySelector('.faq-list__item__desc');
            if (content) {
                content.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
