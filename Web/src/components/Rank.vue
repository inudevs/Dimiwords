<template>
    <div>
        <h1>랭킹</h1>
        <p class="new-info">
            게임이 종료되고 맞춘 단어 하나당 <strong>1점</strong>, 새로운 단어를 등록하면 <strong>2점</strong>, 단어장을 등록하면 <strong>5점</strong>을 받아요
        </p>
        <div class="ranking">
            <table>
                <thead>
                    <tr>
                        <td>RANK</td>
                        <td>NAME</td>
                        <td>INTRO</td>
                        <td>POINTS</td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="user" v-for="(user, rank) in users">
                        <td class="rank">{{ rank + 1 }}</td>
                        <td class="name"><i class="fas fa-crown"></i> {{ user.name }}</td>
                        <td>{{ user.intro }}</td>
                        <td>{{ user.points }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    beforeCreate: function () {
        if (!this.$session.exists()) {
        this.$router.push('/user/login')
        }
    },
    created () {
        this.updateUsers();
    },
    data () {
        return {
            users: [],
            page: 1,
            page_max: undefined
        }
    },
    methods: {
        updateUsers: function () {
            this.$http.get('/api/list/rank', {
                params: {page: this.page}
            })
            .then((response) => {
                this.users = response.data.result.docs
                console.log(this.users)
                if (this.page_max == null) this.page_max = response.data.result.pages
            })
        }
    }
}
</script>
