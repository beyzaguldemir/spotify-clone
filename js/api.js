import { renderSongs } from "./ui.js";

const url= 'https://shazam.p.rapidapi.com/charts/track?locale=tr-TR&listId=ip-country-chart-TR';
// 204 kodu verdi
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'a082eb287dmsh1380849a26b0703p124dc5jsn234c14270c84',
		'x-rapidapi-host': 'shazam.p.rapidapi.com',
	}
};

// api isteklerini yönettiğimiz class yapısı
export class API{

    constructor(){
        this.songs=[]
    }
    //popüler müzikleri getirir
    async getPopular(){
        const res=await fetch(url,options);
        const data=await res.json();
        // API den aldığımız şarkıları songs dizisine aktardık
        this.songs=data.tracks;
        //ekrana popüler müzikleri aktaracak fonksiyona songs dizisini aktaracak parametreleri gönderdik
        renderSongs(this.songs)
    }

    async searchMusic(query){
        const res=await fetch(`https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR`,options);
        const data=await res.json()
        console.log(data)
        //veriyi istediğimiz hale cevirme
        //song.track yerine song a erisme
        const newData=data.tracks.hits.map(song=>({...song.track}));
        console.log(newData)
        renderSongs(newData)
    }

}




