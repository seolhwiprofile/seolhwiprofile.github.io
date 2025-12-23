/**
 * 설휘 캐릭터 소개 사이트 - JavaScript
 * 정통 무협/선협 테마
 */

// ==========================================
// 로딩 화면
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // 2.5초 후 로딩 화면 숨기기
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // AOS 애니메이션 초기화
        initAOS();
    }, 2500);
});


// ==========================================
// 배경 음악 컨트롤
// ==========================================
const audioControl = document.getElementById('audioControl');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

audioControl.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        audioControl.classList.remove('playing');
    } else {
        bgMusic.play().catch(e => {
            console.log('오디오 재생 실패:', e);
        });
        audioControl.classList.add('playing');
    }
    isPlaying = !isPlaying;
});

// 볼륨 설정
bgMusic.volume = 0.3;

// ==========================================
// 스크롤 기반 애니메이션 (AOS 대체)
// ==========================================
function initAOS() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 딜레이 처리
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, observerOptions);
    
    // 모든 [data-aos] 요소 관찰
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// 장면 전환 (그리팅 섹션)
// ==========================================
const sceneBtns = document.querySelectorAll('.scene-btn');
const scenes = document.querySelectorAll('.greeting-scene');

sceneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const sceneId = btn.dataset.scene;
        
        // 버튼 활성화 상태 변경
        sceneBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // 장면 전환
        scenes.forEach(scene => {
            scene.classList.remove('active');
            if (scene.id === `scene${sceneId}`) {
                scene.classList.add('active');
            }
        });
    });
});

// ==========================================
// 부드러운 스크롤 (네비게이션 링크)
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// 패럴랙스 효과 (히어로 섹션)
// ==========================================
const heroImage = document.querySelector('.hero-image-container');
const heroTitle = document.querySelector('.hero-title-wrap');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroSection = document.getElementById('hero');
    const heroHeight = heroSection.offsetHeight;
    
    if (scrollY < heroHeight) {
        const progress = scrollY / heroHeight;
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
        
        if (heroTitle) {
            heroTitle.style.transform = `translateY(${scrollY * 0.2}px)`;
            heroTitle.style.opacity = 1 - progress * 0.5;
        }
    }
});

// ==========================================
// 갤러리 이미지 확대 효과
// ==========================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            // 간단한 라이트박스 효과
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="lightbox-close">&times;</button>
                </div>
            `;
            
            // 스타일 추가
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            `;
            
            const lightboxContent = lightbox.querySelector('.lightbox-content');
            lightboxContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
            `;
            
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.style.cssText = `
                max-width: 100%;
                max-height: 90vh;
                object-fit: contain;
                border-radius: 8px;
                box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
            `;
            
            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                padding: 10px;
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // 닫기 이벤트
            const closeLightbox = () => {
                lightbox.remove();
                document.body.style.overflow = '';
            };
            
            lightbox.addEventListener('click', closeLightbox);
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeLightbox();
            });
            
            // ESC 키로 닫기
            const handleKeydown = (e) => {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', handleKeydown);
                }
            };
            document.addEventListener('keydown', handleKeydown);
        }
    });
});

// ==========================================
// 성격 바 애니메이션
// ==========================================
const personalityBars = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
            
            barObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

personalityBars.forEach(bar => {
    barObserver.observe(bar);
});

// ==========================================
// 텍스트 타이핑 효과 (선택적)
// ==========================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ==========================================
// 스크롤 인디케이터 숨기기
// ==========================================
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
});

// ==========================================
// 페이드인 애니메이션 CSS 추가
// ==========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .lightbox {
        animation: fadeIn 0.3s ease;
    }
`;
document.head.appendChild(style);

// ==========================================
// 콘솔 메시지
// ==========================================
console.log(`
%c❅ 雪輝 (설휘) ❅
%c천산의 설휘각에 오신 것을 환영합니다.

"기다리고 있었습니다. 차가 식기 전에 오셔서 다행이군요."

`, 
'color: #c53030; font-size: 24px; font-weight: bold;',
'color: #a8d4e6; font-size: 14px;'
);

