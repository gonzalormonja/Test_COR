const fs = require('fs')

const KEYS = ['chair', 'height', 'racket', 'touch', 'tunic'];

let first_key = null;

const test_key = (keys_used) => {
    const last_key = keys_used[keys_used.length - 1];
    let keys_not_used = KEYS.filter(key => !keys_used.includes(key));

    if (keys_not_used.length <= 0) {
        return { ok: last_key.charAt(last_key.length - 1) == first_key[0], keys: keys_used };
    } else {
        const possible_next_keys = keys_not_used.filter(key => last_key.charAt(last_key.length - 1) == key.charAt(0));

        if (possible_next_keys.length <= 0) return { ok: false, keys: [] };

        for (const possible_next_key of possible_next_keys) {
            return test_key([...keys_used, possible_next_key]);
        }
    }
}


const test_COR = () => {
    return new Promise((resolve, reject) => {
        KEYS.map(key => {
            first_key = key;
            const resp = test_key([key]);
            if (resp.ok) {
                resolve(resp.keys)
            }
        })
        reject()
    })
}

test_COR()
    .then((keys) => {
        const content_file = keys.reduce((acc, el) => `${acc}${el}\n`, '');
        fs.writeFile('output.txt', content_file, (err) => {
            if (err) console.error(err);

            console.log('Archivo escrito correctamente');
        })

    })
    .catch(() => console.log('No es posible formar un circulo con las palabras ingresadas'));
