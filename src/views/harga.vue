<template>
  <div class="harga">
    <h1>Harga Sawit</h1>
    <table>
      <thead>
        <tr>
          <th>Provinsi</th>
          <th>Harga (Rp/kg)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(harga, index) in hargaData" :key="index">
          <td>{{ harga.provinsi }}</td>
          <td>{{ harga.harga }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const hargaData = [
  { provinsi: 'Riau', harga: '3.100' },
  { provinsi: 'Sumatera Utara', harga: '2.900' },
  { provinsi: 'Kalimantan Barat', harga: '3.200' }
]
</script>

<style scoped>
.harga {
  padding: 2rem;
  color: #72cb7b;

}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
th, td {
  padding: 0.75rem;
  border: 1px solid #ccc;
  text-align: left;
}
th {
  background-color: #46b910;
  color: #414e42;
}
</style>
