// 公共JavaScript文件 - script.js

// 检查particles.js是否加载成功
let particlesLoaded = false;

// 粒子背景初始化（带错误处理）
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 100,
                    density: {
                        enable: true,
                        value_area: 900
                    }
                },
                color: {
                    value: ["#00F5FF", "#7B68EE", "#FF6B9D"]
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.6,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1.5,
                        opacity_min: 0.2,
                        sync: false
                    }
                },
                size: {
                    value: 3.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2.5,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 160,
                    color: "#00F5FF",
                    opacity: 0.5,
                    width: 1.5
                },
                move: {
                    enable: true,
                    speed: 2.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 160,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 6
                    }
                }
            },
            retina_detect: true
        });
        particlesLoaded = true;
        console.log('Particles initialized successfully');
    } else {
        console.warn('particles.js not loaded, particle effects disabled');
        // 隐藏粒子容器以避免空白区域
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            particlesContainer.style.display = 'none';
        }
    }
}

// 延迟初始化粒子效果
setTimeout(initParticles, 100);

// 重新尝试加载particles.js
function retryLoadParticles() {
    if (!particlesLoaded) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
        script.crossOrigin = 'anonymous';
        script.onerror = () => {
            console.warn('Failed to load particles.js from fallback CDN');
            // 再尝试备用CDN
            const backupScript = document.createElement('script');
            backupScript.src = 'https://unpkg.com/particles.js@2.0.0/particles.min.js';
            backupScript.crossOrigin = 'anonymous';
            backupScript.onerror = () => {
                console.warn('All CDN sources failed for particles.js');
            };
            backupScript.onload = () => {
                setTimeout(initParticles, 500);
            };
            document.head.appendChild(backupScript);
        };
        script.onload = () => {
            setTimeout(initParticles, 500);
        };
        document.head.appendChild(script);
    }
}

// 5秒后重试加载
setTimeout(retryLoadParticles, 5000);

// 打字效果
async function typeWriter(text, element, cursorElement, speed = 80) {
    element.innerHTML = '';
    cursorElement.style.visibility = 'visible';

    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text[i];
        // 更自然的打字速度变化
        const currentSpeed = speed + Math.random() * 30 - 15;
        await new Promise(resolve => setTimeout(resolve, Math.max(30, currentSpeed)));
    }

    // 光标闪烁动画
    for (let i = 0; i < 3; i++) {
        cursorElement.style.opacity = '0';
        await new Promise(resolve => setTimeout(resolve, 150));
        cursorElement.style.opacity = '1';
        await new Promise(resolve => setTimeout(resolve, 150));
    }
    cursorElement.style.visibility = 'hidden';
}

// 格言循环显示
const quotes = [
    "人一旦有了隔阂就真的走不近了，断了的绳子怎么系都有结，这世上只有和好，没有如初和好容易，如初太难",
    "爱情之酒甜而苦。两人喝，是甘露；三人喝，是酸醋；随便喝，要中毒。",
    "爱情是女人一生的历史，而只是男人一生中的一段插曲。",
    "没有爱情的人生是什么？是没有黎明的长夜！",
    "爱一个人就是指帮助他回到自己，使他更是他自己。",
    "友情是永不放弃的信念——永远相信，永远相信，永远相信。",
    "友情是永不中断的TCP连接——双向奔赴，持久稳定。",
    "爱情像递归算法：需要终止条件，更需要永恒的热情。",
    "温暖的话语能穿透最坚硬的防火墙，直达心底。",
    "陪伴是最长情的告白，就像永不超时的心跳包。",    
];

function displayQuotes() {
    let currentQuoteIndex = 0;
    const quoteDisplay = document.getElementById("quoteDisplay");
    
    setInterval(() => {
        quoteDisplay.style.transition = 'opacity 0.6s ease';
        quoteDisplay.style.opacity = 0;
        
        setTimeout(() => {
            quoteDisplay.innerHTML = quotes[currentQuoteIndex];
            quoteDisplay.style.opacity = 1;
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        }, 600);
    }, 6000);
}

// 视频切换功能
function changeVideo() {
    var select = document.getElementById("videoSelect");
    var iframe = document.getElementById("videoPlayer");
    iframe.src = select.value;
}

// 滚动导航高亮
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navLink');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// 平滑滚动到指定部分
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// 返回顶部功能
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }, { passive: true });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 导航栏滚动效果
function setupNavScroll() {
    const nav = document.getElementById('mainNav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // 滚动超过80px时添加scrolled类
        if (currentScrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
}

// 复制到剪贴板功能
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('QQ号已复制到剪贴板: ' + text);
    }).catch(err => {
        // 备用方案：使用传统方法复制
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            alert('QQ号已复制到剪贴板: ' + text);
        } catch (e) {
            prompt('无法自动复制，请手动复制:', text);
        }
        
        document.body.removeChild(textarea);
    });
}

// GitHub API调用
async function fetchGitHubProjects() {
    const username = 'SYSTEM-MEMZ-XEK';
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;
    
    try {
        const response = await fetch(apiUrl);
        const projects = await response.json();
        
        if (!response.ok) {
            throw new Error('获取GitHub项目失败');
        }
        
        displayProjects(projects);
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        document.getElementById('projects-container').innerHTML = `
            <div class="loading">
                <i class="fas fa-exclamation-circle"></i>
                <p>无法加载项目，请稍后再试</p>
            </div>
        `;
    }
}

function displayProjects(projects) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    if (projects.length === 0) {
        container.innerHTML = '<p style="text-align: center;">暂无项目</p>';
        return;
    }
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const languageTag = project.language 
            ? `<span class="language-tag">${project.language}</span>` 
            : '';
        
        const description = project.description || '暂无项目描述';
        
        card.innerHTML = `
            <h3>${project.name}</h3>
            <p>${description}</p>
            <div class="project-meta">
                <span><i class="fas fa-star"></i> ${project.stargazers_count}</span>
                <span><i class="fas fa-code-branch"></i> ${project.forks_count}</span>
                <span>${languageTag}</span>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    displayQuotes();
    setupBackToTop();
    setupNavScroll();
    
    // 滚动时高亮导航
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // 如果页面有GitHub项目部分，则加载项目
    if (document.getElementById('projects-container')) {
        fetchGitHubProjects();
    }
});