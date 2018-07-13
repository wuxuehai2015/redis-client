const redis = require('redis')


/**
 * 连接数据库
 * @param address
 * @param port
 * @param pass
 */
function createConnection(address, port, pass = '') {
    let client = redis.createClient(port, address)

    client.on('error', function (error) {
        alert(error)
    })

    pass && client.auth(pass)

    return client

}


/**
 * 关闭数据库
 * @param client
 */
function closeConnection(client) {
    return client.end(true)
}


/**
 * 添加数据库
 * @param name
 * @param address
 * @param port
 * @param pass
 */
function addDb(name = '', address, port, pass = '') {
    name = name || address
    return localStorage.setItem(name, JSON.stringify({address: address, port: port, pass: pass}))
}

/**
 * 删除数据库
 * @param name
 */
function deleteDb(name) {
    return localStorage.removeItem(name);
}


/**
 * 获取数据库
 * @param name
 */
function getDb(name) {
    return JSON.parse(localStorage.getItem(name));
}


function getDbList() {
    let data = [];
    for (let i = 0; i <= localStorage.length; i++) {
        localStorage.key(i) && data.push(localStorage.key(i))
    }

    return data
}


function keys(field, client) {
    return new Promise((resolve, reject) => {
        client.keys(field, function (err, keys) {
            if (err) {
                reject(err)
            } else {
                resolve(keys)
            }
        })
    })
}


function type(key, client) {
    return new Promise((resolve, reject) => {
        client.type(key, function (err, type) {
            if (err) {
                reject(err)
            } else {
                resolve(type)
            }
        })
    })
}

function ttl(key, client) {
    return new Promise((resolve, reject) => {
        client.ttl(key, function (err, ttl) {
            if (err) {
                reject(err)
            } else {
                resolve(ttl)
            }
        })
    })
}


function get(key, client) {
    return new Promise((resolve, reject) => {
        client.get(key, function (err, content) {
            if (err) {
                reject(err)
            } else {
                resolve(content)
            }
        })
    })
}

export {createConnection, closeConnection, addDb, getDb, deleteDb, getDbList, keys, type, ttl, get}













