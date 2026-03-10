<template>
  <el-menu
    default-active="/userManager"
    router
  >
    <template
      v-for="menuItem of menuList"
      :key="menuItem.path"
    >
      <template
        v-if="hasChildren(menuItem?.children)"
      >
        <el-sub-menu
          :key="menuItem.path"
          :index="menuItem.path"
        >
          <template 
            #title
          >
            {{ menuItem.title }}
          </template>
          <el-menu-item
            v-for="childMenuItem of menuItem.children"
            :key="childMenuItem.path"
            :index="childMenuItem.path"
          >
            {{ childMenuItem.title }}
          </el-menu-item>
        </el-sub-menu>
      </template>
      <el-menu-item 
        v-else
        :index="menuItem.path"
      >
        {{ menuItem.title }}
      </el-menu-item>
    </template>
  </el-menu>
</template>


<script setup lang="ts">
  import { routes } from '../../router'
  import { ref } from 'vue'

  interface MenuItem {
    path: string
    title: string
    name?: string
    icon?: string
    children?: MenuItem[]
  }

  type MenuList = MenuItem[]
  
  const menuList = ref<MenuList>([])
  
  function generateMenus(routes, parentPath=''): MenuItem[] {
    const list: MenuItem[] = []
    for (const route of routes) {
      let joinStr = '/'
      if (/^\//.test(route.path) || /\/$/.test(parentPath)) {
        // 如果当前路由Path前和parentPath结尾有/就不需要再添加
        joinStr = ''
      }
      if (route?.meta?.hidden) {
        continue
      }
      const path = `${parentPath}${joinStr}${route.path}`
      const title = route?.meta?.title ?? ''
      const name = route?.name ?? ''
      const menuItem: MenuItem = {
        path,
        title,
        name
      }
      list.push(menuItem)
      if (route.children) {
        menuItem.children = generateMenus(route.children, path)
      }
    }
    return list
  }

  function hasChildren(menuItems?: MenuList): menuItems is MenuList {
    return Array.isArray(menuItems) && menuItems.length > 1
  }

  function getHomeMenus() {
    // 截取home下的menus
    const menus = generateMenus(routes)
    const homeMenu = menus.find((menu) => menu.name === 'home')
    const homeMenus = homeMenu?.children ?? []
    console.log(homeMenus)
    return homeMenus
  }

  menuList.value = getHomeMenus()

</script>