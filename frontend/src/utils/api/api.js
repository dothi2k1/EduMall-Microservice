const auth = {
          login: '/api/sv1/auth/login',
          register:'/api/sv1/auth/save'
}
const category = {
          getAll: "api/sv2/category/get-all",
          addCate:"api/sv2/private/category/add-cate"
}

const media = {
          uploadPic:"http://localhost:2000/upload/images"
}

const homepage = {
          course: "/api/sv2/course/get-all",         
          
}
const course = {
          getById: "/api/sv2/course/get-course?id=",
}

export const Api={auth,media,homepage,category,course}