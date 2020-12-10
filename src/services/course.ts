import request from '@/utils/request'

export const getQueryCourses = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

export const changeState = (courseId: string | number, status: string) => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params: {
      courseId,
      status
    }
  })
}

export const saveOrUpdateCourse = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

export const uploadImage = (data: FormData, onUploadProgress?: (progressEvent: any) => void) => {
  // 使用 formData 类型上传，自动设置 multipart/form-data
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    onUploadProgress
  })
}

export const getCourseById = (courseId: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: { courseId }
  })
}
