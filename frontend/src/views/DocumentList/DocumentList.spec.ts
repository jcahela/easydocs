import { describe, it, expect, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import DocumentList from './DocumentList.vue'
import { documentApi } from '../../services/api'

vi.mock('../../services/api', () => ({
  documentApi: {
    getAll: vi.fn().mockResolvedValue([]),
  }
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: DocumentList }],
})

describe('DocumentList', () => {
  it('shows empty state when no documents exist', async () => {
    const wrapper = mount(DocumentList, { global: { plugins: [router] } })
    await router.isReady()
    await flushPromises()
    expect(wrapper.text()).toContain('No documents yet')
    expect(wrapper.text()).toContain('Create Your First Document')
  })

  it('shows error message when API fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(documentApi.getAll).mockRejectedValueOnce(new Error('Network error'))
    const wrapper = mount(DocumentList, { global: { plugins: [router] } })
    await router.isReady()
    await flushPromises()
    expect(wrapper.text()).toContain('Failed to load documents')
  })

  it('renders the correct document list when documents exist', async () => {
    vi.mocked(documentApi.getAll).mockResolvedValueOnce([
      { id: 1, title: 'Doc 1', content: 'Content 1', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, title: 'Doc 2', content: 'Content 2', createdAt: new Date(), updatedAt: new Date() },
    ])
    const wrapper = mount(DocumentList, { global: { plugins: [router] } })
    await router.isReady()
    await flushPromises()
    expect(wrapper.text()).toContain('Doc 1')
    expect(wrapper.text()).toContain('Content 1')
    expect(wrapper.text()).toContain('Doc 2')
    expect(wrapper.text()).toContain('Content 2')
  })
})
