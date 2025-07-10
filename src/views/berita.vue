<template>
  <div class="berita-container">
    <section v-if="!selectedArticle" class="berita-list-section card-section">
      <div class="berita-grid">
        <div 
          v-for="(article, index) in filteredArticles" 
          :key="article.id" 
          class="berita-card fade-in-element" 
          :style="{ 'animation-delay': `${index * 0.1}s` }"
          @click="viewArticle(article)"
        >
          <img :src="article.image" :alt="article.title" class="berita-image">
          <div class="berita-content">
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-date">{{ article.date }}</p>
            <p class="article-snippet">{{ article.snippet }}</p>
            <button class="read-more-button">Baca Selengkapnya</button>
          </div>
        </div>
        <p v-if="filteredArticles.length === 0" class="no-news-message">Berita tidak ditemukan.</p>
      </div>
    </section>
    <section v-else class="article-detail-section card-section">
      <button @click="goBackToList" class="back-button fade-in-element">← Kembali ke Berita</button>
      <h1 class="article-detail-title fade-in-element">{{ selectedArticle.title }}</h1>
      <p class="article-detail-date fade-in-element">{{ selectedArticle.date }}</p>

      <div class="article-body-layout">
        <div class="article-full-content fade-in-element">
          <p v-for="(paragraph, index) in selectedArticle.fullContent" :key="index">{{ paragraph }}</p>
        </div>

        <div v-if="selectedArticle.galleryImages?.length > 0" class="article-gallery-container fade-in-element">
          <div class="article-gallery-images" :style="{ transform: `translateX(-${currentGallerySlide * 100}%)` }">
            <img v-for="(img, idx) in selectedArticle.galleryImages" :key="idx" :src="img.src" :alt="img.alt" class="article-gallery-image">
          </div>
          <button v-if="selectedArticle.galleryImages.length > 1" class="gallery-nav prev" @click="prevGallerySlide">&#10094;</button>
          <button v-if="selectedArticle.galleryImages.length > 1" class="gallery-nav next" @click="nextGallerySlide">&#10095;</button>
          <div v-if="selectedArticle.galleryImages.length > 1" class="gallery-dots">
            <span v-for="(img, idx) in selectedArticle.galleryImages" :key="idx"
                  :class="{ dot: true, active: idx === currentGallerySlide }"
                  @click="goToGallerySlide(idx)"></span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useSearchStore } from '../stores/searchStore';

const selectedArticle = ref(null);
const currentGallerySlide = ref(0);
const searchStore = useSearchStore();
const observer = ref(null);

const newsArticles = ref([
  {
    id: 1,
    title: 'Harga TBS Sawit Riau Stabil di Awal Juli',
    date: '01 Juli 2024',
    snippet: 'Harga Tandan Buah Segar (TBS) kelapa sawit di Provinsi Riau menunjukkan stabilitas di awal bulan Juli, memberikan angin segar bagi petani.',
    fullContent: [
      'Berdasarkan hasil penetapan harga kelapa sawit periode 2 – 8 Juli 2025 telah menggunakan tabel rendemen harga baru hasil kajian dari PPKS Medan yang disepakati oleh tim, untuk kenaikan harga tertinggi berada di kelompok umur 9 tahun sebesar Rp14,93/Kg atau mencapai 0,46% dari harga periode lalu. Sehingga harga pembelian TBS petani untuk periode satu minggu kedepan naik menjadi Rp 3.284,88/Kg dan berlaku untuk periode satu minggu kedepan. ',
      'Petani di berbagai kabupaten seperti Kampar, Pelalawan, dan Indragiri Hulu menyambut baik stabilitas ini, faktor-faktor yang mempengaruhi stabilitas harga meliputi permintaan global, kebijakan biodiesel, serta pasokan yang terkontrol.',
    ],
    image: '2.png',
    galleryImages: [
      { src: '2.png', alt: 'Perkebunan Sawit Riau' }
    ]
  },
  {
    id: 2,
    title: 'Pentingnya pupuk bagi tanaman sawit',
    date: '28 Juni 2024',
    snippet: 'Dalam bertani persawitan kita harus menjaga sawit kita agar tetap terawat, yaitu memberikan pupuk sesuai dosis dan waktu yang tepat',
    fullContent: [
      'Pupuk untuk kelapa sawit adalah jenis pupuk yang dirancang untuk meningkatkan pertumbuhan dan produktivitas tanaman kelapa sawit dengan memberikan nutrisi yang dibutuhkan.',
      'Pupuk ini bisa berupa pupuk tunggal atau pupuk majemuk, dan mengandung unsur hara makro seperti nitrogen, fosfor, dan kalium, serta unsur hara mikro seperti magnesium, tembaga, dan boron.',
      'Pemilihan jenis pupuk dan dosis yang tepat, serta waktu dan cara pemupukan yang sesuai, sangat penting untuk mencapai hasil panen yang optimal. ',
    ],
    image: 'pupuk.png',
    galleryImages: [
      { src: 'pupuk.png' },
    ]
  },
  {
    id: 3,
    title: 'Pemerinтаh dorong hilirisasi industri sawit di Riau untuk meningkatkan nilai tambah dan ekonomi daerah',
    date: '25 Juni 2024',
    snippet: 'Upaya pemerintah untuk meningkatkan nilai tambah produk kelapa sawit melalui program hilirisasi terus digencarkan di wilayah Riau.',
    fullContent: [
      'Pemerintah Indonesia terus mendorong upaya hilirisasi industri kelapa sawit di Provinsi Riau sebagai salah satu strategi untuk meningkatkan nilai tambah komoditas unggulan tersebut.',
      'Riau dikenal sebagai salah satu daerah penghasil sawit terbesar di Indonesia, namun sebagian besar produk sawitnya masih dijual dalam bentuk bahan mentah seperti CPO.',
      'Dengan melalui hilirisasi, pemerintah mendorong industri pengolahan sawit agar tidak hanya berhenti pada tahap CPO, tetapi berkembang hingga menghasilkan produk turunan bernilai tinggi seperti minyak goreng, biodiesel, sabun, kosmetik, dan bahan kimia industri lainnya.',
    ],
    image: '3.png',
    galleryImages: [
      { src: '3.png', alt: 'Pabrik Pengolahan Modern' },
    ]
  }
]);

const filteredArticles = computed(() => {
  const keyword = searchStore.keyword.toLowerCase();
  if (!keyword) return newsArticles.value;
  return newsArticles.value.filter(article =>
    article.title.toLowerCase().includes(keyword) ||
    article.snippet.toLowerCase().includes(keyword) ||
    article.fullContent.some(paragraph => paragraph.toLowerCase().includes(keyword))
  );
});

const setupScrollAnimation = () => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );
  const elements = document.querySelectorAll('.fade-in-element');
  elements.forEach(el => observer.value.observe(el));
};

const viewArticle = (article) => {
  selectedArticle.value = article;
  currentGallerySlide.value = 0;
  

  window.scrollTo({ top: 0, behavior: 'smooth' });

  setTimeout(() => {
    setupScrollAnimation();
  }, 100);
};

const goBackToList = () => {
  selectedArticle.value = null;
  setTimeout(() => {
    setupScrollAnimation();
  }, 100);
};

const nextGallerySlide = () => {
  if (!selectedArticle.value?.galleryImages) return;
  currentGallerySlide.value = (currentGallerySlide.value + 1) % selectedArticle.value.galleryImages.length;
};

const prevGallerySlide = () => {
  if (!selectedArticle.value?.galleryImages) return;
  currentGallerySlide.value =
    (currentGallerySlide.value - 1 + selectedArticle.value.galleryImages.length) %
    selectedArticle.value.galleryImages.length;
};

const goToGallerySlide = (index) => {
  currentGallerySlide.value = index;
};

onMounted(() => {
  setupScrollAnimation();
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>

<style scoped>
.berita-container {
  padding: 1.5rem 2rem;
  background-color: transparent;
  color: var(--text-primary);
}

.berita-title {
  color: var(--accent-dark-green); 
  font-size: 2.8rem;
  margin-bottom: 0.8rem;
  font-weight: bold;
  line-height: 1.2;
}

.berita-description {
  color: var(--text-primary);
  font-size: 1.15rem;
  max-width: 750px;
  margin: 0 auto 1.2rem;
  line-height: 1.6;
}

.card-section {
  background-color: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 3px 10px var(--shadow-light);
  margin-bottom: 2rem;
}

.section-title {
  color: var(--accent-green); 
  font-size: 2rem;
  margin-bottom: 2.5rem;
  font-weight: bold;
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background-color: var(--accent-green); 
  border-radius: 2px;
}

.berita-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
}

.berita-card {
  background-color: white; 
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.berita-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.berita-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.berita-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.article-title {
  color: var(--accent-dark-green); 
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  line-height: 1.3;
}

.article-date {
  font-size: 0.9rem;
  color: var(--text-primary); 
  opacity: 0.7;
  margin-bottom: 1rem;
}

.article-snippet {
  color: var(--text-primary); 
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.read-more-button {
  background-color: var(--accent-green);
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 6px;
  align-self: flex-start;
  transition: 0.3s;
}

.read-more-button:hover {
  background-color: var(--accent-dark-green);
}

.no-news-message {
  grid-column: 1 / -1;
  text-align: center;
  font-style: italic;
  color: var(--text-primary); 
  opacity: 0.8;
  padding: 2rem;
}

.article-detail-section {
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.back-button {
  background: none;
  border: none;
  color: var(--accent-dark-green);
  font-size: 1.1rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
}

.back-button:hover {
  color: var(--accent-green);
  text-decoration: underline;
}

.article-detail-title {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.article-detail-date {
  font-size: 0.95rem;
  color: #888;
  margin-bottom: 1.5rem;
}

.article-body-layout {
  display: flex; 
  flex-wrap: wrap; 
  gap: 2.5rem; 
  margin-top: 2rem;
}

.article-full-content {
  flex: 2; 
  min-width: 300px; 
  color: var(--text-primary);
  font-size: 1.1rem;
  line-height: 1.8;
  text-align: justify;
}

.article-full-content p {
  margin-bottom: 1rem;
}

.article-gallery-container {
  flex: 1; 
  min-width: 300px; 
  position: relative;
  height: 450px; 
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 15px var(--shadow-medium);
  background-color: var(--card-bg);
}

.article-gallery-images {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.article-gallery-image {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  object-fit: cover;
  display: block;
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 0.8rem 1rem;
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  z-index: 10;
}

.gallery-nav:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.gallery-nav.prev {
  left: 15px;
}

.gallery-nav.next {
  right: 15px;
}

.gallery-dots {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.gallery-dots .dot {
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.gallery-dots .dot.active {
  background-color: var(--accent-green);
  transform: scale(1.2);
  border: 1px solid var(--accent-dark-green);
}

.fade-in-element {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-element.visible {
  opacity: 1;
  transform: translateY(0);
}

.berita-card.fade-in-element {
  transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease;
}

.berita-card.fade-in-element.visible {
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.article-detail-section .fade-in-element {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.article-detail-section .fade-in-element.visible {
  opacity: 1;
  transform: translateY(0);
}

.article-detail-section .fade-in-element:nth-child(1) {
  transition-delay: 0s;
}

.article-detail-section .fade-in-element:nth-child(2) {
  transition-delay: 0.1s;
}

.article-detail-section .fade-in-element:nth-child(3) {
  transition-delay: 0.2s;
}

.article-detail-section .fade-in-element:nth-child(4) {
  transition-delay: 0.3s;
}

.article-detail-section .fade-in-element:nth-child(5) {
  transition-delay: 0.4s;
}

@media (max-width: 768px) {
  .berita-title {
    font-size: 2rem;
  }
  .berita-description {
    font-size: 1rem;
  }
  .section-title {
    font-size: 1.8rem;
  }
  .berita-grid {
    grid-template-columns: 1fr;
  }
  .article-detail-title {
    font-size: 2rem;
  }
  .article-full-content {
    font-size: 1rem;
    text-align: left; 
  }
  .article-gallery-container {
    height: 300px; 
    margin: 1.5rem auto; 
  }
  .article-body-layout {
    flex-direction: column; 
  }
 
  .fade-in-element {
    transform: translateY(20px);
  }
}


html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  .fade-in-element {
    transition: none;
  }
  
  .fade-in-element.visible {
    opacity: 1;
    transform: none;
  }
}
</style>