<template>
  <el-card class="index-container">
    <el-tabs v-model="state.tabName" type="card" @tab-click="tabClick">
      <el-tab-pane label="数据库" name="database">
        <div>
          <el-button type="primary" @click="handleAddDatabase()">添加数据资产</el-button>
          <el-button type="primary" @click="">数据批量导入</el-button>
        </div>
        <el-table ref="multipleTable" :data="state.tableData" tooltip-effect="dark" empty-text="暂无数据" v-loading="state.loading"
          style="width: 100%" @selection-change="handleSelectionChange">
          <!-- <el-table-column type="selection" width="55">
          </el-table-column> -->
          <el-table-column prop="database" label="数据库">
          </el-table-column>
          <el-table-column prop="databaseType" label="数据库类型">
          </el-table-column>
          <el-table-column prop="sys" label="所在系统" width="120">
          </el-table-column>
          <el-table-column prop="stat" label="状态">
          </el-table-column>
          <el-table-column prop="createTime" label="识别权限">
          </el-table-column>
          <el-table-column prop="createTime" label="脱敏权限">
          </el-table-column>
          <el-table-column prop="createTime" label="审计权限">
          </el-table-column>
          <el-table-column prop="createTime" label="识别采样展示数">
          </el-table-column>
          <el-table-column prop="createTime" label="审计日志存档">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template #default="scope">
              <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.configId)">修改</a>
              <el-popconfirm title="确定删除吗？" confirmButtonText='确定' cancelButtonText='取消'
                @confirm="handleDeleteOne(scope.row.configId)">
                <template #reference>
                  <a style="cursor: pointer">删除</a>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!--总数超过一页，再展示分页器-->
        <el-pagination v-if="state.total > state.pageSize" background layout="prev, pager, next" :total="state.total" :page-size="state.pageSize"
          :current-page="state.currentPage" @current-change="changePage" />
      </el-tab-pane>
      <el-tab-pane label="文件" name="file">
        <el-empty description=" "></el-empty>
      </el-tab-pane>
    </el-tabs>
    
  </el-card>
  <DialogAddDatabase ref='addDatabase' :reload="getIndexConfig" />
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import DialogAddDatabase from '@/components/DialogAddDatabase.vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/utils/axios'
const addDatabase = ref(null)
const router = useRouter()
const route = useRoute()
const multipleTable = ref(null)
const addGood = ref(null)
const state = reactive({
  loading: false,
  tabName: 'database',
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
  type: 'add', // 操作类型
})
// 监听路由变化
router.beforeEach((to) => {
  if (['hot', 'new', 'recommend'].includes(to.name)) {
    state.configType = configTypeMap[to.name]
    state.currentPage = 1
  }
})
// 初始化
onMounted(() => {
  // getListData()
})
const tabClick = () => {

}
const handleAddDatabase = () => {
  addDatabase.value.open()
}
// 获取数据资产列表
const getListData = () => {
  state.loading = true
  axios.get('/table/getTablesInfo', {
    params: {
      // pageNumber: state.currentPage,
      // pageSize: state.pageSize,
      databaseName: 'securex'
    }
  }).then(res => {
    // state.tableData = res.list
    // state.total = res.totalCount
    // state.currentPage = res.currPage
    console.log(res)
    state.loading = false
  })
}
// 修改商品
const handleEdit = (id) => {
  state.type = 'edit'
  addGood.value.open(id)
}
// 选择项
const handleSelectionChange = (val) => {
  state.multipleSelection = val
}
// 单个删除
const handleDeleteOne = (id) => {
  axios.delete('/indexConfigs', {
    ids: [id]
  }).then(() => {
    ElMessage.success('删除成功')
    getIndexConfig()
  })
}
const changePage = (val) => {
  state.currentPage = val
  getIndexConfig()
}
</script>

<style scoped>
.index-container {
  min-height: 100%;
}

.el-card.is-always-shadow {
  min-height: 100% !important;
}
</style>