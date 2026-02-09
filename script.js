document.addEventListener('DOMContentLoaded', function() {
   
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

 
    const preloader = document.querySelector('.preloader');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercent = document.querySelector('.loading-percent');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
  
            gsap.to('.loading-text-words', {
                y: -20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.inOut'
            });
            
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 800);
        }
        loadingProgress.style.width = `${progress}%`;
        loadingPercent.textContent = `${progress}%`;
    }, 100);


    const cursor3d = document.querySelector('.cursor-3d');
    const cursorFollower = document.querySelector('.cursor-3d-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor3d.style.left = e.clientX + 'px';
        cursor3d.style.top = e.clientY + 'px';
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    

    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .project-link, .tech-icons i, .tab-btn, .filter-btn');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor3d.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor3d.classList.remove('active');
        });
    });


    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
   
        if (navLinks.classList.contains('active')) {
            gsap.from('.nav-link', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }
    });
    

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });


    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    themeToggle.addEventListener('click', () => {
        html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
        
 
        localStorage.setItem('theme', html.dataset.theme);
    });
    
 
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.dataset.theme = savedTheme;
    }

    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        });
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat.parentElement);
    });


    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            gsap.to(bar, {
                width: `${width}%`,
                duration: 1.5,
                ease: 'power2.out'
            });
        });
    }
    

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.skills-tab-content').forEach(tab => {
        skillsObserver.observe(tab);
    });

    const aboutTabBtns = document.querySelectorAll('.tab-btn');
    const aboutTabPanes = document.querySelectorAll('.tab-pane');
    
    aboutTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
        
            aboutTabBtns.forEach(b => b.classList.remove('active'));
            aboutTabPanes.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            gsap.from(`#${tabId} .timeline-item, #${tabId} .certification-item`, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out'
            });
        });
    });


    const skillsTabBtns = document.querySelectorAll('.skills-tab-btn');
    const skillsTabPanes = document.querySelectorAll('.skills-tab-content');
    
    skillsTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
        
            skillsTabBtns.forEach(b => b.classList.remove('active'));
            skillsTabPanes.forEach(p => p.classList.remove('active'));
            
        
            btn.classList.add('active');
            
            
            const tabId = btn.getAttribute('data-skills-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });


    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
    
            filterBtns.forEach(b => b.classList.remove('active'));
            
     
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
         
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'block';
                    gsap.from(card, {
                        y: 20,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

  
    let testimonialIndex = 0;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
    }
    
    
    showTestimonial(testimonialIndex);
    
   
    setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
        showTestimonial(testimonialIndex);
    }, 5000);


    const skillsRadarCtx = document.getElementById('skillsRadar').getContext('2d');
    const skillsRadarChart = new Chart(skillsRadarCtx, {
        type: 'radar',
        data: {
            labels: ['Frontend', 'Backend', 'UI/UX', 'DevOps', 'Mobile', 'Base de données'],
            datasets: [
                {
                    label: 'Niveau actuel',
                    data: [95, 85, 80, 70, 75, 90],
                    backgroundColor: 'rgba(108, 99, 255, 0.2)',
                    borderColor: '#6c63ff',
                    borderWidth: 2,
                    pointBackgroundColor: '#6c63ff',
                    pointRadius: 4
                },
                {
                    label: 'Objectif 2025',
                    data: [100, 95, 90, 85, 90, 95],
                    backgroundColor: 'rgba(255, 101, 132, 0.2)',
                    borderColor: '#ff6584',
                    borderWidth: 2,
                    pointBackgroundColor: '#ff6584',
                    pointRadius: 4,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    pointLabels: {
                        color: '#2d3436',
                        font: {
                            size: 12,
                            weight: '600'
                        }
                    },
                    ticks: {
                        display: false,
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            elements: {
                line: {
                    tension: 0.1
                }
            }
        }
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });


    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Pesan Anda Di Proses';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Pesan Anda berhasil di kirim!';
            
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }


    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
         
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                emailInput.value = '';
    
                const successMsg = document.createElement('div');
                successMsg.className = 'newsletter-success';
                successMsg.innerHTML = 'Terimakasih!';
                this.parentNode.insertBefore(successMsg, this.nextSibling);
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    successMsg.remove();
                }, 2000);
            }, 1500);
        });
    }


    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            heroVisual.style.transform = `translateY(${scrollY * 0.2}px)`;
        });
    }


    const skillsCube = document.querySelector('.skills-cube');
    
    if (skillsCube) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            skillsCube.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }
});