import axios from "axios"


export const revalidateProducts = () => {
    axios.get('http://localhost:3000/api/revalidate?tag=products')
}

export const revalidateBlog = () => {
    axios.get('http://localhost:3000/api/revalidate?tag=blog')
}

export const revalidateFilters = () => {
    axios.get('http://localhost:3000/api/revalidate?tag=filters')
}