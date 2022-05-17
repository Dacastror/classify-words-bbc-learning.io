const ID_SEARCH_BUTTON = "search_btn"
const ID_HOME_BUTTON = "home-bt"
const ID_INPUT_START_TIME = "time_ini"
const ID_INPUT_END_TIME = "time_fin"
const ID_DIV_DICTATIONS = "dictations"
const ID_INTERFACE_SEARCH = "interface_buscar_palabras"
const ID_HARD_WORD_LIST = "list_hard_words"
const ID_MEDIUM_WORD_LIST = "list_medium_words"
const ID_EASY_WORD_LIST = "list_easy_words"
const ID_RESULTS = "results"
const CLASS_DICTATE = "dictate"
const VIDEO_SELECTED = "video_selected"

addEventLiteners()

function addEventLiteners(){
    let search_btn = document.getElementById(ID_SEARCH_BUTTON)
    search_btn.addEventListener("click", buildAnswer);
    let home_btn = document.getElementById(ID_HOME_BUTTON)
    home_btn.addEventListener("click", showHome);
    let lecciones = document.getElementsByClassName(CLASS_DICTATE)
    for(let i=0; i<lecciones.length; i++){
        let img = document.getElementById(String(i+1))
        img.addEventListener("click", showSearchTool);
    }
}

function timeToSeconds(string){
    let l = string.split(":")
    return parseFloat(l[0])*60 + parseFloat(l[1])
}

function getStartAndStopTime(){
    let time_ini = document.getElementById(ID_INPUT_START_TIME).value
    let time_fin = document.getElementById(ID_INPUT_END_TIME).value
    time_ini = timeToSeconds(time_ini)
    time_fin = timeToSeconds(time_fin)
    return {time_ini, time_fin};
}

function searchIndexStartEnd(times_words,time_ini, time_fin){
    let start_index = 0
    for (let i=0; i<times_words.length; i++){
        if (times_words[i][1] > time_ini){
            start_index = i
            break
        } 
    }
    let end_index = 0
    for (let i=0; i<times_words.length; i++){
        if (times_words[i][0] > time_fin){
            end_index = i
            break
        } 
    }
    return {start_index, end_index};
}

function selectText(times_words,start_index,end_index){
    let selected_text = ""
    for (let i = start_index; i<end_index; i++){
        selected_text = selected_text + " " + times_words[i][2] 
    }
    return selected_text
}

function selectTextForCurrentInput(){
    let num_video = sessionStorage.getItem(VIDEO_SELECTED)
    let times_words = subs[num_video]
    let {time_ini, time_fin} = getStartAndStopTime()
    let {start_index, end_index} = searchIndexStartEnd(times_words,time_ini,time_fin)
    return selectText(times_words,start_index,end_index)
}

function buildItem(num, word){
    let w = '<h6>' + word + '</h6>'
    let td_num = '<td class="td_num"><h6>' + num + '</h6></td>\n'
    let td_sep = '<td class="td_sep"></td>\n'
    let td_word = '<td class="td_word">' + w + '</td>\n'
    return  '<tr>\n' + td_num + td_sep + td_word + '</tr>\n'
}

function buildItems(words,id,num_ini){
    let items = ""
    for (let i=0;i<words.length;i++){
        items = items + buildItem(i+1+num_ini, words[i])
    }
    let word_list_element = document.getElementById(id)
    word_list_element.innerHTML = items
}

function splitlist(array, parts) {
    let result = [];
    for (let i = parts; i > 0; i--) {
        result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
}

function capitalized(list_words){
    let result = []
    for (let i=0; i<list_words.length; i++){
        result.push(list_words[i].charAt(0).toUpperCase() + list_words[i].slice(1))
    }
    return result
}

function buildAnswer(){
    let input_string = selectTextForCurrentInput()
    let words_by_freq = getWordsByFrequecy(corpus, input_string)
    words_by_freq = capitalized(words_by_freq)
    let word_groups = splitlist(words_by_freq, 3)
    buildItems(word_groups[0],ID_HARD_WORD_LIST,0)
    let num_ini = word_groups[0].length
    buildItems(word_groups[1],ID_MEDIUM_WORD_LIST,num_ini)
    let num_ini2 = num_ini + word_groups[1].length
    buildItems(word_groups[2],ID_EASY_WORD_LIST, num_ini2)
    document.getElementById(ID_RESULTS).style.display = 'block';
}

function showHome(){
    document.getElementById(ID_DIV_DICTATIONS).style.display = 'block';
    document.getElementById(ID_RESULTS).style.display = 'none';
    document.getElementById(ID_INTERFACE_SEARCH).style.display = 'none';
}

function showSearchTool(){
    let num_video = parseFloat(this.id)
    sessionStorage.setItem(VIDEO_SELECTED, num_video)
    document.getElementById(ID_DIV_DICTATIONS).style.display = 'none';
    document.getElementById(ID_INTERFACE_SEARCH).style.display = 'block';
}
