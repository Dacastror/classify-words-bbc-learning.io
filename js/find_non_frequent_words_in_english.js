function getWordsByFrequecy(corpus, input_string) {
    const input_words_list = cleanInput(input_string)
    const pairs = pairsWordIndex(corpus, input_words_list)
    return sortWords(pairs)
}

function cleanInput(string) {
    let new_str = " " + string + " "
    new_str = new_str.toLowerCase()
    new_str = new_str.replace(/-\n +/g, "")
    new_str = new_str.replace(/-\n/g, "")
    new_str = new_str.replace(/(\n-|\n)/g, " ")
    new_str = new_str.replace(/can('|‘|’)t[^\p{L}]/gu, "can not ")
    new_str = new_str.replace(/i('|‘|’)m[^\p{L}]/gu, " i am ")
    new_str = new_str.replace(/n('|‘|’)t[^\p{L}]/gu, " not ")
    new_str = new_str.replace(/('|‘|’)t[^\p{L}]/gu, " not ")
    new_str = new_str.replace(/('|‘|’)(ll|re|ve|d|s)[^\p{L}]/gu, " ")
    new_str = new_str.replace(/[^\p{L} -]/gu, " ") // remover caracteres que no son letras
    new_str = new_str.replace(/( -|- )/g, " ")
    new_str = new_str.replace(/  +/g, " ")
    new_str = new_str.trim()
    let output_array = new_str.split(" ")
    output_array = [...new Set(output_array)] // remover palabras repetidas
    return output_array
}

function pairsWordIndex(corpus, input_words_list) {
    let pairs = []; let word = ""; let indice;
    for (let i = 0; i < input_words_list.length; i++) {
        word = input_words_list[i]
        indice = corpus.indexOf(word)
        if (indice > -1) {
            pairs.push([word, corpus.indexOf(word)])
        }
    }
    return pairs
}

function sortWords(pairs) {
    pairs.sort(function (first, second) {
        return second[1] - first[1];
    })
    let sorted_words = []
    for (let i = 0; i < pairs.length; i++) {
        sorted_words.push(pairs[i][0])
    }
    return sorted_words
}