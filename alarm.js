const { exec } = require('child_process');
const loudness = require('loudness');
const id = `PLhL9Od1u_vP-9qSV9g3GAQ_35vwf1M4fm`;
const KEY = 'AIzaSyAj29rGQXrWsmjJ1J9LoVkXxH0TXxTkWRQ';
const {google} = require('googleapis');

(function openYoutube() {
    //! Set Volume
    loudness.setVolume(1)
    loudness.setMuted(false)
    const interval = setInterval(async ()=>{
        const vol = await loudness.getVolume()
        if (vol > 60) clearInterval(interval)
        else loudness.setVolume(vol + 1)
    }, 20000)

    //! Get Playlist Items & Pick a Random one to play
    const service = google.youtube('v3');
    service.playlistItems.list({
        key: KEY,
        part: 'snippet',
        playlistId: id,
    }, (err, results) => {
        if (results) {
            const url =`https://www.youtube.com/watch?v=${results.data.items.random().snippet.resourceId.videoId}`;
            exec(`start chrome ${url}"&"list=${id}`, {'shell':'powershell.exe'}, (error, stdout, stderr)=> {
                if (error) console.log(error);
                if (stdout) console.log(stdout);
                if (stderr) console.log(stderr);
            })
        }
    });

})()

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}