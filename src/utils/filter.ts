import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('dateF', (date: number) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
})
