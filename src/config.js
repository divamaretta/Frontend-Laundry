const baseUrl = "http://localhost:8000/api"
const formatNumber = (num) => {
    return parseFloat(num).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

const authorization = {
    headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
    }
}

export{
    baseUrl, formatNumber, authorization
}