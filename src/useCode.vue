<template>
    <div class="use-code">
        <div id="write-code">
        </div>
        <div id="show">
        </div>
    </div>
</template>

<script>
import AutoCode from "./autoCode";
export default {
name: "useCode",
  data() {
    return {}
  },
  mounted() {
    this.autoCode()
  },
  methods: {
    autoCode() {
      const acc = new AutoCode()
      acc.createShowView('#show')
      acc.createWriteCode('#write-code')
      acc.speed = 1

      acc.addText('创建第一个')
      acc.createDiv('1')
      acc.createStyle('1', {
        width: '100px',
        height: '100px',
        border: '1px solid #000',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      })
      acc.addText('太窄了')
      acc.createStyle('show', {
        padding: '20px',
        boxSizing: 'border-box'
      })
      acc.addText('添加中间的红点')
      acc.createDiv('1-inner', '1')
      acc.createStyle('1-inner', {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'red'
      })
      acc.addText('创建第二个')
      acc.createDiv('2')
      acc.createStyle('2', {
        width: '100px',
        height: '100px',
        border: '1px solid #000',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      })
      acc.addText('横向排列')
      acc.createStyle('show', {
        display: 'flex'
      })
      acc.createStyle('show', {
        justifyContent: 'space-around'
      })
      acc.addText('添加两个点')
      acc.createDiv('2-inner1', '2')
      acc.createDiv('2-inner2', '2')
      acc.createStyle('2-inner1', {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'blue'
      })
      acc.createStyle('2-inner2', {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'blue',
        marginLeft: '10px'
      })
      acc.execute()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~prismjs/themes/prism-dark.css';
.use-code{
    display: flex;
    justify-content: space-between;
    #write-code, #show{
        width: 48%;
        border: 1px solid #000;
        height: 100%;
    }
}
</style>
