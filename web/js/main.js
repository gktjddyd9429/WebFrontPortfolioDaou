/**
 * main.js
 * 메인 애플리케이션 - 네비게이션, 히어로, 스킬, 프로젝트 그리드, 파티클, 리빌 애니메이션
 */

// ─────────────────────────────────────────────
// 초기화
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHeroParticles();
  initHeroTyping();
  initTechIcons();
  initProjectsGrid();
  initDaouValues();
  initAboutSection();
  initFilterTabs();
  initScrollProgress();
  initCardTilt();
  initRevealObserver();
});

// ─────────────────────────────────────────────
// 1. Navigation
// ─────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('site-nav');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-close');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a[data-section]');

  // 스크롤에 따른 nav 스타일
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
    updateActiveNav();
  }, { passive: true });

  // 햄버거
  hamburger?.addEventListener('click', () => {
    mobileNav?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  mobileClose?.addEventListener('click', closeMobileNav);
  mobileNav?.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeMobileNav();
  });

  function closeMobileNav() {
    mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
  }

  // 스무스 스크롤
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        closeMobileNav();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let currentId = '';

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active');
    }
  });
}

// ─────────────────────────────────────────────
// 2. 히어로 인터랙티브 스타 필드 (오른쪽 차분하고 은은한 별 군집 & 부드러운 회피 기믹)
// ─────────────────────────────────────────────
function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let animId;
  // 마우스 감지 반경을 컴팩트하게 조절하고 과도한 튕김 억제
  let mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, vx: 0, vy: 0, radius: 110 };

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  class InteractiveStar {
    constructor(w, h) {
      this.w = w;
      this.h = h;
      this.reset();
    }

    reset() {
      // 80%의 별을 첫 페이지 오른쪽 영역(가로 52%~94%, 세로 15%~85%)에 은은하게 분산 배치
      const isRightCluster = Math.random() < 0.80;
      if (isRightCluster) {
        this.originX = this.w * (0.52 + Math.random() * 0.42);
        this.originY = this.h * (0.15 + Math.random() * 0.70);
      } else {
        this.originX = Math.random() * this.w;
        this.originY = Math.random() * this.h;
      }

      this.x = this.originX;
      this.y = this.originY;
      this.vx = 0;
      this.vy = 0;

      // 크기: 과하지 않고 단정한 미세 핀포인트 닷 (0.7px ~ 1.6px)
      this.baseRadius = Math.random() < 0.25 ? Math.random() * 0.6 + 1.0 : Math.random() * 0.5 + 0.6;
      this.radius = this.baseRadius;
      this.alpha = Math.random() * 0.45 + 0.25;
      this.twinkleSpeed = Math.random() * 0.015 + 0.006;
      this.twinkleOffset = Math.random() * Math.PI * 2;

      // 다우 금융 테마 컬러 (시그니처 블루, 시안, 딥 블루, 상승 그린, 스카이)
      const colors = ['#2484C6', '#43D4E9', '#1272BA', '#00C96B', '#B0D2FF'];
      this.color = colors[Math.floor(Math.random() * colors.length)];

      // 잔잔하고 느긋한 자체 부유(Float) 진폭과 속도
      this.floatAngle = Math.random() * Math.PI * 2;
      this.floatSpeed = Math.random() * 0.006 + 0.003;
      this.floatRadius = Math.random() * 3 + 1.5;
    }

    update() {
      // 1. 미세 유영 궤도 계산
      this.floatAngle += this.floatSpeed;
      const targetBaseX = this.originX + Math.cos(this.floatAngle) * this.floatRadius;
      const targetBaseY = this.originY + Math.sin(this.floatAngle) * this.floatRadius;

      // 2. 마우스 접근 시 부드럽게 옆으로 비켜서는 온화한 물리 기믹
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius && dist > 0) {
        const force = (1 - dist / mouse.radius);
        const angle = Math.atan2(dy, dx);

        // 거친 충격 없이 스르륵 옆으로 비켜나는 온화한 수평 힘
        const sideDir = dx >= 0 ? 1 : -1;
        const pushX = (Math.cos(angle) * 0.4 + sideDir * 0.6) * force * 3.5;
        const pushY = Math.sin(angle) * force * 1.5;

        this.vx += pushX;
        this.vy += pushY;
      }

      // 3. 차분하고 안정적인 복원 (스프링과 감쇠 계수로 튀거나 떨림 방지)
      const spring = 0.022;
      const friction = 0.93;

      this.vx += (targetBaseX - this.x) * spring;
      this.vy += (targetBaseY - this.y) * spring;

      this.vx *= friction;
      this.vy *= friction;

      this.x += this.vx;
      this.y += this.vy;

      // 4. 은은하고 편안한 반짝임
      this.twinkleOffset += this.twinkleSpeed;
      this.currentAlpha = this.alpha * (0.75 + 0.25 * Math.sin(this.twinkleOffset));
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.min(0.85, Math.max(0.12, this.currentAlpha));
      ctx.shadowBlur = this.radius * 2;
      ctx.shadowColor = this.color;
      ctx.fillStyle = this.color;

      // 깨끗하고 정갈한 미세 원형 점만 렌더링 (과도한 십자 스파클 제거)
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  function initStars() {
    // 여백의 미를 살려 차분하고 깔끔한 개수(40~65개)로 생성
    const count = Math.min(65, Math.max(35, Math.floor(canvas.width / 22)));
    stars = Array.from({ length: count }, () => new InteractiveStar(canvas.width, canvas.height));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.update();
      s.draw();
    });

    mouse.vx *= 0.5;
    mouse.vy *= 0.5;
    animId = requestAnimationFrame(animate);
  }

  resize();
  initStars();
  animate();

  window.addEventListener('resize', () => {
    resize();
    initStars();
  }, { passive: true });

  const hero = canvas.closest('#hero');
  if (hero) {
    const handleMove = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const newX = clientX - rect.left;
      const newY = clientY - rect.top;
      if (mouse.prevX !== -9999) {
        mouse.vx = newX - mouse.prevX;
        mouse.vy = newY - mouse.prevY;
      }
      mouse.x = newX;
      mouse.y = newY;
      mouse.prevX = newX;
      mouse.prevY = newY;
    };

    hero.addEventListener('mousemove', e => {
      handleMove(e.clientX, e.clientY);
    });

    hero.addEventListener('mouseleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.prevX = -9999;
      mouse.prevY = -9999;
      mouse.vx = 0;
      mouse.vy = 0;
    });

    hero.addEventListener('touchmove', e => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    hero.addEventListener('touchend', () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.prevX = -9999;
      mouse.prevY = -9999;
    });
  }
}

// ─────────────────────────────────────────────
// 3. 히어로 타이핑 애니메이션
// ─────────────────────────────────────────────
function initHeroTyping() {
  const el = document.getElementById('hero-typing');
  if (!el) return;
  const words = [
    'C / Java 시스템 개발자',
    '실시간 성능 최적화 경험',
    'AI + Android 앱 파이프라인 구축',
    '다우기술을 꿈꾸는 엔지니어',
    '대규모 시스템 아키텍처 설계',
  ];
  let wi = 0, ci = 0, deleting = false;

  function type() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 55 : 80);
  }
  type();
}

// ─────────────────────────────────────────────
// 4. IntersectionObserver 리빌 애니메이션
// ─────────────────────────────────────────────
function initRevealObserver() {
  const opts = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // skill bar 트리거
        const fills = entry.target.querySelectorAll('.skill-bar-fill');
        fills.forEach(f => f.classList.add('animate'));
      }
    });
  }, opts);

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

// ─────────────────────────────────────────────
// 5. 스킬 바 렌더링
// ─────────────────────────────────────────────
function initSkillBars() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  // 이미 HTML에 정적 스킬 카드가 마크업되어 있다면 덮어쓰지 않고 보존
  const staticGroups = container.querySelectorAll('.skill-group');
  if (staticGroups.length >= 4) {
    return;
  }

  if (typeof SKILLS_DATA === 'undefined') return;

  container.innerHTML = SKILLS_DATA.map(group => `
    <div class="skill-group reveal" style="--delay:${SKILLS_DATA.indexOf(group) * 0.15}s">
      <div class="skill-group-title">
        <div class="skill-group-icon ${group.iconClass}">${group.icon}</div>
        <span class="skill-group-name">${group.group}</span>
      </div>
      ${group.skills.map(skill => `
        <div class="skill-row">
          <div class="skill-name">${skill.name}</div>
          <div class="skill-bar-wrap">
            <div class="skill-bar-fill" style="width:${skill.level}%"></div>
          </div>
          <div class="skill-level">${skill.level}%</div>
        </div>
        <p class="text-muted font-code" style="font-size:0.75rem;margin-bottom:1rem;margin-left:140px">${skill.sub}</p>
      `).join('')}
    </div>
  `).join('');
}

// ─────────────────────────────────────────────
// 6. 프로젝트 그리드 렌더링
// ─────────────────────────────────────────────
let currentFilter = 'all';

function initProjectsGrid() {
  renderProjects('all');
}

function renderProjects(filter) {
  currentFilter = filter;
  const grid = document.getElementById('projects-grid');
  if (!grid || typeof PROJECTS_DATA === 'undefined') return;

  const filtered = filter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === filter);

  grid.innerHTML = filtered.map((proj, idx) => buildProjectCard(proj, idx)).join('');

  // 클릭 이벤트
  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.projectId;
      const proj = PROJECTS_DATA.find(p => p.id === id);
      if (proj) openProjectModal(proj);
    });
  });

  // 틸트 재등록
  initCardTilt();

  // 리빌 옵저버 재등록
  const opts = { threshold: 0.05 };
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, opts);
  grid.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function buildProjectCard(proj, idx) {
  const delay = `${(idx % 3) * 0.1}s`;
  const thumb = proj.media.thumbnail
    ? `<img src="${proj.media.thumbnail}" alt="${proj.title}" loading="lazy" onerror="this.parentElement.innerHTML=cardPlaceholder('${proj.title}')">`
    : `<div class="card-thumbnail-placeholder">${cardPlaceholder(proj.title)}</div>`;

  const valueBadges = proj.values.map(v => {
    const meta = (typeof DAOU_FIT_TAGS !== 'undefined') ? DAOU_FIT_TAGS[v] : null;
    return meta ? `<span class="badge badge-${meta.class}">${meta.label}</span>` : '';
  }).join('');

  const tags = proj.tags.slice(0, 5).map(t =>
    `<span class="badge badge-ghost">${t}</span>`
  ).join('');

  const hasYoutube = proj.links.youtube;
  const hasGithub = proj.links.github;

  return `
    <div class="project-card ${proj.isFeatured ? 'featured' : ''} reveal tilt-card"
         style="animation-delay:${delay}"
         data-project-id="${proj.id}">
      <div class="card-thumbnail">
        ${thumb}
        <div class="card-thumbnail-overlay"></div>
        <div class="card-type-badge">
          <span class="badge ${proj.isFeatured ? 'badge-blue' : 'badge-ghost'}">
            ${proj.isFeatured ? '⭐ MAIN' : 'SUB'}
          </span>
        </div>
        ${proj.media.videoUrl ? '<div class="card-play-btn">▶</div>' : ''}
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="badge badge-ghost font-code" style="font-size:0.65rem">${proj.engine}</span>
          <span class="text-muted font-code" style="font-size:0.7rem">${proj.periodShort}</span>
        </div>
        ${valueBadges ? `<div class="card-meta" style="margin-top:0.5rem">${valueBadges}</div>` : ''}
        <h4 class="card-title">${proj.title}
          ${proj.titleKr ? `<span style="color:var(--nexon-text-muted);font-size:0.85em;font-weight:400"> · ${proj.titleKr}</span>` : ''}
        </h4>
        <p class="card-desc">${proj.summary}</p>
        ${proj.achievement ? `
          <div class="card-achievement">
            <span></span>
            <span>${proj.achievement}</span>
          </div>` : ''}
        <div class="card-tags">${tags}</div>
        <div class="card-footer">
          <div class="card-links" onclick="event.stopPropagation()">
            ${hasGithub ? `<a href="${proj.links.github}" target="_blank" class="btn btn-ghost btn-sm">GitHub</a>` : ''}
            ${hasYoutube ? `<a href="${proj.links.youtube}" target="_blank" class="btn btn-secondary btn-sm">▶ Demo</a>` : ''}
          </div>
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openProjectModalById('${proj.id}')">
            Deep-Dive →
          </button>
        </div>
      </div>
    </div>
  `;
}

function cardPlaceholder(title) {
  return `
    <div class="card-thumbnail-placeholder">
      <div class="placeholder-icon">🎮</div>
      <span style="font-size:0.75rem">${title}</span>
    </div>
  `;
}

// 전역 함수로 노출
window.openProjectModalById = function (id) {
  const proj = PROJECTS_DATA.find(p => p.id === id);
  if (proj) openProjectModal(proj);
};

// ─────────────────────────────────────────────
// 7. 필터 탭
// ─────────────────────────────────────────────
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      renderProjects(filter);
    });
  });
}

// ─────────────────────────────────────────────
// 8. 다우 인재상 카드
// ─────────────────────────────────────────────
function initDaouValues() {
  const container = document.getElementById('values-container');
  if (!container || typeof DAOU_FIT_TAGS === 'undefined') return;

  const valueEvidences = {
    system: [
      'C++로 OpenGL 렌더링 파이프라인 + DICOM 의료 영상 파이프라인 직접 구현',
      'C#(Unity)으로 VR 시뮬레이션 클라이언트 1년 총괄.',
    ],
    realtime: [
      'VR HMD 90fps 달성 — URP 렌더 패스 코드 직접 분석·다운샘플링 최적화',
      '"1초의 지연도 손실" — 증권 시스템 철학과 동일한 경험 보유',
    ],
    ai: [
      'DTW(Dynamic Time Warping) 시계열 매칭 알고리즘 직접 구현 (97.8% 정밀도)',
      'AI 프롬프트 설계 + SSAFY AI 교육 이수 (2026.07~)',
    ],
    mobile: [
      'Android Studio 기반 이오름 앱 (AI 음성 분석 UI + REST 비동기 통신)',
      'FastAPI ↔ Android 대용량 멀티미디어 파이프라인 구축',
    ],
  };

  container.innerHTML = Object.entries(DAOU_FIT_TAGS).map(([key, meta]) => `
    <div class="value-card ${meta.class} reveal">
      <div class="value-keyword">${meta.label}</div>
      <div class="value-title">${meta.kr}</div>
      <p class="value-desc">${meta.desc}</p>
      <ul class="value-evidences">
        ${valueEvidences[key] ? valueEvidences[key].map(e => `<li>${e}</li>`).join('') : ''}
      </ul>
    </div>
  `).join('');
}

// ─────────────────────────────────────────────
// 9. About 섹션
// ─────────────────────────────────────────────
function initAboutSection() {
  // 타임라인 자동 진입 애니메이션은 reveal에서 처리
  // 연락처는 HTML에 하드코딩
}



// ─────────────────────────────────────────────
// 11. 스크롤 진행 바
// ─────────────────────────────────────────────
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ─────────────────────────────────────────────
// 12. 카드 3D 틸트
// ─────────────────────────────────────────────
function initCardTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / (rect.height / 2)) * -5;
      const ry = ((e.clientX - cx) / (rect.width / 2)) * 5;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
