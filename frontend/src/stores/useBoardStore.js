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
        size: 5,
        title: '',
        content: '',
        writer: '',
        comments: [],
        comment: {
            writer: '',
            content: ''
        }
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
            console.error('Error fetching boards:', error)
          }
        },
        resetPost() {
            this.board = {
                title: '',
                content: '',
                writer: ''
            }
        },
        // 상세 조회
        async fetchBoardDetail(id) {
            try {
            const response = await fetch(`/api/board/read/${id}`)
            const data = await response.json()
            this.title = data.title
            this.content = data.content
            this.writer = data.writer
            this.comments = data.comments
            } catch (error) {
            console.error('Error fetching board detail:', error)
            }
        },
        // 댓글 등록
        async addComment(id) {
            try {
            const response = await fetch(`/api/comment/create/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.comment)
            })
            if (response.ok) {
                const newComment = await response.json()
                this.comments.push(newComment)
            }
            } catch (error) {
            console.error('Error adding comment:', error)
            }
        }
    }
})