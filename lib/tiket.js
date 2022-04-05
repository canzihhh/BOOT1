const fs = require('fs')

exports.isTiket = function(sender, isPremium, isOwner, tiketCount, _db){
    if (isOwner) return false
    if (isPremium) return false
    let found = false
    for (let i of _db) {
        if (i.id === sender) {
            let tikets = i.tiket
            if (tikets >= tiketCount) {
                found = true
                return true
            } else {
                found = true
                return false
            }
        }
    }
    if (found === false) {
        const obj = { id: sender, limit: 0 }
        _db.push(obj)
        fs.writeFileSync('./database/tiket.json', JSON.stringify(_db))
        return false
    }
}
exports.tikerAdd = function(sender, _db){
    let found = false
	Object.keys(_db).forEach((i) => {
		if (_db[i].id === sender) {
			found = i
		}
	})
		if (found !== false) {
			_db[found].tiket += 1
			fs.writeFileSync('./database/tiket.json', JSON.stringify(_db))
		}
}
exports.getTiket = function(sender, tiketCount, _db){
    let found = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === sender) {
            found = i
        }
    })
    if (found !== false) {
        return tiketCount - _db[found].tiket
    } else {
        return tiketCount
    }
}
exports.giveTiket = function(sender, uang, _db){
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === sender) {
            position = i
        }
    })
    if (position !== false) {
        _db[position].tiket -= uang
        fs.writeFileSync('./database/tiket.json', JSON.stringify(_db))
    } else {
        const hitungan = uang - uang - uang
        const hasilnya = ({
            id: sender,
            limit: hitungan
                })
        _db.push(hasilnya)
        fs.writeFileSync('./database/tiket.json', JSON.stringify(_db))
    }
}
exports.addBalance = function(sender, uang, _db){
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === sender) {
            position = i
        }
    })
    if (position !== false) {
        _db[position].balance += uang
        fs.writeFileSync('./database/balance.json', JSON.stringify(_db))
    } else {
        const bentuk = ({
            id: sender,
            balance: uang
                })
        _db.push(bentuk)
        fs.writeFileSync('./database/balance.json', JSON.stringify(_db))
    }
}
exports.minBalance = function(sender, uang, _db){
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === sender) {
            position = i
        }
    })
    if (position !== false) {
        _db[position].balance -= uang
        fs.writeFileSync('./database/balance.json', JSON.stringify(_db))
    }
}
exports.getBalance = function(sender, _db){
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === sender) {
            position = i
        }
    })
    if (position !== false) {
        return _db[position].balance
    } else {
        return 0
    }
}