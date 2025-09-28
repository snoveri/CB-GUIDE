document.addEventListener('DOMContentLoaded', () => { //이건 뭣따 쓰는겨
  // 포커스 기능: 메인 페이지 전용 (기존 코드 유지)
  const focusContainer = document.querySelector('.focus-container');
  if (focusContainer) {
    const items = document.querySelectorAll('.item');
    const toggleBtn = document.getElementById('toggle-focus');
    let currentFocus = 0;
    let interval;
    let isHovered = false;
    let isPaused = false;

    function startAutoFocus() {
      if (isHovered || isPaused) return;
      interval = setInterval(() => {
        if (isHovered || isPaused) return;
        items[currentFocus].classList.remove('focused');
        currentFocus = (currentFocus + 1) % items.length;
        items[currentFocus].classList.add('focused');
      }, 5000);
    }

    function stopAutoFocus() {
      clearInterval(interval);
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        if (isPaused) {
          stopAutoFocus();
          toggleBtn.textContent = '포커스 재시작';
        } else {
          startAutoFocus();
          toggleBtn.textContent = '포커스 중지';
        }
      });
    }

    items[0].classList.add('focused');

    items.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        isHovered = true;
        stopAutoFocus();
        items.forEach(i => i.classList.remove('focused'));
        item.classList.add('focused');
        currentFocus = index;
      });

      item.addEventListener('mouseleave', () => {
        isHovered = false;
        if (!isPaused) setTimeout(startAutoFocus, 0);
      });
    });

    startAutoFocus();
  }

  // 병종 데이터 배열 (플레이스홀더 6개 예시, 실제 115개로 확장)
  const unitsData = [

    // 3성 부분
    { category: '3star', name: '3성 병사 1', desc: ['S20의 3성 기마병', '기마위에서 총을 쏘며 칼을 휘두르는 기마병', '성능은'], img: './img/드라군.jpg' },
    { category: '3star', name: '3성 병사 2', desc: ['기본 3성'], img: 'https://placehold.co/200x300?text=3star1' },
    { category: '3star', name: '3성 병사 3', desc: ['기본 3성'], img: 'https://placehold.co/200x300?text=3star1' },
    { category: '3star season', name: '3성 시즌 병사', desc: ['시즌 3성'], img: 'https://placehold.co/200x300?text=3star-season' },
    { category: '3star season', name: '3성 시즌 병사', desc: ['시즌 3성'], img: 'https://placehold.co/200x300?text=3star-season' },

    // 4성 부분
    { category: '4star', name: '4성 병사 1', desc: ['기본 4성'], img: 'https://placehold.co/200x300?text=4star1' },
    { category: '4star', name: '4성 병사 1', desc: ['기본 4성'], img: 'https://placehold.co/200x300?text=4star1' },
    { category: '4star', name: '4성 병사 1', desc: ['기본 4성'], img: 'https://placehold.co/200x300?text=4star1' },
    { category: '4star', name: '4성 병사 1', desc: ['기본 4성'], img: 'https://placehold.co/200x300?text=4star1' },
    { category: '4star potential', name: '4성 잠재력 병사', desc: ['잠재력 4성'], img: 'https://placehold.co/200x300?text=4star-potential' },
    { category: '4star potential', name: '4성 잠재력 병사', desc: ['잠재력 4성'], img: 'https://placehold.co/200x300?text=4star-potential' },
    { category: '4star potential', name: '4성 잠재력 병사', desc: ['잠재력 4성'], img: 'https://placehold.co/200x300?text=4star-potential' },

    //5성 부분
    { category: '5star', name: '5성 병사 1', desc: ['기본 5성'], img: 'https://placehold.co/200x300?text=5star1' },
    { category: '5star', name: '5성 병사 1', desc: ['기본 5성'], img: 'https://placehold.co/200x300?text=5star1' },
    { category: '5star', name: '5성 병사 1', desc: ['기본 5성'], img: 'https://placehold.co/200x300?text=5star1' },
    { category: '5star', name: '5성 병사 1', desc: ['기본 5성'], img: 'https://placehold.co/200x300?text=5star1' },
    { category: '5star', name: '5성 병사 1', desc: ['기본 5성'], img: 'https://placehold.co/200x300?text=5star1' },
    { category: '5star', name: '5성 병사 1', desc: ['기본 5성'], img: 'https://placehold.co/200x300?text=5star1' },
    { category: '5star', name: '5성 병사 1', desc: ['기본 5성'], img: 'https://placehold.co/200x300?text=5star1' },



    // { category: '5star season potential', name: '5성 시즌 잠재력', desc: '시즌+잠재력 5성', img: 'https://placehold.co/200x300?text=5star-sp' }
    // 여기에 실제 109개 더 추가: { category: '...', name: '...', desc: '...', img: '...' } 형식
  ];

  // 동적 카드 생성: 병종 페이지 전용
  const unitsGrid = document.querySelector('.units-grid');
  if (unitsGrid) {
    unitsData.forEach(unit => {
      const card = document.createElement('div');
      card.classList.add('units-card');
      card.dataset.category = unit.category;
      card.innerHTML = `
        <a href="unit-detail.html?unit=${unit.name.replace(/\s/g, '-')}">
          <img src="${unit.img}" alt="${unit.name}">
          <div class="card-text">
            <h4>${unit.name}</h4>
            <p>${unit.desc}</p>
          </div>
        </a>
      `;
      unitsGrid.appendChild(card);
    });
  }

  // 필터링 기능: 병종 페이지 전용
  const filterButtonsContainer = document.querySelector('.filter-buttons');
  if (filterButtonsContainer) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.units-card');
    const starFilters = ['3star', '4star', '5star'];
    const otherFilters = ['season', 'potential'];

    function applyFilters() {
      const activeFilters = Array.from(filterButtons)
        .filter(btn => btn.classList.contains('active') && btn.dataset.filter !== 'all')
        .map(btn => btn.dataset.filter);

      cards.forEach(card => {
        const categories = card.dataset.category.split(' ');
        if (activeFilters.every(filter => categories.includes(filter))) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        if (filter === 'all') {
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          cards.forEach(card => card.style.display = 'block');
        } else {
          const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
          allBtn.classList.remove('active');

          if (starFilters.includes(filter)) {
            starFilters.forEach(f => {
              if (f !== filter) {
                document.querySelector(`.filter-btn[data-filter="${f}"]`).classList.remove('active');
              }
            });
            button.classList.toggle('active');
          } else if (otherFilters.includes(filter)) {
            button.classList.toggle('active');
          }

          applyFilters();
        }
      });
    });

    // 초기 적용
    applyFilters();
  }

// unit-detail 페이지 전용
  const urlParams = new URLSearchParams(window.location.search);
  const unitParam = urlParams.get('unit');
  if (unitParam) {
    const unit = unitsData.find(u => u.name.replace(/\s/g, '-') === unitParam);
    if (unit) {
      document.getElementById('unit-img').src = unit.img;
      document.getElementById('unit-desc1').textContent = unit.desc[0] || '설명 없음'; // desc 배열 첫 번째
      document.getElementById('unit-desc2').textContent = unit.desc[1] || '설명 없음'; // desc 배열 두 번째
      document.getElementById('unit-skill-img').src = unit.skillImg || 'https://placehold.co/600x300?text=Skill+Tree+Image';
    } else {
      document.getElementById('unit-desc1').textContent = '병종을 찾을 수 없음';
    }
  }
});