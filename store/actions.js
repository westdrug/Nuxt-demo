import request from '~/service'
import {
    OP_HOST
} from '~/service/apiHost'

export const topMovie = async(store, parmas) => {
    return await request.get('/api/v2/movie/top250', parmas)
}

export const movieSubject = async(store, parmas) => {
    return await request.get(`/api/v2/movie/subject/${parmas.id}`)
}

export const moviePhoto = async(store, parmas) => {
    return await request.get(`/api/v2/movie/celebrity/${parmas.id}`)
}

