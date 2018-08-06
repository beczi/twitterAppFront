export const loading = {
    data() {
        return {
            loading: false
        }
    },
    methods: {
        toggleLoading(){
            this.loading = !this.loading;
        }
    }
}

export const modal = {
    data() {
        return {
            modal: false
        }
    },
    methods: {
        toggleModal(){
            this.modal = !this.modal;
        }
    }
}
