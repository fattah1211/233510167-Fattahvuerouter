import { defineStore } from 'pinia';
export const useHargaStore = defineStore('hargaSawit', {
  state: () => ({
    hargaData: [],
    loading: false,
    error: null,
    lastUpdated: null,
    addingData: false, 
    addSuccess: false,  
    addError: null    
  }),
  actions: {
    async fetchHargaData() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('http://localhost:3000/hargaSawit');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        this.hargaData = data;
        this.lastUpdated = new Date().toISOString();
      } catch (error) {
        console.error('Gagal mengambil data harga:', error);
        this.error = 'Gagal memuat data harga.';
      } finally {
        this.loading = false;
      }
    },

    async addHargaData(newEntry) {
      this.addingData = true;
      this.addSuccess = false;
      this.addError = null;

      try {
        if ('id' in newEntry) delete newEntry.id;

        const response = await fetch('http://localhost:3000/hargaSawit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEntry)
        });

        if (!response.ok) throw new Error('Gagal menambahkan data.');

        await this.fetchHargaData();
        this.addSuccess = true;
        return true;
      } catch (error) {
        console.error('Gagal menambahkan data harga:', error);
        this.addError = error.message || 'Terjadi kesalahan saat menambahkan data.';
        return false;
      } finally {
        this.addingData = false;
        setTimeout(() => {
          this.addSuccess = false;
          this.addError = null;
        }, 3000);
      }
    },

    async updateHargaData(entry) {
      try {
        const response = await fetch(`http://localhost:3000/hargaSawit/${entry.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: entry.id, 
            provinsi: entry.provinsi,
            harga: entry.harga
          })
        });

        if (!response.ok) throw new Error('Gagal memperbarui data.');

        await this.fetchHargaData();
        return true;
      } catch (error) {
        console.error('Gagal memperbarui data harga:', error);
        return false;
      }
    },

    async deleteHargaData(id) {
      try {
        const response = await fetch(`http://localhost:3000/hargaSawit/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Gagal menghapus data.');
        await this.fetchHargaData();
      } catch (error) {
        console.error('Gagal menghapus data harga:', error);
      }
    }
  },
  getters: {
    totalHargaEntries: (state) => state.hargaData.length,
    sortedHargaData: (state) => {
      return [...state.hargaData].sort((a, b) => a.provinsi.localeCompare(b.provinsi));
    }
  }
});
