<template>
    <div>
        <div>
            {{child.text}}
            <!-- <div v-if="child.children">

                <CommentTree :child="child"/>
            </div> -->
        </div>
    </div>
</template>

<script>
// import CommentTree from "@/components/Chat/CommentTree";

    export default {
        // name: "CommentTree",
        props: ['child'],
        mounted() {
            // console.log(this.child)
        }
        // components: {CommentTree}
    }
</script>