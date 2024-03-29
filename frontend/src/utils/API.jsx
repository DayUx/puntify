let API_URL = "/api/";

if (!API_URL.endsWith("/")) {
  API_URL += "/";
}

export const API = {
  login: API_URL + "auth/login",
  register: API_URL + "auth/register",
  admin: API_URL + "admin",
  searchArtistes: API_URL + "music/artist/search",
  createArtiste: API_URL + "admin/artist",
  updateArtiste: API_URL + "admin/artist",
  searchMusiques: API_URL + "music/song/search",
  createMusique: API_URL + "admin/song",
  updateMusique: API_URL + "admin/song",
  searchStyles: API_URL + "music/style/search",
  createStyle: API_URL + "admin/style",
  updateStyle: API_URL + "admin/style",
  getMusiqueById: API_URL + "music/song/id",
  getArtisteById: API_URL + "music/artist/id",
  streamMusique: API_URL + "stream/song",
  getMusiquesByArtisteId: API_URL + "music/song/artist",
  getMusiquesByStyleId: API_URL + "music/song/style",
  getMusiquesByAlbumId: API_URL + "music/song/album",
  searchAlbums: API_URL + "music/album/search",
  createAlbum: API_URL + "admin/album",
  updateAlbum: API_URL + "admin/album",
  getAlbumById: API_URL + "music/album/id",
  getAlbumsByArtisteId: API_URL + "music/album/artist",
  getLikesId: API_URL + "music/songid/likes",
  getLikes: API_URL + "music/song/likes",
  like: API_URL + "music/song/like",
  uploadFromYoutube: API_URL + "admin/song/youtube",
  getUser: API_URL + "music/user",
};
