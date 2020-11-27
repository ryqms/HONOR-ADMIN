<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label="ID"
      >
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="登录账户"
      >
        <template v-slot="{row}">
          <span>{{ row.acountname }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!--<pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />-->
</template>
<script lang="ts">
import { getPlayers } from '@/api/players'
import { Player } from '@/api/types'
import { Component, Vue } from 'vue-property-decorator'

// @Component({
//   name: "PlayerList",
//   components: {
//     Pagination,
//   },
// })
export default class extends Vue {
  private list: Player[] = [];

  private listLoading = true;

  private total = 0;
  private listQuery = {
    page: 1,
    limit: 20,
    acountname: undefined
  };

  private handleFilter() {
    this.listQuery.page = 1
    this.getList()
  }

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getPlayers(this.listQuery)
    this.list = data.item
    this.total = data.total
    this.listLoading = false
  }
}
</script>
