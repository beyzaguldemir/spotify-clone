import { API } from "./js/api.js"
import { elements } from "./js/helpers.js";
import { renderPlayingInfo, updateTitle } from "./js/ui.js";
const api=new API()
// sayfa yüklendiği anda api ye istek atıp sayfaya müzikleri getirir.
document.addEventListener("DOMContentLoaded",async()=>await api.getPopular());

const playMusic=(url)=>{
    // müziğin url ini html e aktarma
    elements.audioSource.src=url
    // audio elementinin müziği yüklemesini sağladık
    elements.audio.load()
    //audio elementinin müziği oynatmasını sağlar
    elements.audio.play()
}

//* listede tıklamalarda calısır
const handleClick=(e)=>{
    if(e.target.id==="play-btn"){
        const parent=e.target.closest(".card")// parentElement yerine kullanırız en yakın ebeveyne götürür
        // calınacak müziğin bilgilerini ekrana basar
        renderPlayingInfo(parent.dataset)
        //Müziği çalar
        playMusic(parent.dataset.url)
    }
    
}
//* liste alanındaki tıklamaları izleme
document.addEventListener("click",handleClick)
// fotoğrafı dönderir
const animatePhoto=()=>{
    const img=document.querySelector(".info img")
    img.className="animate"
}
// img etiketine eklediğimiz animate class ını kaldırır
const stopAnimation=()=>{
    const img=document.querySelector(".info img")
    img.classList.remove("animate")
}
// Müziği çalma ve durdurma olaylarını izler
elements.audio.addEventListener("play",animatePhoto)
elements.audio.addEventListener("pause",stopAnimation)

elements.form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const query=e.target[0].value

    if(!query){
        alert("lütfen bütün alanları doldurunuz")
        return;
    }
    //Baslıgı güncelle
    updateTitle(`${query} İçin Sonuçlar`)
    api.searchMusic(query)
})

elements.menu.addEventListener("click",()=>{
    elements.ulList.classList.toggle("toggle")
})

