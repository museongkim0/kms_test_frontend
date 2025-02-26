<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBoardStore }  from '../stores/useBoardStore'

const router = useRouter()
const boardStore = useBoardStore()
const showModal = ref(false)
const modalMessage = ref('')
const isSuccess = ref(false)

const submitPost = async () => {
    const status = await boardStore.createBoard()

    if (status === 200) {
        modalMessage.value = '게시글이 성공적으로 등록되었습니다.'
        isSuccess.value = true
    } else {
        modalMessage.value = '게시글 등록에 실패했습니다. 정보를 다시 입력해주세요.'
        isSuccess.value = false
    }
    showModal.value = true
}

const cancel = () => {
boardStore.resetPost()
router.push('/')
}

const handleModalConfirm = () => {
    showModal.value = false
    if (isSuccess.value) {
        boardStore.resetPost()
        router.push('/')
    }
}
</script>

<template>
    <div class="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-6">게시글 작성</h1>
        
        <form @submit.prevent="submitPost" class="space-y-4">
            <div>
            <label class="block text-sm font-medium text-gray-700">제목</label>
            <input
                v-model="boardStore.board.title"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
            />
            </div>
    
            <div>
            <label class="block text-sm font-medium text-gray-700">내용</label>
            <textarea
                v-model="boardStore.board.content"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="4"
                required
            ></textarea>
            </div>
    
            <div>
            <label class="block text-sm font-medium text-gray-700">작성자</label>
            <input
                v-model="boardStore.board.writer"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
            />
            </div>
    
            <div class="flex justify-end space-x-2">
            <button
                type="button"
                @click="cancel"
                class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
                취소하기
            </button>
            <button
                type="submit"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
                등록하기
            </button>
            </div>
        </form>
    
        <!-- 성공/실패 모달 -->
        <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-lg">
            <p class="mb-4">{{ modalMessage }}</p>
            <button
                @click="handleModalConfirm"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
                확인
            </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>