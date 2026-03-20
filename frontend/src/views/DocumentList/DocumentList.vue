<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { documentApi, type Document } from '../../services/api';

const router = useRouter();
const documents = ref<Document[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function fetchDocuments() {
  try {
    loading.value = true;
    error.value = null;
    documents.value = await documentApi.getAll();
  } catch (err) {
    error.value = 'Failed to load documents';
    console.error(err);
  } finally {
    loading.value = false;
  }
}

function createNew() {
  router.push('/documents/new');
}

function editDocument(id: number) {
  router.push(`/documents/${id}`);
}

onMounted(() => {
  fetchDocuments();
});

</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="md:flex md:items-center md:justify-between mb-8">
        <div class="flex-1 min-w-0">
          <h1 class="text-3xl font-bold text-gray-900">Documents</h1>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
          <button
            @click="createNew"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create New Document
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <p class="text-gray-500">Loading documents...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
        <p class="text-red-800">{{ error }}</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="documents.length === 0" class="bg-white shadow rounded-lg p-8 text-center">
        <p class="text-gray-500 mb-4">No documents yet</p>
        <button
          @click="createNew"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Create Your First Document
        </button>
      </div>

      <!-- Document List -->
      <div v-else class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200">
          <li
            v-for="doc in documents"
            :key="doc.id"
            @click="editDocument(doc.id)"
            class="hover:bg-gray-50 cursor-pointer transition"
          >
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-medium text-gray-900 truncate">
                    {{ doc.title }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500 line-clamp-2">
                    {{ doc.content }}
                  </p>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <span>
                  Updated {{ new Date(doc.updatedAt).toLocaleString() }}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
