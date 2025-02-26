  
<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBoardStore }  from '../stores/useBoardStore'
  
const router = useRouter()
const route = useRoute()
const boardStore = useBoardStore()

// 새로운 댓글용 반응형 객체
const newComment = ref({
content: '',
writer: ''
})

// 컴포넌트 마운트 시 게시글 상세 데이터 가져오기
onMounted(() => {
const boardIdx = route.params.id
boardStore.fetchBoardDetail(boardIdx)
})

// 댓글 등록
const submitComment = async () => {
if (newComment.value.content && newComment.value.writer) {
    await boardStore.addComment(newComment.value)
    newComment.value = { content: '', author: '' } // 입력 필드 초기화
}
}

// 목록으로 이동
const goToList = () => {
router.push('/')
}
</script>

<template>
    <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <!-- 게시글 상세 -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold mb-4">제목: {{ boardStore.title }}</h1>
            <div class="prose max-w-none border-t pt-4">
                내용: {{ boardStore.content }}
            </div>
            <p class="text-gray-600 mb-2">작성자: {{ boardStore.writer }}</p>
            <div class="prose max-w-none border-t pt-4">
                <div v-for="comment in boardStore.comments" :key="comment.idx" class="mb-4">
                    <p>댓글 내용:{{ comment.content }}</p>
                    <p class="text-sm text-gray-500">댓글 작성자: {{ comment.writer }}</p>
                </div>
                <p v-if="boardStore.comments.length === 0" class="text-gray-500">댓글이 없습니다.</p>
            </div>
        </div>
    
<!--             
        <div class="border-t pt-6">
            <h3 class="text-lg font-medium mb-4">댓글 작성</h3>
            <form @submit.prevent="submitComment" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">댓글 내용</label>
                <textarea
                v-model="newComment.content"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="3"
                required
                ></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">작성자</label>
                <input
                v-model="newComment.author"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                />
            </div>
            <div class="flex justify-end">
                <button
                type="submit"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                등록
                </button>
            </div>
            </form>
        </div> -->
    
        <!-- 목록으로 돌아가기 -->
        <div class="mt-6 flex justify-end">
            <button
            @click="goToList"
            class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
            게시판 목록으로
            </button>
        </div>
    </div>
</template>

<style scoped></style>