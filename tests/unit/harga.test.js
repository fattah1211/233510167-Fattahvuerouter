import { mount } from '@vue/test-utils'
import { test, expect, beforeEach, vi } from 'vitest'
import Harga from '@/views/harga.vue'
import { createTestingPinia } from '@pinia/testing'
import { useHargaStore } from '@/stores/hargaStores'

let wrapper
let store
beforeEach(() => {
  wrapper = mount(Harga, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          stubActions: false,
        }),
      ],
    },
  })
  store = useHargaStore()
})
test('tombol Tambah memanggil addHargaData dan reset form', async () => {
  store.addHargaData = vi.fn().mockResolvedValue(true)
  await wrapper.find('#provinsi').setValue('PTPN V')
  await wrapper.find('#harga').setValue(2800)
  await wrapper.find('form').trigger('submit.prevent')
  expect(store.addHargaData).toHaveBeenCalled()
  expect(store.addHargaData).toHaveBeenCalledWith({
    id: null,
    provinsi: 'PTPN V',
    harga: 2800,
  })
  expect(wrapper.text()).toContain('Data ditambahkan.')
  expect(wrapper.find('#provinsi').element.value).toBe('')
  expect(wrapper.find('#harga').element.value).toBe('')
})
