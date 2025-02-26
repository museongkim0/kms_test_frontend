<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBoardStore }  from '../stores/useBoardStore'

const router = useRouter()
const boardStore = useBoardStore()

onMounted(() => {
    boardStore.fetchBoards()
})

const goToCreate = () => {
  router.push('/register')
}

const goToDetail = (id) => {
  router.push(`/detail/${id}`)
}

const changePage = (page) => {
  if (page >= 0 && page <= boardStore.totalPages-1) {
    boardStore.fetchBoards(page)
  }
}
</script>

<template>
    <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">게시글 목록</h1>
            <button
            @click="goToCreate"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
            게시글 작성하기
            </button>
        </div>
    
        <!-- 게시글 테이블 -->
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">댓글 수</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr
                v-for="board in boardStore.boardList"
                :key="board.idx"
                @click="goToDetail(board.idx)"
                class="hover:bg-gray-50 cursor-pointer"
                >
                <td class="px-6 py-4 whitespace-nowrap">{{ board.idx }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ board.title }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ board.writer }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ board.commentsCount || 0 }}</td>
                </tr>
            </tbody>
            </table>
        </div>
    
        <!-- 페이지네이션 -->
        <div class="mt-6 flex justify-center items-center space-x-2">
            <button
            @click="changePage(boardStore.currentPage - 1)"
            :disabled="boardStore.currentPage === 0"
            class="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
            이전
            </button>
            <span v-for="page in boardStore.totalPages" :key="page">
            <button
                @click="changePage(page-1)"
                :class="[
                'px-3 py-1 rounded-md',
                boardStore.currentPage === page
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                ]"
            >
                {{ page }}
            </button>
            </span>
            <button
            @click="changePage(boardStore.currentPage + 1)"
            :disabled="boardStore.currentPage === boardStore.totalPages-1"
            class="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
            다음
            </button>
        </div>
    </div>
</template>

<style scoped></style>