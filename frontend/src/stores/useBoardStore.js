import { defineStore } from "pinia";

export const useBoardStore = defineStore('board', {
    state: () => ({
        board: {
            title: '',
            content: '',
            writer: ''
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
        resetPost() {
            this.board = {
                title: '',
                content: '',
                writer: ''
            }
        }
    }
})