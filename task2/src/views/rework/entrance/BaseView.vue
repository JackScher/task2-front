<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "BaseView",
    data() {
        return {
            user_token: null
        }
    },
    mounted() {
        this.check_login();
        if (this.user_token) {
            this.$router.push({name: 'self-profile-view'})
        }
    },
    methods: {
        check_login() {
            this.user_token = localStorage.getItem('user-token');
        }
    }
}
</script>

<style scoped>

</style>