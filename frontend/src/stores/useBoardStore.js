import { defineStore } from "pinia";

export const useBoardStore = defineStore('board', {
    state: () => ({
        board: {
            title: '',
            content: '',
            writer: ''
        },
        boardList: [],
        currentPage: 0,
        totalPages: 0,
        size: 5
    }),
    actions: {
        async createBoard() {
            try {
                const response = await fetch('api/board/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.board)
                })
                return response.status
            } catch (error) {
                console.error('Error:', error)
                return 500
            }
        },
        async fetchBoards(page = 0) {
          try {
            const response = await fetch(`/api/board/list?page=${page}&size=${this.size}`)
            const data = await response.json()
            this.boardList = data.boardList
            this.currentPage = page
            this.totalPages = data.totalPages
          } catch (error) {
            console.error('Error fetching posts:', error)
          }
        },
        resetPost() {
            this.board = {
                title: '',
                content: '',
                writer: ''
            }
        }
    }
})