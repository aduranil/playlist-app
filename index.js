// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      const parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

let _token = hash.access_token;
const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "b53e5e2e05c949b1b41db9786ee2483f";
const redirectUri = "http://localhost:8080/";
if (!_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user-top-read&response_type=token&show_dialog=true`;
}

// Make a call using the token
fetch("https://api.spotify.com/v1/me/playlists", {
  headers: {
    Authorization: "Bearer " + _token
  }
})
  .then(res => res.json())
  .then(data => console.log(data));

// fetch("https://api.spotify.com/v1/playlists/4SsHmrWvOptrdhzGONDXt2", {
//   headers: {
//     Authorization: "Bearer " + _token
//   }
// })
//   .then(res => res.json())
//   .then(data => {
//     document.getElementById("playlist-name").innerText = data["name"];
//     tracks = document.querySelector("table");
//
//     data.tracks.items.map(item => {
//       let row = tracks.insertRow();
//
//       let cell = row.insertCell();
//       cell.innerText = item.track.name;
//
//       let artistCell = row.insertCell();
//       artistCell.innerText = item.track.artists[0].name;
//
//       let previewCell = row.insertCell();
//       let previewText = (previewCell.innerHTML = `${
//         item.track.preview_url
//           ? `<audio controls><source src=${item.track.preview_url} type="audio/mpeg"> </audio>`
//           : "Not available"
//       }
//       `);
//     });
//   });
