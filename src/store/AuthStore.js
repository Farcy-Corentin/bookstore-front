import axios from 'axios'

import {computed, reactive} from 'vue'

/**
 * @typedef {Object} User
 * @param {number} id
 * @param {string} name
 * @param {string} email
 * @param {string} email_verified_at
 * @param {string} created_at
 * @param {string} updated_at
 */

const ENDPOINTS = {
    user: 'api/user',
    login: 'api/login',
    logout: 'api/logout',
    register: 'api/register'
}

const LOCAL_STORAGE_KEY = 'bearer'

class AuthStore {
    constructor() {
        this.state = reactive({
            user: null
        })
        this.user = computed(() => this.state.user,{
            onTrack(e){
                console.log('onTrack', this.state, e)
            },
            onTrigger(e){
                console.log('onTrigger', this.state, e)
            }
        })

        this.isLogged = computed(() => {
            console.log('isLogged',this.state)
            return this.state.user !== null
        })
    }

    async login(credentials) {
        /** @var {{bearer: String}} data */
        const { data } = await axios.post(ENDPOINTS.login, credentials)

        localStorage.setItem(LOCAL_STORAGE_KEY, data.bearer)
    }

    async logout() {
        const bearer = this.bearer()
        if (bearer === '') {
            return undefined
        }

        await axios.post(ENDPOINTS.logout, {}, this.headers(bearer))

        this.state.user = null
        localStorage.removeItem(LOCAL_STORAGE_KEY)
    }

    async register(credentials) {
        await axios.post(ENDPOINTS.register, credentials)
    }

    useAuth() {
        return {
            user: this.user,
            isLogged: this.isLogged
        }
    }

    async fetchUser() {
        const bearer = this.bearer()
        if (bearer === '') {
            return undefined
        }

        /** @var {User} data */
        const { data } = await axios.get(ENDPOINTS.user, this.headers(bearer))

        this.state.user = data
    }

    headers(bearer) {
        return {
            headers: {
                Authorization: bearer
            }
        }
    }

    bearer () {
        const currentBearer = localStorage.getItem(LOCAL_STORAGE_KEY)
        return currentBearer === null ? '' : `Bearer ${currentBearer}`
    }
}

const instanceAuth = new AuthStore()
export default instanceAuth
