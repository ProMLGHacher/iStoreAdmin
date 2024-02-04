import axios from "axios"


export const revalidateProducts = () => {
    axios.get('https://3583-79-126-114-127.ngrok-free.app/api/revalidate?tag=products')
}

export const revalidateBlog = () => {
    axios.get('https://3583-79-126-114-127.ngrok-free.app/api/revalidate?tag=blog')
}

export const revalidateFilters = () => {
    axios.get('https://3583-79-126-114-127.ngrok-free.app/api/revalidate?tag=filters')
}