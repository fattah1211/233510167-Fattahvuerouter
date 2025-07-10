<template>
  <div class="harga-page">
    <section class="add-price-section card">
      <h2>Tambah / Edit Data</h2>
      <form @submit.prevent="submitHarga" class="price-form">
        <div class="form-group">
          <label for="provinsi">Provinsi:</label>
          <input type="text" id="provinsi" v-model="form.provinsi" required />
        </div>
        <div class="form-group">
          <label for="harga">Harga (Rp/kg):</label>
          <input type="number" id="harga" v-model.number="form.harga" required />
        </div>
        <div class="form-buttons">
          <button type="submit">{{ form.id ? 'Perbarui' : 'Tambah' }}</button>
          <button type="button" v-if="form.id" @click="cancelEdit" class="btn-cancel">Batal</button>
        </div>
        <p v-if="formMessage" class="message success-message">{{ formMessage }}</p>
      </form>
    </section>
    <hr class="separator" />
    <section class="harga-data-section card">
      <h2>Data Harga Sawit</h2>
      <p v-if="store.loading" class="loading-message">Memuat data...</p>
      <p v-if="store.error" class="error-message">{{ store.error }}</p>
      <div class="table-container" v-if="!store.loading && store.hargaData.length">
        <table>
          <thead>
            <tr>
              <th>Provinsi</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in store.sortedHargaData" :key="item.id">
              <td class="provinsi-col">{{ item.provinsi }}</td>
              <td class="harga-col">Rp {{ item.harga.toLocaleString('id-ID') }}</td>
              <td class="actions">
                <button @click="editHarga(item)" title="Edit" class="icon-button edit-btn">
                  <i class="fas fa-pen"></i>
                </button>
                <button @click="hapusHarga(item.id)" title="Hapus" class="icon-button delete-btn">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else-if="!store.loading" class="no-data-message">Tidak ada data tersedia.</p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useHargaStore } from '../stores/hargaStores';
const store = useHargaStore();
const form = ref({ id: null, provinsi: '', harga: null });
const formMessage = ref('');
const submitHarga = async () => {
  let success;
  if (form.value.id) {
    success = await store.updateHargaData({ ...form.value });
  } else {
    success = await store.addHargaData({ ...form.value });
  }
  if (success) {
    formMessage.value = form.value.id ? 'Data diperbarui.' : 'Data ditambahkan.';
    form.value = { id: null, provinsi: '', harga: null };
  } else {
    formMessage.value = 'Gagal menyimpan data.';
  }
};
const hapusHarga = async (id) => {
  if (!id) return alert('ID tidak valid');
  if (!confirm('Yakin ingin menghapus data ini?')) return;

  await store.deleteHargaData(id);
  formMessage.value = 'Data berhasil dihapus.';
};
const editHarga = (item) => {
  form.value = { ...item };
};
const cancelEdit = () => {
  form.value = { id: null, provinsi: '', harga: null };
  formMessage.value = '';
};
onMounted(() => {
  store.fetchHargaData();
});
</script>

<style scoped>
.harga-page {
  padding: 0; 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  text-align: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.card {
  background: linear-gradient(145deg, #ffffff 0%, #f8fffe 100%);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 850px;
  border: 1px solid rgba(70, 185, 16, 0.1);
  backdrop-filter: blur(10px);
}

.card h2 {
  color: #2d5a3d;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
  position: relative;
  padding-bottom: 1rem;
}

.card h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #46b910, #3b9e0d);
  border-radius: 2px;
}

.add-price-section {
  background: linear-gradient(145deg, #f0f8f0 0%, #e6fae8 100%);
  border: 1px solid rgba(70, 185, 16, 0.2);
}

.price-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.8rem;
  font-weight: 600;
  color: #2b7a3d;
  font-size: 1.1rem;
}

.form-group input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0f0e0;
  border-radius: 12px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
}

.form-group input:focus {
  outline: none;
  border-color: #46b910;
  box-shadow: 0 0 0 3px rgba(70, 185, 16, 0.1);
  transform: translateY(-1px);
}

.form-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

button[type="submit"] {
  background: linear-gradient(135deg, #46b910, #3b9e0d);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(70, 185, 16, 0.3);
  min-width: 120px;
}

button[type="submit"]:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(70, 185, 16, 0.4);
}

button[type="submit"]:disabled {
  background: linear-gradient(135deg, #a4e5aa, #c8eccb);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-cancel {
  background: linear-gradient(135deg, #6c757d, #5a6268);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
  min-width: 120px;
}

.btn-cancel:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(108, 117, 125, 0.4);
}

.message {
  margin-top: 1.5rem;
  font-size: 1rem;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid;
  font-weight: 500;
}

.error-message {
  color: #d32f2f;
  background: linear-gradient(145deg, #ffebee, #fce4ec);
  border-color: #ef9a9a;
}

.success-message {
  color: #2e7d32;
  background: linear-gradient(145deg, #e8f5e9, #f1f8e9);
  border-color: #a5d6a7;
}

.loading-message {
  color: #1976d2;
  font-style: italic;
  font-size: 1.1rem;
  padding: 1rem;
}

.no-data-message {
  color: #666;
  font-style: italic;
  font-size: 1.1rem;
  padding: 2rem;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
  border: 1px dashed #dee2e6;
}

.separator {
  border: 0;
  height: 2px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), #46b910, rgba(0, 0, 0, 0));
  margin: 3rem auto;
  max-width: 850px;
  border-radius: 1px;
}

.harga-data-section {
  margin-top: 2rem;
  background: linear-gradient(145deg, #ffffff 0%, #f8fffe 100%);
}

.table-container {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

th, td {
  padding: 1.2rem;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

th {
  text-align: center;
}

th {
  background: linear-gradient(135deg, #46b910, #3b9e0d);
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

th:first-child {
  border-top-left-radius: 12px;
}

th:last-child {
  border-top-right-radius: 12px;
}

tbody tr {
  transition: all 0.3s ease;
}

tbody tr:nth-child(even) {
  background: linear-gradient(145deg, #f9fdf9, #f5f9f5);
}

tbody tr:hover {
  background: linear-gradient(145deg, #e6fae8, #d7f5da);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(70, 185, 16, 0.1);
}

.provinsi-col {
  font-weight: 600;
  color: #2d5a3d;
}

.harga-col {
  font-weight: 600;
  color: #46b910;
  font-size: 1.1rem;
}

.actions {
  text-align: center;
  white-space: nowrap;
}

.icon-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  margin: 0 0.3rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.edit-btn {
  color: #1976d2;
  background: rgba(25, 118, 210, 0.1);
}

.edit-btn:hover {
  background: rgba(25, 118, 210, 0.2);
  transform: scale(1.1);
  color: #1565c0;
}

.delete-btn {
  color: #d32f2f;
  background: rgba(211, 47, 47, 0.1);
}

.delete-btn:hover {
  background: rgba(211, 47, 47, 0.2);
  transform: scale(1.1);
  color: #c62828;
}

@media (max-width: 768px) {
  .card {
    padding: 1.5rem;
    margin: 1rem;
  }
  
  .card h2 {
    font-size: 1.6rem;
  }
  
  .form-group input {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
  
  .form-buttons {
    flex-direction: column;
  }
  
  button[type="submit"], .btn-cancel {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
  
  th, td {
    padding: 0.8rem;
    font-size: 0.85rem;
  }
  
  .icon-button {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .harga-page {
    padding: 0.5rem;
  }
  
  .card {
    padding: 1rem;
    margin: 0.5rem;
  }
  
  .price-form {
    max-width: 100%;
  }
  
  th, td {
    padding: 0.6rem;
    font-size: 0.8rem;
  }
  
  .actions {
    display: flex;
    justify-content: center;
    gap: 0.25rem;
  }
  
  .icon-button {
    width: 28px;
    height: 28px;
    font-size: 0.9rem;
    margin: 0 0.1rem;
  }
}
</style>