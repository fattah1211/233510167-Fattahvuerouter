<template>
  <div class="profil-container">
    <div class="profil-card">
      <div class="profil-header">
        <div class="avatar-section">
          <img :src="previewImage || userProfile.image" alt="Foto Profil" class="profil-avatar" />
          <div class="upload-wrapper">
            <input type="file" accept="image/*" @change="onImageChange" class="upload-input" id="file-upload" />
            <label for="file-upload" class="upload-label">
              <i class="upload-icon">📷</i>
              Ganti Foto
            </label>
          </div>
        </div>
        <div class="header-info">
          <h3 class="profil-name">{{ userProfile.name }}</h3>
          <p class="profil-email">{{ userProfile.email }}</p>
          <span class="profil-status">Petani Sawit</span>
        </div>
      </div>
      <div class="info-grid">
        <div class="info-section">
          <h4 class="section-title">
            <i class="section-icon">👤</i>
            Informasi Pribadi
          </h4>
          <div class="info-content">
            <div class="detail-item">
              <div class="detail-label">
                <i class="detail-icon">📍</i>
                Wilayah
              </div>
              <div class="detail-value">{{ userProfile.region }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">
                <i class="detail-icon">🎂</i>
                Tanggal Lahir
              </div>
              <div class="detail-value">{{ userProfile.birthDate }}</div>
            </div>

          </div>
        </div>
        <div class="info-section">
          <h4 class="section-title">
            <i class="section-icon">📝</i>
            Tentang Saya
          </h4>
          <div class="info-content">
            <p class="about-me">{{ userProfile.aboutMe }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const previewImage = ref(null);

const onImageChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.value = reader.result;
      localStorage.setItem("userProfileImage", reader.result);
    };
    reader.readAsDataURL(file);
  }
};

onMounted(() => {
  const savedImage = localStorage.getItem("userProfileImage");
  if (savedImage) {
    previewImage.value = savedImage;
  }
});

const userProfile = ref({
  name: 'Fattah Fitriansyah',
  email: 'fattahfitriasnyah56@gmail.com',
  region: 'Pekanbaru, Riau',
  birthDate: '12 November 2004',
  aboutMe: 'Seorang petani sawit yang bersemangat dari Pekanbaru, Riau. Tertarik dengan teknologi pertanian dan ingin memajukan sektor kelapa sawit di daerah.',
});
</script>

<style scoped>
.profil-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.profil-card {
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

.profil-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #7fd687, #165c26);
}

.profil-header {
  background: linear-gradient(135deg, #eaf7eb 0%, #d7f5da 100%);
  padding: 2rem;
  text-align: center;
  position: relative;
}

.avatar-section {
  margin-bottom: 1.5rem;
}

.profil-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.profil-avatar:hover {
  transform: scale(1.05);
}

.upload-wrapper {
  margin-top: 1rem;
}

.upload-input {
  display: none;
}

.upload-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #7fd687;
  color: #ffffff;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(127, 214, 135, 0.3);
}

.upload-label:hover {
  background: #6bc474;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(127, 214, 135, 0.4);
}

.upload-icon {
  font-size: 1rem;
}

.header-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.profil-name {
  font-size: 2rem;
  font-weight: 700;
  color: #165c26;
  margin: 0;
  letter-spacing: -0.5px;
}

.profil-email {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

.profil-status {
  display: inline-block;
  background: #7fd687;
  color: #ffffff;
  padding: 0.3rem 1rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 0.5rem;
}

.info-grid {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-section {
  background: #f8fffe;
  border-radius: 15px;
  padding: 1.5rem;
  border-left: 4px solid #7fd687;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.3rem;
  color: #165c26;
  margin: 0 0 1.5rem 0;
  font-weight: 600;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e8f5e8;
}

.section-icon {
  font-size: 1.2rem;
  background: #7fd687;
  padding: 0.5rem;
  border-radius: 8px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.detail-item:hover {
  background: #f0f9f1;
  transform: translateX(5px);
}

.detail-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #165c26;
  font-size: 0.95rem;
}

.detail-icon {
  font-size: 1rem;
  opacity: 0.8;
}

.detail-value {
  font-weight: 500;
  color: #555;
  text-align: right;
  font-size: 0.95rem;
}

.about-me {
  line-height: 1.7;
  color: #555;
  text-align: justify;
  font-size: 1rem;
  margin: 0;
  padding: 1rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .profil-container {
    padding: 0.5rem;
  }
  
  .profil-header {
    padding: 1.5rem;
  }
  
  .profil-avatar {
    width: 100px;
    height: 100px;
  }
  
  .profil-name {
    font-size: 1.6rem;
  }
  
  .info-grid {
    padding: 1.5rem;
    gap: 1.5rem;
  }
  
  .info-section {
    padding: 1rem;
  }
  
  .detail-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .detail-value {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .profil-name {
    font-size: 1.4rem;
  }
  
  .profil-email {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.1rem;
  }
  
  .detail-label, .detail-value {
    font-size: 0.9rem;
  }
}
</style>