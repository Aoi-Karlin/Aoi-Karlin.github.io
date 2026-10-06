// Loading Screen Animation
class LoaderAnimation {
    constructor() {
        this.loader = document.getElementById('loader');
        this.bar = this.loader.querySelector('.loader__bar');
        this.overlay = this.loader.querySelector('.loader__overlay');
        this.percent = this.loader.querySelector('.loader__percent');
        this.progress = this.loader.querySelector('.loader__progress');
        this.mainContent = document.getElementById('main-content');
        this.body = document.body;

        this.currentPercent = 0;
        this.targetPercent = 0;
        this.isComplete = false;

        this.init();
    }

    init() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            this.skipAnimation();
            return;
        }

        // Start loading animation
        this.startFillAnimation();

        // Wait for window load
        if (document.readyState === 'complete') {
            this.targetPercent = 100;
        } else {
            window.addEventListener('load', () => {
                this.targetPercent = 100;
            });

            // Simulate progress up to 99
            this.simulateProgress();
        }
    }

    simulateProgress() {
        const interval = setInterval(() => {
            if (this.targetPercent < 99) {
                this.targetPercent += Math.random() * 15;
                if (this.targetPercent > 99) {
                    this.targetPercent = 99;
                }
            }

            if (this.targetPercent >= 100) {
                clearInterval(interval);
            }
        }, 200);
    }

    startFillAnimation() {
        // Animate bar and progress
        this.bar.style.transform = 'scaleY(1)';

        const animate = () => {
            if (this.currentPercent < this.targetPercent) {
                this.currentPercent += (this.targetPercent - this.currentPercent) * 0.1;

                if (this.currentPercent > this.targetPercent - 0.5) {
                    this.currentPercent = this.targetPercent;
                }

                this.updateUI();
            }

            if (this.currentPercent >= 100 && !this.isComplete) {
                this.isComplete = true;
                setTimeout(() => this.startSlideAnimation(), 320);
            } else if (this.currentPercent < 100) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    updateUI() {
        const displayPercent = Math.floor(this.currentPercent);
        this.percent.textContent = String(displayPercent).padStart(3, '0');
        this.progress.style.setProperty('--progress', `${this.currentPercent}%`);

        // Update progress bar width
        const progressBar = this.progress.querySelector('::after');
        this.progress.style.setProperty('--progress-width', `${this.currentPercent}%`);
        this.progress.style.background = `linear-gradient(to right, var(--color-accent) ${this.currentPercent}%, var(--color-border) ${this.currentPercent}%)`;
    }

    startSlideAnimation() {
        this.overlay.style.transform = 'translateX(102%)';

        setTimeout(() => {
            this.loader.style.display = 'none';
            this.body.classList.remove('is-loading');
            this.startContentAnimation();

            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('loader:done'));
        }, 780 + 460);
    }

    startContentAnimation() {
        this.mainContent.style.opacity = '1';

        const nav = document.querySelector('.nav');
        const sideNav = document.querySelector('.side-nav');
        const hud = document.querySelector('.hud');
        const sections = document.querySelectorAll('.section');

        // Animate nav
        setTimeout(() => {
            nav.style.opacity = '1';
            nav.style.transform = 'translateY(0)';
        }, 0);

        // Animate side nav
        setTimeout(() => {
            sideNav.style.opacity = '1';
        }, 150);

        // Animate HUD
        setTimeout(() => {
            hud.style.opacity = '1';
        }, 300);

        // Animate sections
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 450 + index * 110);
        });
    }

    skipAnimation() {
        this.loader.style.transition = 'opacity 300ms';
        this.loader.style.opacity = '0';

        setTimeout(() => {
            this.loader.style.display = 'none';
            this.body.classList.remove('is-loading');
            this.mainContent.style.opacity = '1';

            // Show all elements immediately
            document.querySelector('.nav').style.cssText = 'opacity: 1; transform: translateY(0)';
            document.querySelector('.side-nav').style.opacity = '1';
            document.querySelector('.hud').style.opacity = '1';
            document.querySelectorAll('.section').forEach(section => {
                section.style.cssText = 'opacity: 1; transform: translateY(0)';
            });

            window.dispatchEvent(new CustomEvent('loader:done'));
        }, 300);
    }
}

// Smooth Scroll & Active Section Tracking
class NavigationController {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.navLinks = document.querySelectorAll('.nav__link');
        this.sideNavItems = document.querySelectorAll('.side-nav__item');

        this.init();
    }

    init() {
        // Smooth scroll for nav links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Track active section on scroll
        window.addEventListener('scroll', () => this.updateActiveSection(), { passive: true });
        this.updateActiveSection();
    }

    updateActiveSection() {
        const scrollPos = window.scrollY + window.innerHeight / 3;

        this.sections.forEach((section, index) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (scrollPos >= top && scrollPos < top + height) {
                // Update side nav
                this.sideNavItems.forEach(item => item.classList.remove('side-nav__item--active'));
                if (this.sideNavItems[index]) {
                    this.sideNavItems[index].classList.add('side-nav__item--active');
                }
            }
        });
    }
}

// Language Toggle
class LanguageController {
    constructor() {
        this.currentLang = 'zh-CN';
        this.toggle = document.getElementById('langToggle');
        this.options = this.toggle.querySelectorAll('.nav__lang-option');

        this.init();
    }

    init() {
        this.toggle.addEventListener('click', () => this.switchLanguage());
    }

    switchLanguage() {
        this.currentLang = this.currentLang === 'zh-CN' ? 'en-US' : 'zh-CN';

        // Update UI
        this.options.forEach(option => {
            option.classList.remove('nav__lang-option--active');
        });

        const activeOption = this.currentLang === 'zh-CN' ? this.options[0] : this.options[1];
        activeOption.classList.add('nav__lang-option--active');

        // Update translations
        window.dispatchEvent(new CustomEvent('language:change', { detail: { lang: this.currentLang } }));
    }
}

// Mouse Position Tracker for HUD
class MousePositionController {
    constructor() {
        this.coordsElement = document.querySelector('.hud__value');
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            this.coordsElement.textContent = `${x}px, ${y}px`;
        });

        // Initial value
        this.coordsElement.textContent = '0px, 0px';
    }
}

// Input Lock During Loading
class InputLockController {
    constructor() {
        this.isLocked = true;
        this.init();
    }

    init() {
        const preventAction = (e) => {
            if (this.isLocked) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };

        window.addEventListener('wheel', preventAction, { passive: false });
        window.addEventListener('touchmove', preventAction, { passive: false });
        window.addEventListener('keydown', (e) => {
            if (this.isLocked && [32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
                preventAction(e);
            }
        });

        window.addEventListener('loader:done', () => {
            this.isLocked = false;
        });
    }
}

// Initialize all controllers
document.addEventListener('DOMContentLoaded', () => {
    new LoaderAnimation();
    new NavigationController();
    new LanguageController();
    new MousePositionController();
    new InputLockController();
});
