<template>
  <div class="jenis-sawit-container">
    <div class="jenis-list">
      <div class="jenis-card">
        <img src="/image/dura.png" alt="Sawit Dura" class="jenis-image">
        <h3>Dura</h3>
        <p>Varietas Dura memiliki cangkang tebal dan inti biji yang besar. Kandungan minyak per buahnya cenderung lebih rendah.</p>
        <ul>
          <li>Cangkang Tebal</li>
          <li>Inti Biji Besar</li>
          <li>Kandungan Minyak Rendah</li>
        </ul>
      </div>
      <div class="jenis-card">
        <img src="/image/ppks.png" alt="Sawit Ppks" class="jenis-image">
        <h3>PPKS</h3>
        <p> PPKS 718 merupakan varietas turunan Yangambi yang memiliki karakter bobot tandan yang besar, 10% lebih tinggi dari rerata bobot tandan umumnya. Rerata bobot tandan varietas pada umur 6 - 9 tahun sebesar 22,8 kg/tandan, dan potensi produksi TBS sebesar 32 ton/ha/tahun.</p>
        <ul>
          <li>Memiliki bobot sekitar 22,8 kg/tandan</li>
          <li>Memiliki kandungan minyak yang tinggi</li>
          <li>hasil persilangan antara Dura DA115D self x LM718T self. </li>
        </ul>
      </div>
      <div class="jenis-card">
        <img src="/image/tenera.png" alt="Sawit Tenera" class="jenis-image">
        <h3>Tenera</h3>
        <p>Tenera adalah hasil persilangan antara Dura dan Pisifera. Varietas ini memiliki cangkang tipis dan kandungan minyak yang tinggi, menjadikannya varietas komersial utama.</p>
        <ul>
          <li>Cangkang Tipis</li>
          <li>Kandungan Minyak Tinggi</li>
          <li>Varietas Komersial Utama</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.jenis-sawit-container {
  padding: 2rem;
  text-align: center;
  color: #333;
}

h1 {
  color: #7fd687;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.jenis-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  justify-content: center;
}

.jenis-card {
  background-color: #f9fdfb;
  border: 1px solid #d7f5da;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.jenis-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.jenis-card h3 {
  color: #165c26;
  font-size: 1.6rem;
  margin-top: 1rem;
  margin-bottom: 0.8rem;
  border-bottom: 2px solid #b6e5bc;
  padding-bottom: 0.5rem;
}

.jenis-card p {
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.jenis-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.jenis-card li {
  background-color: #eaf7eb;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  color: #49764e;
  font-size: 0.95rem;
}

.jenis-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}
</style>
