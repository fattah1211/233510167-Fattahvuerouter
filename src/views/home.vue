<template>
  <div class="home-container">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Industri Kelapa Sawit Riau</h1>
      </div>  
      <div class="slider-container">
        <div class="slider-images" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <img v-for="(image, index) in sliderImages" :key="index" :src="image.src" :alt="image.alt" class="slider-image">
        </div>
        <button class="slider-nav prev" @click="prevSlide" aria-label="Gambar sebelumnya">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        <button class="slider-nav next" @click="nextSlide" aria-label="Gambar selanjutnya">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
        <div class="slider-dots">
          <button v-for="(image, index) in sliderImages" :key="index"
                :class="{ dot: true, active: index === currentSlide }"
                @click="goToSlide(index)"
                :aria-label="`Lihat gambar ${index + 1}`"></button>
        </div>
      </div>
    </section>
    <section class="info-section" ref="infoSection">
      <div class="section-header" :class="{ 'animate-in': infoSectionVisible }">
        <h2 class="section-title">Mengapa Riau Penting dalam Industri Sawit?</h2>
      </div> 
      <div class="info-cards">
        <div class="card" 
             v-for="(card, index) in infoCards" 
             :key="index"
             :class="{ 'animate-in': infoSectionVisible }"
             :style="{ animationDelay: `${index * 0.2}s` }">
          <div class="card-icon">{{ card.icon }}</div>
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-description">{{ card.description }}</p>
        </div>
      </div>
    </section>
    <section class="stats-section" ref="statsSection">
      <div class="section-header" :class="{ 'animate-in': statsSectionVisible }">
        <h2 class="section-title">Data & Statistik</h2>
        <p class="section-description">Angka-angka penting industri kelapa sawit di Riau</p>
      </div>
      <div class="stats-grid">
        <div class="stat-card" 
             v-for="(stat, index) in statistics" 
             :key="index"
             :class="{ 'animate-in': statsSectionVisible }"
             :style="{ animationDelay: `${index * 0.15}s` }">
          <div class="stat-number">{{ stat.number }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const sliderImages = ref([
  { src: '1.png', alt: 'Perkebunan Sawit Riau 1' },
  { src: '2.png', alt: 'Buah Tandan Segar' },
  { src: '4.png', alt: 'Petani Sawit Bekerja' }
]);
const infoCards = ref([
  {
    icon: '🌴',
    title: 'Produsen Terbesar',
    description: 'Riau adalah provinsi terbesar penghasil kelapa sawit di Indonesia, dengan luas lahan perkebunan mencapai jutaan hektar.'
  },
  {
    icon: '👨‍🌾',
    title: 'Mata Pencarian Utama',
    description: 'Rata-rata penduduk di Riau memiliki lahan sawit, menjadikan kelapa sawit sebagai tulang punggung ekonomi dan mata pencarian utama.'
  },
  {
    icon: '📈',
    title: 'Dampak Ekonomi',
    description: 'Industri kelapa sawit memberikan kontribusi signifikan terhadap PDB regional dan nasional, menciptakan lapangan kerja bagi ribuan masyarakat.'
  }
]);
const statistics = ref([
  { number: '10 Juta', label: 'Hektar Lahan' },
  { number: '20%', label: 'Kontribusi PDB' },
  { number: '600 Ribu', label: 'Petani Sawit' },
  { number: '50 Juta', label: 'Ton Produksi/Tahun' }
]);

const currentSlide = ref(0);
const infoSection = ref(null);
const statsSection = ref(null);
const infoSectionVisible = ref(false);
const statsSectionVisible = ref(false);

let slideInterval;
let observer;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % sliderImages.value.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + sliderImages.value.length) % sliderImages.value.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};
const setupScrollAnimation = () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target === infoSection.value) {
          infoSectionVisible.value = true;
        } else if (entry.target === statsSection.value) {
          statsSectionVisible.value = true;
        }
      }
    });
  }, {
    threshold: 0.2, 
    rootMargin: '0px 0px -50px 0px'
  });

  if (infoSection.value) {
    observer.observe(infoSection.value);
  }
  if (statsSection.value) {
    observer.observe(statsSection.value);
  }
};

onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000);
  setupScrollAnimation();
});

onUnmounted(() => {
  clearInterval(slideInterval);
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.hero-section {
  position: relative;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #f0fff4 100%);
  text-align: center;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23e0f2e7" opacity="0.3"/><circle cx="75" cy="75" r="1" fill="%23e0f2e7" opacity="0.3"/><circle cx="50" cy="10" r="1" fill="%23e0f2e7" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.1;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  margin-bottom: 3rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #1a5f3f;
  margin-bottom: 1rem;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1.4rem;
  color: #4a7c59;
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.slider-container {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  background: #fff;
}

.slider-images {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.slider-image {
  width: 100%;
  height: 500px;
  flex-shrink: 0;
  object-fit: cover;
  object-position: center;
  display: block;
}

.slider-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  color: #1a5f3f;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 10;
}
.slider-nav:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.slider-nav.prev {
  left: 20px;
}

.slider-nav.next {
  right: 20px;
}

.slider-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.dot.active {
  background: #46b910;
  transform: scale(1.3);
  box-shadow: 0 0 20px rgba(70, 185, 16, 0.4);
}

/* Section styling */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.section-header.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  color: #1a5f3f;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #46b910, #7fd687);
  border-radius: 2px;
}

.section-description {
  font-size: 1.2rem;
  color: #5a7c65;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.info-section {
  padding: 6rem 2rem;
  background: #ffffff;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fffe 100%);
  border: 1px solid #e0f2e7;
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(50px) scale(0.95);
}

.card.animate-in {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
}

.card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(70, 185, 16, 0.05) 0%, transparent 70%);
  transition: transform 0.6s ease;
  transform: scale(0);
}

.card:hover::before {
  transform: scale(1);
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: #46b910;
}

.card-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.card-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1a5f3f;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.card-description {
  font-size: 1.1rem;
  color: #5a7c65;
  line-height: 1.7;
  position: relative;
  z-index: 1;
}

.stats-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #46b910 0%, #7fd687 100%);
  color: white;
}

.stats-section .section-title {
  color: white;
}

.stats-section .section-title::after {
  background: rgba(255, 255, 255, 0.8);
}

.stats-section .section-description {
  color: rgba(255, 255, 255, 0.9);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(50px) scale(0.9);
}

.stat-card.animate-in {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .slider-image {
    height: 300px;
  }
  
  .info-cards {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 2rem 1rem;
  }
  
  .info-section,
  .stats-section {
    padding: 4rem 1rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .slider-nav {
    width: 40px;
    height: 40px;
  }
  
  .slider-nav.prev {
    left: 10px;
  }
  
  .slider-nav.next {
    right: 10px;
  }
}
</style>